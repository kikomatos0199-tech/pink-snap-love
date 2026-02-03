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
}

const getInlineStyles = (style: string): StyleConfig => {
  const baseContainer: React.CSSProperties = {
    width: '280px',
    display: 'inline-block',
    fontFamily: "'Quicksand', sans-serif",
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
        container: { ...baseContainer, background: 'linear-gradient(to bottom, #fbcfe8, #fce7f3, #ffffff)', padding: '16px', borderRadius: '24px', border: '4px solid #f9a8d4' },
        photoWrapper: { ...basePhoto, borderRadius: '16px', border: '4px solid #ffffff', boxShadow: '0 4px 20px -4px rgba(219, 112, 147, 0.2)' },
        header: { ...baseHeader, color: '#ec4899', fontSize: '24px' },
        subheader: { fontSize: '14px', opacity: 0.8, textAlign: 'center', color: '#be185d' },
        footer: { textAlign: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(249, 168, 212, 0.5)' },
        footerEmoji: '🌸💖🎀',
        footerDate: { fontSize: '12px', opacity: 0.7, color: '#be185d' },
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
        container: { ...baseContainer, background: 'linear-gradient(to bottom, #111827, #581c87, #111827)', padding: '16px', border: '2px solid #22d3d1', boxShadow: '0 0 20px rgba(0,255,255,0.5)' },
        photoWrapper: { ...basePhoto, border: '2px solid #ec4899', boxShadow: '0 0 10px rgba(255,0,128,0.6)' },
        header: { ...baseHeader, fontFamily: 'monospace', color: '#22d3d1', fontSize: '20px', letterSpacing: '0.1em', textShadow: '0 0 10px rgba(0,255,255,0.8)' },
        subheader: { fontSize: '14px', opacity: 0.9, textAlign: 'center', color: '#a5f3fc' },
        footer: { textAlign: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(34,211,209,0.5)' },
        footerEmoji: '🌃💜⚡',
        footerDate: { fontSize: '12px', opacity: 0.8, color: '#a5f3fc' },
      };
    case 'birthday':
      return {
        container: { ...baseContainer, background: 'linear-gradient(to bottom, #fde047, #f472b6, #a855f7)', padding: '16px', border: '4px solid #facc15' },
        photoWrapper: { ...basePhoto, borderRadius: '12px', border: '4px solid #ffffff', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)', transform: 'rotate(1deg)' },
        header: { ...baseHeader, color: '#ffffff', fontSize: '24px', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' },
        subheader: { fontSize: '14px', opacity: 0.9, textAlign: 'center', color: '#ffffff' },
        footer: { textAlign: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.4)' },
        footerEmoji: '🎂🎈🎁',
        footerDate: { fontSize: '12px', opacity: 0.8, color: '#ffffff' },
      };
    case 'christmas':
      return {
        container: { ...baseContainer, background: 'linear-gradient(to bottom, #dc2626, #15803d, #dc2626)', padding: '16px', border: '4px solid #facc15' },
        photoWrapper: { ...basePhoto, borderRadius: '8px', border: '4px solid #ffffff', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' },
        header: { ...baseHeader, color: '#fde047', fontSize: '24px', textShadow: '2px 2px 4px rgba(0,0,0,0.4)' },
        subheader: { fontSize: '14px', opacity: 0.9, textAlign: 'center', color: '#fef9c3' },
        footer: { textAlign: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(250,204,21,0.5)' },
        footerEmoji: '🎄🎅❄️',
        footerDate: { fontSize: '12px', opacity: 0.8, color: '#fef9c3' },
      };
    case 'graduation':
      return {
        container: { ...baseContainer, background: 'linear-gradient(to bottom, #1e3a8a, #1e40af, #1e3a8a)', padding: '16px', border: '4px solid #eab308' },
        photoWrapper: { ...basePhoto, border: '2px solid rgba(234,179,8,0.7)', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' },
        header: { ...baseHeader, color: '#facc15', fontSize: '24px', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' },
        subheader: { fontSize: '14px', opacity: 0.9, textAlign: 'center', color: '#fef08a' },
        footer: { textAlign: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(234,179,8,0.4)' },
        footerEmoji: '🎓📜🎉',
        footerDate: { fontSize: '12px', opacity: 0.8, color: '#fef08a' },
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
