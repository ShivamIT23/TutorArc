import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const WebcamPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        console.log("Stream:", mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setStream(mediaStream);
        streamRef.current = mediaStream;
      } catch (err) {
        console.error("Error accessing webcam:", err);
        toast.warning("Please allow webcam and microphone access to continue.");
      }
    };

    startWebcam();

    // Cleanup on unmount
    return () => {
      const activeStream = streamRef.current || (videoRef.current?.srcObject as MediaStream | null) || null;
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
      if (videoRef.current) {
        try {
          videoRef.current.pause();
        } catch {}
        videoRef.current.srcObject = null;
      }
      streamRef.current = null;
    };
  }, []);

  const toggleMute = () => {
    const s = streamRef.current || stream;
    if (s) {
      s.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleCamera = () => {
    const s = streamRef.current || stream;
    if (s) {
      s.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsCameraOn(!isCameraOn);
    }
  };

  const goFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div
      style={{
        minHeight: "94vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(1200px 600px at 10% -10%, #1e293b 0%, rgba(17,24,39,0) 60%), radial-gradient(1200px 600px at 110% 110%, #0ea5e9 0%, rgba(17,24,39,0) 60%), #0b1220",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "min(92vw, 980px)",
          background: "rgba(17, 24, 39, 0.7)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          backdropFilter: "blur(8px)",
          borderRadius: 16,
          padding: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 20, color: "#e5e7eb", fontWeight: 600 }}>🎥 Live Session</span>
            <span style={{
              fontSize: 12,
              color: "#a3a3a3",
              padding: "2px 8px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
            }}>
              {isCameraOn ? "Camera on" : "Camera off"} · {isMuted ? "Muted" : "Unmuted"}
            </span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ fontSize: 12, color: "#9ca3af" }}>Status:</span>
            <span style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              backgroundColor: isCameraOn ? "#10b981" : "#ef4444",
              boxShadow: isCameraOn ? "0 0 0 4px rgba(16,185,129,0.15)" : "0 0 0 4px rgba(239,68,68,0.15)",
            }} />
          </div>
        </div>

        <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", overflow: "hidden", borderRadius: 12, backgroundColor: "#000" }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted={isMuted}
            controls
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              borderRadius: 12,
            }}
          ></video>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 14 }}>
          <button onClick={toggleCamera} style={buttonPrimary}>
            {isCameraOn ? "Turn Camera Off" : "Turn Camera On"}
          </button>
          <button onClick={toggleMute} style={buttonSecondary}>
            {isMuted ? "Unmute" : "Mute"}
          </button>
          <button onClick={goFullscreen} style={buttonNeutral}>Fullscreen</button>
        </div>
      </div>
    </div>
  );
};

const baseButton: React.CSSProperties = {
  padding: "10px 16px",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 10,
  cursor: "pointer",
  background: "rgba(255,255,255,0.04)",
  color: "#e5e7eb",
  boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
};

const buttonPrimary: React.CSSProperties = {
  ...baseButton,
  background: "linear-gradient(180deg, #0ea5e9, #0284c7)",
  border: "1px solid rgba(14,165,233,0.5)",
  color: "white",
};

const buttonSecondary: React.CSSProperties = {
  ...baseButton,
  background: "linear-gradient(180deg, #22c55e, #16a34a)",
  border: "1px solid rgba(34,197,94,0.5)",
  color: "white",
};

const buttonNeutral: React.CSSProperties = {
  ...baseButton,
  background: "linear-gradient(180deg, #334155, #1f2937)",
};

export default WebcamPlayer;
