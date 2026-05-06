"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type CameraCaptureProps = {
  onCapture: (dataUrl: string) => void;
};

type CameraStatus =
  | { type: "idle" }
  | { type: "starting" }
  | { type: "ready" }
  | { type: "error"; message: string };

export function CameraCapture({ onCapture }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [status, setStatus] = useState<CameraStatus>({ type: "idle" });
  const [hasCameraSupport, setHasCameraSupport] = useState(true);

  const canUseCamera = useMemo(() => {
    return (
      hasCameraSupport &&
      typeof navigator !== "undefined" &&
      !!navigator.mediaDevices?.getUserMedia
    );
  }, [hasCameraSupport]);

  async function startCamera() {
    if (!canUseCamera) return;
    setStatus({ type: "starting" });

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setStatus({ type: "ready" });
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Could not access camera. Check permissions.";
      setStatus({ type: "error", message: msg });
    }
  }

  function stopCamera() {
    const stream = streamRef.current;
    streamRef.current = null;
    if (stream) stream.getTracks().forEach((t) => t.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    setStatus({ type: "idle" });
  }

  function captureFrame() {
    const video = videoRef.current;
    if (!video) return;

    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, width, height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    onCapture(dataUrl);
  }

  useEffect(() => {
    setHasCameraSupport(true);
    return () => {
      const stream = streamRef.current;
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, []);

  if (!canUseCamera) {
    return (
      <div className="card">
        <div className="muted">Camera isn’t available in this browser.</div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div>
          <div style={{ fontWeight: 800 }}>Webcam</div>
          <div className="muted" style={{ marginTop: 4 }}>
            Allow camera access, then capture the problem.
          </div>
        </div>
        {status.type === "ready" ? (
          <button className="btn" onClick={stopCamera}>
            Stop
          </button>
        ) : (
          <button
            className="btn primary"
            onClick={startCamera}
            disabled={status.type === "starting"}
          >
            {status.type === "starting" ? "Starting…" : "Start camera"}
          </button>
        )}
      </div>

      {status.type === "error" ? (
        <div className="error" style={{ marginTop: 12 }}>
          {status.message}
        </div>
      ) : null}

      <div style={{ marginTop: 12 }}>
        <video
          ref={videoRef}
          playsInline
          muted
          style={{
            width: "100%",
            maxHeight: 520,
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(0,0,0,0.25)"
          }}
        />
      </div>

      <div className="row" style={{ marginTop: 12 }}>
        <button
          className="btn primary"
          onClick={captureFrame}
          disabled={status.type !== "ready"}
        >
          Capture photo
        </button>
        <button
          className="btn"
          onClick={() => setHasCameraSupport(false)}
          disabled={status.type === "starting"}
        >
          Use upload instead
        </button>
      </div>
    </div>
  );
}

