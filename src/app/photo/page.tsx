"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ProtectedParent } from "@/components/ProtectedParent";
import { AppHeader } from "@/components/AppHeader";
import { CameraCapture } from "@/components/CameraCapture";
import { getSelectedChild } from "@/lib/childSelection";
import { setDraftProblem } from "@/lib/draftProblem";
import type { SelectedChild } from "@/lib/childSelection";
import type { ExtractResponse } from "@/types/extract";

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });
}

export default function PhotoPage() {
  return (
    <ProtectedParent>
      <AppHeader />
      <PhotoInner />
    </ProtectedParent>
  );
}

function PhotoInner() {
  const router = useRouter();
  const [child, setChild] = useState<SelectedChild | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [extracting, setExtracting] = useState(false);
  const [extractedText, setExtractedText] = useState<string>("");
  const [confidence, setConfidence] = useState<number | null>(null);

  useEffect(() => {
    setChild(getSelectedChild());
  }, []);

  const fileHint = useMemo(() => {
    return "Upload a photo (or use your camera) of a single math problem.";
  }, []);

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    try {
      const url = await fileToDataUrl(file);
      setImageDataUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    }
  }

  return (
    <main>
      <div className="card">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <h1 style={{ marginTop: 0, marginBottom: 0 }}>Take a photo</h1>
          <Link className="btn" href="/home">
            Back to home
          </Link>
        </div>

        {child ? (
          <p className="muted" style={{ marginTop: 8 }}>
            For <strong>{child.name}</strong> • Grade {child.grade}
          </p>
        ) : (
          <p className="error" style={{ marginTop: 8 }}>
            No child selected. Please go to <Link href="/kids">Child profiles</Link>.
          </p>
        )}
      </div>

      {imageDataUrl ? (
        <div className="card" style={{ marginTop: 16 }}>
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div>
              <div style={{ fontWeight: 800 }}>Preview</div>
              <div className="muted" style={{ marginTop: 4 }}>
                Next, we’ll try to read the math from the image.
              </div>
            </div>
            <button className="btn" onClick={() => setImageDataUrl(null)}>
              Retake
            </button>
          </div>

          <div style={{ marginTop: 12 }}>
            <img
              src={imageDataUrl}
              alt="Captured problem"
              style={{
                width: "100%",
                maxHeight: 640,
                objectFit: "contain",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(0,0,0,0.25)"
              }}
            />
          </div>

          <div className="row" style={{ marginTop: 12 }}>
            <button
              className="btn primary"
              disabled={extracting}
              onClick={async () => {
                setError(null);
                setExtractedText("");
                setConfidence(null);
                setExtracting(true);
                try {
                  const res = await fetch("/api/extract", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ imageDataUrl })
                  });
                  if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text || "Extraction failed.");
                  }
                  const data = (await res.json()) as ExtractResponse;
                  setExtractedText(data.extractedText || "");
                  setConfidence(data.confidence);
                } catch (err) {
                  setError(
                    err instanceof Error ? err.message : "Extraction failed."
                  );
                } finally {
                  setExtracting(false);
                }
              }}
            >
              {extracting ? "Reading…" : "Extract text"}
            </button>

            <button
              className="btn"
              onClick={() => {
                setImageDataUrl(null);
                setExtractedText("");
                setConfidence(null);
                setError(null);
              }}
              disabled={extracting}
            >
              Retake
            </button>
          </div>

          {typeof confidence === "number" ? (
            <div className="muted" style={{ marginTop: 8 }}>
              OCR confidence: {Math.round(confidence)}%
            </div>
          ) : null}

          {extractedText ? (
            <div style={{ marginTop: 12 }}>
              <label className="label" htmlFor="extracted">
                I read this as (edit if needed)
              </label>
              <textarea
                id="extracted"
                className="input"
                style={{ minHeight: 110, resize: "vertical" }}
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
              />

              <div className="row" style={{ marginTop: 12 }}>
                <button
                  className="btn primary"
                  onClick={() => {
                    const cleaned = extractedText.trim();
                    if (!cleaned) {
                      setError("Please enter the problem text.");
                      return;
                    }
                    setDraftProblem({
                      text: cleaned,
                      source: "ocr",
                      createdAt: Date.now()
                    });
                    router.push("/ask");
                  }}
                >
                  Send to “Ask”
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    setExtractedText("");
                    setConfidence(null);
                  }}
                >
                  Clear text
                </button>
              </div>
            </div>
          ) : null}

          {error ? (
            <p className="error" style={{ marginTop: 12, marginBottom: 0 }}>
              {error}
            </p>
          ) : null}
        </div>
      ) : (
        <>
          <div style={{ marginTop: 16 }}>
            <CameraCapture onCapture={setImageDataUrl} />
          </div>

          <div className="card" style={{ marginTop: 16 }}>
            <div style={{ fontWeight: 800 }}>Upload instead</div>
            <div className="muted" style={{ marginTop: 6 }}>
              {fileHint}
            </div>

            <div style={{ marginTop: 12 }}>
              <input
                className="input"
                type="file"
                accept="image/*"
                capture="environment"
                onChange={onFileChange}
              />
            </div>

            {error ? (
              <p className="error" style={{ marginTop: 12, marginBottom: 0 }}>
                {error}
              </p>
            ) : null}
          </div>
        </>
      )}
    </main>
  );
}

