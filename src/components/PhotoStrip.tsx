import { forwardRef } from 'react';

interface PhotoStripProps {
  photos: string[];
  style: string;
  filter: string;
  title: string;
  names: string;
  date: string;
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

const getStyleClasses = (style: string) => {
  switch (style) {
    case 'polaroid':
      return {
        container: 'bg-white p-4 pb-16 shadow-frame',
        photoWrapper: 'mb-3',
        headerClass: 'font-display text-pink-deep text-2xl mb-2',
        footerEmoji: '💘💋😍',
        footerClass: 'border-t border-pink-200/50',
      };
    case 'film':
      return {
        container: 'bg-gray-900 p-3 border-4 border-gray-800',
        photoWrapper: 'mb-2 border-2 border-gray-700',
        headerClass: 'font-mono text-amber-400 text-lg mb-2 tracking-widest',
        footerEmoji: '🎬🎞️✨',
        footerClass: 'border-t border-gray-700',
      };
    case 'instagram':
      return {
        container: 'bg-gradient-to-b from-purple-500 via-pink-500 to-orange-400 p-4',
        photoWrapper: 'mb-3 rounded-lg overflow-hidden shadow-lg',
        headerClass: 'font-sans text-white text-xl font-bold mb-2 drop-shadow-lg',
        footerEmoji: '❤️🔥💯',
        footerClass: 'border-t border-white/30',
      };
    case 'scrapbook':
      return {
        container: 'bg-amber-50 p-5 border-4 border-dashed border-pink-300 rotate-1',
        photoWrapper: 'mb-3 -rotate-1 shadow-md border-4 border-white',
        headerClass: 'font-display text-pink-deep text-2xl mb-2',
        footerEmoji: '💕📌✂️',
        footerClass: 'border-t border-pink-300/50',
      };
    case 'modern':
      return {
        container: 'bg-white p-6 shadow-2xl',
        photoWrapper: 'mb-4',
        headerClass: 'font-sans text-gray-800 text-xl font-light tracking-wide mb-2',
        footerEmoji: '♡',
        footerClass: 'border-t border-gray-200',
      };
    case 'retro':
      return {
        container: 'bg-gradient-to-b from-yellow-200 via-pink-200 to-cyan-200 p-4 border-8 border-white',
        photoWrapper: 'mb-3 border-4 border-white rotate-1',
        headerClass: 'font-display text-purple-600 text-2xl mb-2 drop-shadow',
        footerEmoji: '🌟⭐✨',
        footerClass: 'border-t border-white/50',
      };
    case 'kawaii':
      return {
        container: 'bg-gradient-to-b from-pink-200 via-pink-100 to-white p-4 rounded-3xl border-4 border-pink-300',
        photoWrapper: 'mb-3 rounded-2xl overflow-hidden border-4 border-white shadow-soft',
        headerClass: 'font-display text-pink-hot text-2xl mb-2',
        footerEmoji: '🌸💖🎀',
        footerClass: 'border-t border-pink-300/50',
      };
    case 'wedding':
      return {
        container: 'bg-gradient-to-b from-white via-pink-50 to-white p-6 border-2 border-pink-200',
        photoWrapper: 'mb-4 rounded-sm shadow-md',
        headerClass: 'font-display text-pink-deep text-3xl mb-2 italic',
        footerEmoji: '💍👰🤵',
        footerClass: 'border-t border-pink-200/50',
      };
    case 'neon':
      return {
        container: 'bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 p-4 border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.5)]',
        photoWrapper: 'mb-3 border-2 border-pink-500 shadow-[0_0_10px_rgba(255,0,128,0.6)]',
        headerClass: 'font-mono text-cyan-400 text-xl mb-2 tracking-wider drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]',
        footerEmoji: '🌃💜⚡',
        footerClass: 'border-t border-cyan-500/50',
      };
    case 'birthday':
      return {
        container: 'bg-gradient-to-b from-yellow-300 via-pink-400 to-purple-500 p-4 border-4 border-yellow-400',
        photoWrapper: 'mb-3 rounded-xl overflow-hidden border-4 border-white shadow-lg rotate-1',
        headerClass: 'font-display text-white text-2xl mb-2 drop-shadow-lg',
        footerEmoji: '🎂🎈🎁',
        footerClass: 'border-t border-white/40',
      };
    case 'christmas':
      return {
        container: 'bg-gradient-to-b from-red-600 via-green-700 to-red-600 p-4 border-4 border-yellow-400',
        photoWrapper: 'mb-3 rounded-lg overflow-hidden border-4 border-white shadow-md',
        headerClass: 'font-display text-yellow-300 text-2xl mb-2 drop-shadow-lg',
        footerEmoji: '🎄🎅❄️',
        footerClass: 'border-t border-yellow-400/50',
      };
    case 'graduation':
      return {
        container: 'bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 p-4 border-4 border-yellow-500',
        photoWrapper: 'mb-3 border-2 border-yellow-500/70 shadow-md',
        headerClass: 'font-display text-yellow-400 text-2xl mb-2 drop-shadow',
        footerEmoji: '🎓📜🎉',
        footerClass: 'border-t border-yellow-500/40',
      };
    default:
      return {
        container: 'bg-white p-4 shadow-frame rounded-2xl',
        photoWrapper: 'mb-3 rounded-xl overflow-hidden',
        headerClass: 'font-display text-pink-deep text-2xl mb-2',
        footerEmoji: '💘💋😍',
        footerClass: 'border-t border-pink-200/50',
      };
  }
};

export const PhotoStrip = forwardRef<HTMLDivElement, PhotoStripProps>(
  ({ photos, style, filter, title, names, date }, ref) => {
    const styleClasses = getStyleClasses(style);
    const filterStyle = getFilterStyle(filter);

    return (
      <div 
        ref={ref}
        className={`inline-block ${styleClasses.container}`}
        style={{ width: '280px' }}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className={styleClasses.headerClass}>{title}</h2>
          <p className="text-sm opacity-80">{names}</p>
        </div>

        {/* Photos */}
        <div className="space-y-3">
          {photos.map((photo, index) => (
            <div 
              key={index} 
              className={`${styleClasses.photoWrapper} aspect-[4/3] overflow-hidden`}
            >
              <img
                src={photo}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover"
                style={filterStyle}
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={`text-center mt-4 pt-3 ${styleClasses.footerClass}`}>
          <div className="text-lg mb-1">{styleClasses.footerEmoji}</div>
          <p className="text-xs opacity-70">{date}</p>
        </div>
      </div>
    );
  }
);

PhotoStrip.displayName = 'PhotoStrip';
