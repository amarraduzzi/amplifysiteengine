import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  glowColor?: string;
}

// Shared UI primitive (part of the fixed engine, not a wow module — usable
// anywhere a primary CTA needs presence). Three effects stacked:
//   1. Magnetic pull: the button nudges toward the cursor within a small
//      radius, released with a spring back to center.
//   2. A blurred glow halo behind the button in a color distinct from the
//      button fill, so it pops even against a similarly-toned photo.
//   3. A diagonal light sweep across the label on hover.
export const MagneticButton: React.FC<MagneticButtonProps> = ({ children, onClick, className, style, glowColor }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });
  const [hovering, setHovering] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.25);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    setHovering(false);
  };

  return (
    <span className="relative inline-block">
      {glowColor && (
        <motion.span
          className="absolute inset-0 rounded-full blur-2xl -z-10"
          style={{ backgroundColor: glowColor }}
          animate={{ opacity: hovering ? 0.6 : 0.15, scale: hovering ? 1.35 : 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      <motion.button
        ref={ref}
        onClick={onClick}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={reset}
        style={{ x: springX, y: springY, ...style }}
        className={`relative overflow-hidden ${className ?? ''}`}
      >
        <span className="relative z-10">{children}</span>
        <motion.span
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)' }}
          initial={{ x: '-130%' }}
          animate={{ x: hovering ? '130%' : '-130%' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.button>
    </span>
  );
};
