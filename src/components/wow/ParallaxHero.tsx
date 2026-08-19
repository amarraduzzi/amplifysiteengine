import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { brandConfig } from '../../config/brand.config';
import type { Language } from '../../types';

interface WowHeroProps {
  language: Language;
  onCtaClick: () => void;
}

// Wow module (Layer 3): "parallaxHero". Background media scrolls slower
// than the foreground text, foreground text fades/slides up on load.
// Selected per client in brand.config.ts -> wowModules. Only one hero
// module should be active at a time; App.tsx picks which one to render.
export const ParallaxHero: React.FC<WowHeroProps> = ({ language, onCtaClick }) => {
  const { hero, colors } = brandConfig;
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 180]);

  const headline = hero.headline[language] ?? hero.headline.fr;
  const subheadline = hero.subheadline[language] ?? hero.subheadline.fr;
  const cta = hero.ctaLabel[language] ?? hero.ctaLabel.fr;

  return (
    <section id="top" className="relative h-[90vh] min-h-[560px] overflow-hidden flex items-end">
      <motion.div style={{ y }} className="absolute inset-0 -top-20">
        {hero.backgroundType === 'video' ? (
          <video src={hero.backgroundSrc} autoPlay muted loop playsInline className="w-full h-full object-cover" />
        ) : (
          <img src={hero.backgroundSrc} alt="" className="w-full h-full object-cover" />
        )}
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(180deg, ${colors.background}00 0%, ${colors.background} 95%)` }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-3xl mx-auto px-4 pb-16 text-center"
      >
        <h1 className="font-display text-4xl sm:text-6xl font-semibold leading-[1.05]" style={{ color: colors.textPrimary }}>
          {headline}
        </h1>
        <p className="mt-4 text-base sm:text-lg" style={{ color: colors.textMuted }}>
          {subheadline}
        </p>
        <button
          onClick={onCtaClick}
          className="mt-7 px-8 py-3.5 rounded-full font-bold"
          style={{ backgroundColor: colors.primary, color: colors.background }}
        >
          {cta}
        </button>
      </motion.div>
    </section>
  );
};
