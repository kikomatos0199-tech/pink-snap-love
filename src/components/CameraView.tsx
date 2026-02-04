import { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from './ui/button';
import { Camera, RefreshCw, Heart, Sparkles } from 'lucide-react';

interface CameraViewProps {
  onCapture: (photos: string[]) => void;
  filter: string;
}

const getFilterStyle = (filter: string): React.CSSProperties => {
  switch (filter) {
    case 'bw':
      return { filter: 'grayscale(100%)' };
    case 'pink':
      return { filter: 'saturate(1.2) hue-rotate(-10deg) brightness(1.05)' };
    case 'vintage':
      return { filter: 'sepia(30%) saturate(1.1) contrast(0.95)' };
    case 'warm':
      return { filter: 'saturate(1.3) sepia(15%) brightness(1.05)' };
    case 'neon':
      return { filter: 'saturate(1.8) contrast(1.2) brightness(1.1)' };
    case 'pastel':
      return { filter: 'saturate(0.8) brightness(1.1) contrast(0.9)' };
    default:
      return {};
  }
};

export const CameraView = ({ onCapture, filter }: CameraViewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showFlash, setShowFlash] = useState(false);
  const [capturedCount, setCapturedCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false,
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please grant permission and try again.');
    }
  }, []);

  useEffect(() => {
    startCamera();
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const capturePhoto = useCallback((): string | null => {
    if (!videoRef.current || !canvasRef.current) return null;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return null;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Flip horizontally for mirror effect
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    
    // Apply filter
    const filterStyle = getFilterStyle(filter);
    if (filterStyle.filter) {
      ctx.filter = filterStyle.filter;
    }
    
    ctx.drawImage(video, 0, 0);
    
    // Reset transform
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    
    return canvas.toDataURL('image/png');
  }, [filter]);

  const startCapture = async () => {
    if (isCapturing) return;
    
    setIsCapturing(true);
    setCapturedCount(0);
    const photos: string[] = [];

    for (let shot = 0; shot < 3; shot++) {
      // Countdown
      for (let i = 3; i >= 1; i--) {
        setCountdown(i);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      setCountdown(null);

      // Flash effect - enhanced with longer duration
      setShowFlash(true);
      await new Promise(resolve => setTimeout(resolve, 250));
      setShowFlash(false);

      // Capture
      const photo = capturePhoto();
      if (photo) {
        photos.push(photo);
        setCapturedCount(prev => prev + 1);
      }

      // Wait before next shot
      if (shot < 2) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    setIsCapturing(false);
    onCapture(photos);
  };

  if (error) {
    return (
      <div className="glass-card rounded-3xl p-8 text-center">
        <div className="text-6xl mb-4">📸</div>
        <p className="text-foreground mb-4">{error}</p>
        <Button variant="gradient" onClick={startCamera}>
          <RefreshCw className="mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Camera Frame */}
      <div className="glass-card rounded-3xl p-3 overflow-hidden camera-frame">
        <div className="relative rounded-2xl overflow-hidden bg-black aspect-[4/3]">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            style={{ 
              transform: 'scaleX(-1)',
              ...getFilterStyle(filter)
            }}
          />
          
          {/* Countdown Overlay */}
          {countdown !== null && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="relative">
                <span className="text-9xl font-bold text-white animate-countdown drop-shadow-lg">
                  {countdown}
                </span>
                <div className="absolute inset-0 text-9xl font-bold text-pink-400 animate-ping opacity-30">
                  {countdown}
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Flash Effect */}
          {showFlash && (
            <>
              <div className="absolute inset-0 flash-effect" />
              <div className="absolute inset-0 flash-glow" />
            </>
          )}

          {/* Capture Progress */}
          {isCapturing && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    i < capturedCount 
                      ? 'bg-pink-hot scale-125 shadow-[0_0_10px_rgba(255,105,180,0.8)]' 
                      : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Corner Decorations */}
          <div className="absolute top-3 left-3 text-2xl animate-pulse-soft">💕</div>
          <div className="absolute top-3 right-3 text-2xl animate-pulse-soft" style={{ animationDelay: '0.5s' }}>💖</div>
          <div className="absolute bottom-3 left-3 text-xl opacity-70">✨</div>
          <div className="absolute bottom-3 right-3 text-xl opacity-70">🌸</div>
          
          {/* Frame Border Glow */}
          <div className="absolute inset-0 pointer-events-none rounded-2xl ring-2 ring-white/20 ring-inset" />
        </div>
      </div>

      {/* Hidden Canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Capture Button */}
      <div className="flex justify-center mt-6">
        <Button
          variant="gradient"
          size="xl"
          onClick={startCapture}
          disabled={isCapturing || !stream}
          className="group capture-button"
        >
          {isCapturing ? (
            <>
              <Sparkles className="mr-2 animate-spin" />
              Capturing...
            </>
          ) : (
            <>
              <Camera className="mr-2 group-hover:scale-110 transition-transform" />
              Take 3 Photos
              <Heart className="ml-2 text-pink-200 group-hover:scale-125 transition-transform fill-current" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
