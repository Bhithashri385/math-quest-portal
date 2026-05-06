import { NextResponse } from "next/server";
import type { ExtractRequest, ExtractResponse } from "@/types/extract";
import { createWorker, type Worker } from "tesseract.js";

let workerPromise: Promise<Worker> | null = null;

async function getWorker(): Promise<Worker> {
  if (!workerPromise) {
    workerPromise = (async () => {
      const worker = await createWorker("eng");
      await worker.setParameters({
        preserve_interword_spaces: "1"
      });
      return worker;
    })();
  }
  return workerPromise;
}

function dataUrlToBuffer(dataUrl: string): Buffer {
  const m = dataUrl.match(/^data:(.+);base64,(.*)$/);
  if (!m) throw new Error("Invalid image data URL.");
  return Buffer.from(m[2], "base64");
}

function splitIntoCandidateProblems(text: string): string[] {
  const lines = text
    .split(/\r?\n/g)
    .map((l) => l.trim())
    .filter(Boolean);

  // Simple heuristic: take non-trivial lines as separate problems.
  const candidates = lines
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter((l) => l.length >= 4);

  // If OCR returns one big block, fall back to the whole thing.
  if (candidates.length === 0 && text.trim().length) return [text.trim()];
  return candidates.slice(0, 5);
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<ExtractRequest>;
  const imageDataUrl = body.imageDataUrl;

  if (!imageDataUrl || typeof imageDataUrl !== "string") {
    return NextResponse.json({ error: "imageDataUrl is required." }, { status: 400 });
  }

  try {
    const buf = dataUrlToBuffer(imageDataUrl);
    const worker = await getWorker();
    const result = await worker.recognize(buf);

    const extractedText = (result.data.text || "").trim();
    const confidence =
      typeof result.data.confidence === "number" ? result.data.confidence : null;

    const detectedProblems = splitIntoCandidateProblems(extractedText).map((t) => ({
      text: t,
      confidence
    }));

    const response: ExtractResponse = {
      extractedText,
      confidence,
      detectedProblems
    };

    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Extraction failed." },
      { status: 500 }
    );
  }
}

