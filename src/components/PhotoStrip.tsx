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

interface StyleConfig {
  container: React.CSSProperties;
  photoWrapper: React.CSSProperties;
  header: React.CSSProperties;
  subheader: React.CSSProperties;
  footer: React.CSSProperties;
  footerEmoji: string;
  footerDate: React.CSSProperties;
  decorations?: React.ReactNode;
}

const getInlineStyles = (style: string): StyleConfig => {
  const baseContainer: React.CSSProperties = {
    width: '280px',
    display: 'inline-block',
    fontFamily: "'Quicksand', sans-serif",
    position: 'relative',
  };

  const basePhoto: React.CSSProperties = {
    marginBottom: '12px',
    aspectRatio: '4/3',
    overflow: 'hidden',
  };

  const baseHeader: React.CSSProperties = {
    fontFamily: "'Pacifico', cursive",
    textAlign: 'center',
    marginBottom: '8px',
  };

  switch (style) {
    case 'polaroid':
      return {
        container: { ...baseContainer, background: '#ffffff', padding: '16px', paddingBottom: '64px', boxShadow: '0 10px 40px -10px rgba(219, 112, 147, 0.3)' },
        photoWrapper: { ...basePhoto },
        header: { ...baseHeader, color: '#be185d', fontSize: '24px' },
        subheader: { fontSize: '14px', opacity: 0.8, textAlign: 'center', color: '#6b7280' },
        footer: { textAlign: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(251, 207, 232, 0.5)' },
        footerEmoji: '💘💋😍',
        footerDate: { fontSize: '12px', opacity: 0.7, color: '#6b7280' },
      };
    case 'film':
      return {
        container: { ...baseContainer, background: '#111827', padding: '12px', border: '4px solid #1f2937' },
        photoWrapper: { ...basePhoto, border: '2px solid #374151' },
        header: { ...baseHeader, fontFamily: 'monospace', color: '#fbbf24', fontSize: '18px', letterSpacing: '0.1em' },
        subheader: { fontSize: '14px', opacity: 0.8, textAlign: 'center', color: '#9ca3af' },
        footer: { textAlign: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #374151' },
        footerEmoji: '🎬🎞️✨',
        footerDate: { fontSize: '12px', opacity: 0.7, color: '#9ca3af' },
      };
    case 'instagram':
      return {
        container: { ...baseContainer, background: 'linear-gradient(to bottom, #a855f7, #ec4899, #f97316)', padding: '16px' },
        photoWrapper: { ...basePhoto, borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)' },
        header: { ...baseHeader, fontFamily: "'Quicksand', sans-serif", fontWeight: 700, color: '#ffffff', fontSize: '20px', textShadow: '0 2px 4px rgba(0,0,0,0.3)' },
        subheader: { fontSize: '14px', opacity: 0.9, textAlign: 'center', color: '#ffffff' },
        footer: { textAlign: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.3)' },
        footerEmoji: '❤️🔥💯',
        footerDate: { fontSize: '12px', opacity: 0.8, color: '#ffffff' },
      };
    case 'scrapbook':
      return {
        container: { ...baseContainer, background: '#fffbeb', padding: '20px', border: '4px dashed #f9a8d4', transform: 'rotate(1deg)' },
        photoWrapper: { ...basePhoto, transform: 'rotate(-1deg)', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '4px solid #ffffff' },
        header: { ...baseHeader, color: '#be185d', fontSize: '24px' },
        subheader: { fontSize: '14px', opacity: 0.8, textAlign: 'center', color: '#6b7280' },
        footer: { textAlign: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(249, 168, 212, 0.5)' },
        footerEmoji: '💕📌✂️',
        footerDate: { fontSize: '12px', opacity: 0.7, color: '#6b7280' },
      };
    case 'modern':
      return {
        container: { ...baseContainer, background: '#ffffff', padding: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' },
        photoWrapper: { ...basePhoto },
        header: { ...baseHeader, fontFamily: "'Quicksand', sans-serif", fontWeight: 300, color: '#1f2937', fontSize: '20px', letterSpacing: '0.05em' },
        subheader: { fontSize: '14px', opacity: 0.8, textAlign: 'center', color: '#6b7280' },
        footer: { textAlign: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #e5e7eb' },
        footerEmoji: '♡',
        footerDate: { fontSize: '12px', opacity: 0.7, color: '#6b7280' },
      };
    case 'retro':
      return {
        container: { ...baseContainer, background: 'linear-gradient(to bottom, #fef08a, #fbcfe8, #a5f3fc)', padding: '16px', border: '8px solid #ffffff' },
        photoWrapper: { ...basePhoto, border: '4px solid #ffffff', transform: 'rotate(1deg)' },
        header: { ...baseHeader, color: '#9333ea', fontSize: '24px', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' },
        subheader: { fontSize: '14px', opacity: 0.8, textAlign: 'center', color: '#6b21a8' },
        footer: { textAlign: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.5)' },
        footerEmoji: '🌟⭐✨',
        footerDate: { fontSize: '12px', opacity: 0.7, color: '#6b21a8' },
      };
    case 'kawaii':
      return {
        container: { ...baseContainer, background: 'linear-gradient(to bottom, #fce7f3, #fff1f2, #ffffff)', padding: '16px', borderRadius: '24px', border: '4px solid #f9a8d4' },
        photoWrapper: { ...basePhoto, borderRadius: '16px', border: '4px solid #ffffff', boxShadow: '0 4px 20px -4px rgba(219, 112, 147, 0.2)' },
        header: { ...baseHeader, color: '#ec4899', fontSize: '24px' },
        subheader: { fontSize: '14px', opacity: 0.8, textAlign: 'center', color: '#be185d' },
        footer: { textAlign: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(249, 168, 212, 0.5)' },
        footerEmoji: '🌸💖🎀',
        footerDate: { fontSize: '12px', opacity: 0.7, color: '#be185d' },
      };
    case 'cuties':
      return {
        container: { 
          ...baseContainer, 
          background: 'linear-gradient(180deg, #fce4ec 0%, #f8bbd9 30%, #f48fb1 60%, #f8bbd9 80%, #fce4ec 100%)', 
          padding: '20px', 
          borderRadius: '20px',
          boxShadow: '0 15px 40px -10px rgba(244, 143, 177, 0.4)'
        },
        photoWrapper: { ...basePhoto, borderRadius: '12px', border: '6px solid #ffffff', boxShadow: '0 6px 20px rgba(0,0,0,0.15)' },
        header: { ...baseHeader, color: '#ad1457', fontSize: '28px', textShadow: '2px 2px 4px rgba(255,255,255,0.5)' },
        subheader: { fontSize: '14px', opacity: 0.9, textAlign: 'center', color: '#880e4f', fontWeight: 600 },
        footer: { textAlign: 'center', marginTop: '20px', paddingTop: '16px' },
        footerEmoji: '💕🎀💗',
        footerDate: { fontSize: '13px', opacity: 0.8, color: '#ad1457', fontWeight: 600 },
      };
    case 'wedding':
      return {
        container: { ...baseContainer, background: 'linear-gradient(to bottom, #ffffff, #fdf2f8, #ffffff)', padding: '24px', border: '2px solid #fbcfe8' },
        photoWrapper: { ...basePhoto, borderRadius: '2px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
        header: { ...baseHeader, color: '#be185d', fontSize: '28px', fontStyle: 'italic' },
        subheader: { fontSize: '14px', opacity: 0.8, textAlign: 'center', color: '#9d174d' },
        footer: { textAlign: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(251, 207, 232, 0.5)' },
        footerEmoji: '💍👰🤵',
        footerDate: { fontSize: '12px', opacity: 0.7, color: '#9d174d' },
      };
    case 'neon':
      return {
        container: { ...baseContainer, background: 'linear-gradient(to bottom, #0f0f23, #1a1a3e, #0f0f23)', padding: '16px', border: '3px solid #00ffff', boxShadow: '0 0 30px rgba(0,255,255,0.4), inset 0 0 30px rgba(255,0,128,0.1)' },
        photoWrapper: { ...basePhoto, border: '2px solid #ff00ff', boxShadow: '0 0 15px rgba(255,0,255,0.5)' },
        header: { ...baseHeader, fontFamily: "'Quicksand', sans-serif", fontWeight: 700, color: '#00ffff', fontSize: '22px', letterSpacing: '0.1em', textShadow: '0 0 20px rgba(0,255,255,0.8), 0 0 40px rgba(0,255,255,0.4)' },
        subheader: { fontSize: '14px', opacity: 0.9, textAlign: 'center', color: '#ff6bff', textShadow: '0 0 10px rgba(255,107,255,0.5)' },
        footer: { textAlign: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(0,255,255,0.3)' },
        footerEmoji: '🌃💜⚡',
        footerDate: { fontSize: '12px', opacity: 0.8, color: '#a5f3fc', textShadow: '0 0 10px rgba(165,243,252,0.5)' },
      };
    case 'birthday':
      return {
        container: { ...baseContainer, background: 'linear-gradient(135deg, #fef3c7 0%, #fce7f3 50%, #e0e7ff 100%)', padding: '16px', border: '4px dotted #f472b6', borderRadius: '16px' },
        photoWrapper: { ...basePhoto, borderRadius: '12px', border: '4px solid #ffffff', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.15)' },
        header: { ...baseHeader, color: '#db2777', fontSize: '26px', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' },
        subheader: { fontSize: '14px', opacity: 0.9, textAlign: 'center', color: '#a855f7' },
        footer: { textAlign: 'center', marginTop: '16px', paddingTop: '12px' },
        footerEmoji: '🎂🎈🎁🎉',
        footerDate: { fontSize: '12px', opacity: 0.8, color: '#9333ea' },
      };
    case 'christmas':
      return {
        container: { ...baseContainer, background: 'linear-gradient(to bottom, #1e3a5f, #2d5a7b, #1e3a5f)', padding: '16px', border: '4px solid #fbbf24', borderRadius: '12px' },
        photoWrapper: { ...basePhoto, borderRadius: '8px', border: '4px solid #ffffff', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' },
        header: { ...baseHeader, color: '#fef08a', fontSize: '24px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' },
        subheader: { fontSize: '14px', opacity: 0.9, textAlign: 'center', color: '#fef9c3' },
        footer: { textAlign: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(250,204,21,0.4)' },
        footerEmoji: '🎄🎅❄️🎁',
        footerDate: { fontSize: '12px', opacity: 0.8, color: '#fef9c3' },
      };
    case 'graduation':
      return {
        container: { ...baseContainer, background: 'linear-gradient(to bottom, #1e3a5f, #172554, #1e3a5f)', padding: '16px', border: '4px solid #eab308', borderRadius: '8px' },
        photoWrapper: { ...basePhoto, border: '3px solid rgba(234,179,8,0.6)', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' },
        header: { ...baseHeader, color: '#fde047', fontSize: '26px', textShadow: '2px 2px 4px rgba(0,0,0,0.4)' },
        subheader: { fontSize: '14px', opacity: 0.9, textAlign: 'center', color: '#fef08a' },
        footer: { textAlign: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(234,179,8,0.3)' },
        footerEmoji: '🎓📜🎉✨',
        footerDate: { fontSize: '12px', opacity: 0.8, color: '#fef08a' },
      };
    case 'halloween':
      return {
        container: { ...baseContainer, background: 'linear-gradient(to bottom, #1f1f3a, #2d1b4e, #1f1f3a)', padding: '16px', border: '4px solid #f97316', borderRadius: '12px', boxShadow: '0 0 30px rgba(249,115,22,0.3)' },
        photoWrapper: { ...basePhoto, borderRadius: '8px', border: '3px solid #a855f7', boxShadow: '0 4px 20px rgba(168,85,247,0.4)' },
        header: { ...baseHeader, color: '#fb923c', fontSize: '26px', textShadow: '2px 2px 8px rgba(0,0,0,0.5)' },
        subheader: { fontSize: '14px', opacity: 0.9, textAlign: 'center', color: '#c4b5fd' },
        footer: { textAlign: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(249,115,22,0.3)' },
        footerEmoji: '🎃👻🦇🕸️',
        footerDate: { fontSize: '12px', opacity: 0.8, color: '#fdba74' },
      };
    case 'thanksgiving':
      return {
        container: { ...baseContainer, background: 'linear-gradient(to bottom, #fef3c7, #fde68a, #fef3c7)', padding: '16px', border: '4px solid #b45309', borderRadius: '12px' },
        photoWrapper: { ...basePhoto, borderRadius: '8px', border: '4px solid #ffffff', boxShadow: '0 4px 15px rgba(180,83,9,0.2)' },
        header: { ...baseHeader, color: '#92400e', fontSize: '24px', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' },
        subheader: { fontSize: '14px', opacity: 0.9, textAlign: 'center', color: '#a16207' },
        footer: { textAlign: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(180,83,9,0.3)' },
        footerEmoji: '🦃🍂🌽🥧',
        footerDate: { fontSize: '12px', opacity: 0.8, color: '#a16207' },
      };
    case 'boho':
      return {
        container: { ...baseContainer, background: 'linear-gradient(to bottom, #fef7ed, #fed7aa, #fef7ed)', padding: '20px', border: '3px solid #d6b89a', borderRadius: '8px' },
        photoWrapper: { ...basePhoto, borderRadius: '4px', border: '4px solid #ffffff', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' },
        header: { ...baseHeader, color: '#78350f', fontSize: '26px', fontStyle: 'italic' },
        subheader: { fontSize: '14px', opacity: 0.8, textAlign: 'center', color: '#92400e' },
        footer: { textAlign: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(214,184,154,0.5)' },
        footerEmoji: '🌾🌻💐✨',
        footerDate: { fontSize: '12px', opacity: 0.7, color: '#92400e' },
      };
    case 'floral':
      return {
        container: { ...baseContainer, background: 'linear-gradient(to bottom, #f0fdf4, #dcfce7, #f0fdf4)', padding: '20px', border: '3px solid #86efac', borderRadius: '12px' },
        photoWrapper: { ...basePhoto, borderRadius: '8px', border: '4px solid #ffffff', boxShadow: '0 4px 15px rgba(34,197,94,0.15)' },
        header: { ...baseHeader, color: '#166534', fontSize: '26px', fontStyle: 'italic' },
        subheader: { fontSize: '14px', opacity: 0.8, textAlign: 'center', color: '#15803d' },
        footer: { textAlign: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(134,239,172,0.5)' },
        footerEmoji: '🌷🌸🌺🌼',
        footerDate: { fontSize: '12px', opacity: 0.7, color: '#15803d' },
      };
    case 'travel':
      return {
        container: { ...baseContainer, background: 'linear-gradient(to bottom, #fef9ef, #fde8c4, #fef9ef)', padding: '16px', border: '4px solid #c9a66b', borderRadius: '8px' },
        photoWrapper: { ...basePhoto, borderRadius: '4px', border: '4px solid #ffffff', boxShadow: '0 4px 15px rgba(0,0,0,0.15)' },
        header: { ...baseHeader, color: '#78350f', fontSize: '24px' },
        subheader: { fontSize: '14px', opacity: 0.8, textAlign: 'center', color: '#a16207' },
        footer: { textAlign: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(201,166,107,0.5)' },
        footerEmoji: '✈️🗺️📸🌍',
        footerDate: { fontSize: '12px', opacity: 0.7, color: '#a16207' },
      };
    case 'summer':
      return {
        container: { ...baseContainer, background: 'linear-gradient(to bottom, #fef3c7, #bae6fd, #a5f3fc)', padding: '16px', border: '4px solid #38bdf8', borderRadius: '16px' },
        photoWrapper: { ...basePhoto, borderRadius: '12px', border: '4px solid #ffffff', boxShadow: '0 6px 20px rgba(56,189,248,0.2)' },
        header: { ...baseHeader, color: '#0369a1', fontSize: '26px', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' },
        subheader: { fontSize: '14px', opacity: 0.9, textAlign: 'center', color: '#0284c7' },
        footer: { textAlign: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(56,189,248,0.4)' },
        footerEmoji: '🌴☀️🏖️🍹',
        footerDate: { fontSize: '12px', opacity: 0.8, color: '#0284c7' },
      };
    case 'concert':
      return {
        container: { ...baseContainer, background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)', padding: '16px', border: '3px solid #a855f7', borderRadius: '12px', boxShadow: '0 0 40px rgba(168,85,247,0.3)' },
        photoWrapper: { ...basePhoto, borderRadius: '8px', border: '2px solid #f472b6', boxShadow: '0 0 20px rgba(244,114,182,0.4)' },
        header: { ...baseHeader, fontFamily: "'Quicksand', sans-serif", fontWeight: 800, color: '#f472b6', fontSize: '24px', letterSpacing: '0.05em', textShadow: '0 0 20px rgba(244,114,182,0.6)' },
        subheader: { fontSize: '14px', opacity: 0.9, textAlign: 'center', color: '#c084fc', textShadow: '0 0 10px rgba(192,132,252,0.4)' },
        footer: { textAlign: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(168,85,247,0.3)' },
        footerEmoji: '🎸🎤🔥🎵',
        footerDate: { fontSize: '12px', opacity: 0.8, color: '#e879f9', textShadow: '0 0 10px rgba(232,121,249,0.4)' },
      };
    default:
      return {
        container: { ...baseContainer, background: '#ffffff', padding: '16px', borderRadius: '16px', boxShadow: '0 10px 40px -10px rgba(219, 112, 147, 0.3)' },
        photoWrapper: { ...basePhoto, borderRadius: '12px', overflow: 'hidden' },
        header: { ...baseHeader, color: '#be185d', fontSize: '24px' },
        subheader: { fontSize: '14px', opacity: 0.8, textAlign: 'center', color: '#6b7280' },
        footer: { textAlign: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(251, 207, 232, 0.5)' },
        footerEmoji: '💘💋😍',
        footerDate: { fontSize: '12px', opacity: 0.7, color: '#6b7280' },
      };
  }
};

export const PhotoStrip = forwardRef<HTMLDivElement, PhotoStripProps>(
  ({ photos, style, filter, title, names, date }, ref) => {
    const styles = getInlineStyles(style);
    const filterStyle = getFilterStyle(filter);

    return (
      <div ref={ref} style={styles.container}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <h2 style={styles.header}>{title}</h2>
          <p style={styles.subheader}>{names}</p>
        </div>

        {/* Photos */}
        <div>
          {photos.map((photo, index) => (
            <div key={index} style={styles.photoWrapper}>
              <img
                src={photo}
                alt={`Photo ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  ...filterStyle,
                }}
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <div style={{ fontSize: '18px', marginBottom: '4px' }}>{styles.footerEmoji}</div>
          <p style={styles.footerDate}>{date}</p>
        </div>
      </div>
    );
  }
);

PhotoStrip.displayName = 'PhotoStrip';
