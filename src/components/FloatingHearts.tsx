import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  emoji: string;
  opacity: number;
}

const emojis = ['💕', '💖', '💗', '💘', '💝', '✨', '💋', '🌸', '🎀', '💐', '🦋', '⭐'];

export const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const createHeart = () => {
      const newHeart: Heart = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        size: Math.random() * 24 + 14,
        delay: Math.random() * 2,
        duration: Math.random() * 5 + 5,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        opacity: Math.random() * 0.4 + 0.3,
      };
      
      setHearts(prev => [...prev, newHeart]);
      
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== newHeart.id));
      }, (newHeart.duration + newHeart.delay) * 1000);
    };

    const interval = setInterval(createHeart, 600);
    
    // Create initial hearts
    for (let i = 0; i < 8; i++) {
      setTimeout(createHeart, i * 150);
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map(heart => (
        <span
          key={heart.id}
          className="absolute animate-heart-float"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            bottom: '-50px',
            opacity: heart.opacity,
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  );
};
