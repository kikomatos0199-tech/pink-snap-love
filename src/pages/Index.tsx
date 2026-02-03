import { useState, useRef } from 'react';
import { FloatingHearts } from '@/components/FloatingHearts';
import { CameraView } from '@/components/CameraView';
import { PhotoStrip } from '@/components/PhotoStrip';
import { FilterSelector } from '@/components/FilterSelector';
import { StyleSelector } from '@/components/StyleSelector';
import { NameEditor } from '@/components/NameEditor';
import { Button } from '@/components/ui/button';
import { Download, RotateCcw, Heart } from 'lucide-react';
import { usePhotoExport } from '@/hooks/usePhotoExport';

const Index = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [filter, setFilter] = useState('original');
  const [style, setStyle] = useState('polaroid');
  const [title, setTitle] = useState('Pink Photo Booth');
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
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="font-display text-5xl md:text-6xl text-pink-deep mb-2 drop-shadow-sm">
            Pink Photo Booth
          </h1>
          <p className="text-lg text-muted-foreground flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 text-pink-rose fill-current" />
            Capture your sweetest moments
            <Heart className="w-5 h-5 text-pink-rose fill-current" />
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Camera / Controls */}
          <div className="space-y-6">
            {photos.length === 0 ? (
              <>
                <CameraView onCapture={handleCapture} filter={filter} />
                <FilterSelector selected={filter} onSelect={setFilter} />
              </>
            ) : (
              <div className="glass-card rounded-3xl p-6 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="font-display text-2xl text-pink-deep mb-2">
                  Perfect Shots!
                </h2>
                <p className="text-muted-foreground mb-6">
                  Your photos are ready. Customize and download!
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={handleReset}>
                    <RotateCcw className="mr-2" />
                    Take New Photos
                  </Button>
                  <Button variant="gradient" onClick={handleDownload}>
                    <Download className="mr-2" />
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
          <div className="flex flex-col items-center">
            <div className="glass-card rounded-3xl p-6 w-full">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <span>📸</span> Preview
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
                  <div className="w-[280px] aspect-[3/5] rounded-2xl border-2 border-dashed border-pink-300 flex flex-col items-center justify-center text-muted-foreground bg-white/30">
                    <span className="text-5xl mb-3">📷</span>
                    <p className="text-sm text-center px-4">
                      Take photos to see your<br />photo strip preview here!
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Download Button - Mobile */}
            {photos.length > 0 && (
              <div className="mt-6 lg:hidden">
                <Button variant="gradient" size="lg" onClick={handleDownload}>
                  <Download className="mr-2" />
                  Download Photo Strip
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 py-6 border-t border-pink-200/50">
          <div className="text-2xl mb-2">💘💋😍</div>
          <p className="text-sm text-muted-foreground">
            Made with love • {currentDate}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
