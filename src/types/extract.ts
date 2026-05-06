export type ExtractRequest = {
  imageDataUrl: string;
};

export type ExtractResponse = {
  extractedText: string;
  confidence: number | null;
  detectedProblems: Array<{ text: string; confidence: number | null }>;
};

