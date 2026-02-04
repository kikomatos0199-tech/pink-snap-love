import { useState, useRef } from 'react';
import { FloatingHearts } from '@/components/FloatingHearts';
import { CameraView } from '@/components/CameraView';
import { PhotoStrip } from '@/components/PhotoStrip';
import { FilterSelector } from '@/components/FilterSelector';
import { StyleSelector } from '@/components/StyleSelector';
import { NameEditor } from '@/components/NameEditor';
import { Button } from '@/components/ui/button';
import { Download, RotateCcw, Heart, Sparkles, Camera, Stars } from 'lucide-react';
import { usePhotoExport } from '@/hooks/usePhotoExport';

const Index = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [filter, setFilter] = useState('original');
  const [style, setStyle] = useState('cuties');
  const [title, setTitle] = useState('Cuties');
  const [names, setNames] = useState('Jhams & Crush 💘');
  const photoStripRef = useRef<HTMLDivElement>(null);
  const { exportAsImage } = usePhotoExport();

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleCapture = (capturedPhotos: string[]) => {
    setPhotos(capturedPhotos);
  };

  const handleReset = () => {
    setPhotos([]);
  };

  const handleDownload = () => {
    exportAsImage(photoStripRef.current, `pink-photo-booth-${Date.now()}`);
  };

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <FloatingHearts />
      
      {/* Decorative Corner Elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-pink-300/30 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 w-56 h-56 bg-gradient-to-bl from-pink-400/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-300/25 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-pink-400/20 to-transparent rounded-full blur-3xl" />
      
      {/* Floating Decorative Emojis */}
      <div className="absolute top-24 left-[5%] text-5xl opacity-30 animate-float pointer-events-none select-none">💕</div>
      <div className="absolute top-32 right-[8%] text-4xl opacity-25 animate-float-delayed pointer-events-none select-none">✨</div>
      <div className="absolute top-[45%] left-[3%] text-4xl opacity-20 animate-float pointer-events-none select-none">🌸</div>
      <div className="absolute top-[40%] right-[5%] text-5xl opacity-20 animate-float-delayed pointer-events-none select-none">💖</div>
      <div className="absolute bottom-32 left-[10%] text-3xl opacity-25 animate-float-delayed pointer-events-none select-none">🎀</div>
      <div className="absolute bottom-24 right-[12%] text-4xl opacity-20 animate-float pointer-events-none select-none">💗</div>
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-5 px-5 py-2.5 bg-white/50 backdrop-blur-md rounded-full border border-white/70 shadow-soft">
            <Stars className="w-4 h-4 text-pink-deep animate-pulse-soft" />
            <span className="text-sm font-semibold text-pink-deep">Capture your sweetest moments</span>
            <Stars className="w-4 h-4 text-pink-deep animate-pulse-soft" />
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl title-gradient mb-4 drop-shadow-sm decorative-border pb-6 text-glow">
            Pink Photo Booth
          </h1>
          <p className="text-lg text-muted-foreground flex items-center justify-center gap-3 mt-8">
            <Heart className="w-5 h-5 text-pink-rose fill-current animate-pulse-soft" />
            <span className="font-medium">Create beautiful memories together</span>
            <Heart className="w-5 h-5 text-pink-rose fill-current animate-pulse-soft" />
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Camera / Controls */}
          <div className="space-y-6">
            {photos.length === 0 ? (
              <>
                <CameraView onCapture={handleCapture} filter={filter} />
                <FilterSelector selected={filter} onSelect={setFilter} />
              </>
            ) : (
              <div className="glass-card rounded-3xl p-8 text-center hover-lift">
                <div className="relative inline-block">
                  <div className="text-7xl mb-6 animate-pop">🎉</div>
                  <div className="absolute -top-2 -right-2 text-3xl animate-bounce-soft">✨</div>
                  <div className="absolute -top-2 -left-2 text-3xl animate-bounce-soft" style={{ animationDelay: '0.2s' }}>💖</div>
                </div>
                <h2 className="font-display text-3xl title-gradient mb-3">
                  Perfect Shots!
                </h2>
                <p className="text-muted-foreground mb-8 text-lg">
                  Your photos are ready. Customize and download your beautiful photo strip!
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button variant="outline" size="lg" onClick={handleReset} className="hover-lift">
                    <RotateCcw className="mr-2 h-5 w-5" />
                    Take New Photos
                  </Button>
                  <Button variant="gradient" size="lg" onClick={handleDownload} className="hover-lift">
                    <Download className="mr-2 h-5 w-5" />
                    Download Strip
                  </Button>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="space-y-4">
              <NameEditor
                title={title}
                names={names}
                onTitleChange={setTitle}
                onNamesChange={setNames}
              />
              <StyleSelector selected={style} onSelect={setStyle} />
              {photos.length > 0 && (
                <FilterSelector selected={filter} onSelect={setFilter} />
              )}
            </div>
          </div>

          {/* Right Column - Photo Strip Preview */}
          <div className="flex flex-col items-center lg:sticky lg:top-8">
            <div className="glass-card rounded-3xl p-6 w-full hover-lift">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Camera className="w-4 h-4" />
                <span>Preview</span>
                <Sparkles className="w-3 h-3 text-pink-rose ml-auto" />
              </h3>
              
              <div className="flex justify-center">
                {photos.length > 0 ? (
                  <div className="animate-pop">
                    <PhotoStrip
                      ref={photoStripRef}
                      photos={photos}
                      style={style}
                      filter={filter}
                      title={title}
                      names={names}
                      date={currentDate}
                    />
                  </div>
                ) : (
                  <div className="w-[280px] aspect-[3/5] rounded-2xl border-2 border-dashed border-pink-300/60 flex flex-col items-center justify-center text-muted-foreground bg-gradient-to-b from-white/50 to-white/20 relative overflow-hidden">
                    {/* Decorative shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
                    
                    <div className="text-6xl mb-4 animate-float">📷</div>
                    <p className="text-sm text-center px-6 font-medium">
                      Take photos to see your<br />photo strip preview here!
                    </p>
                    <div className="flex gap-2 mt-5">
                      <span className="text-2xl animate-pulse-soft">💕</span>
                      <span className="text-2xl animate-pulse-soft" style={{ animationDelay: '0.2s' }}>💖</span>
                      <span className="text-2xl animate-pulse-soft" style={{ animationDelay: '0.4s' }}>💗</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Download Button - Mobile */}
            {photos.length > 0 && (
              <div className="mt-6 lg:hidden">
                <Button variant="gradient" size="lg" onClick={handleDownload} className="hover-lift shadow-lg">
                  <Download className="mr-2 h-5 w-5" />
                  Download Photo Strip
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 py-10 border-t border-pink-200/50 relative">
          <div className="absolute left-1/2 -top-4 -translate-x-1/2 bg-background px-6">
            <div className="flex items-center gap-2">
              <span className="text-xl">💕</span>
              <span className="text-2xl">💖</span>
              <span className="text-xl">💕</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 mb-4 mt-4">
            <span className="text-2xl animate-pulse-soft">💘</span>
            <span className="text-xl animate-pulse-soft" style={{ animationDelay: '0.15s' }}>💋</span>
            <span className="text-2xl animate-pulse-soft" style={{ animationDelay: '0.3s' }}>😍</span>
          </div>
          <p className="text-sm text-muted-foreground font-semibold">
            Made with love • {currentDate}
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2">
            Capture and share your favorite moments ✨
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
