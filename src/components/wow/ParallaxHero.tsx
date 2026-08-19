import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { brandConfig } from '../../config/brand.config';
import type { Language } from '../../types';

interface WowHeroProps {
  language: Language;
  onCtaClick: () => void;
}

// Wow module (Layer 3): "parallaxHero". This is the single biggest lever
// for "wow factor" — everything below only has to be sleek and correct,
// the hero has to actually impress. Three deliberate techniques:
//   1. A slow Ken Burns zoom on the photo (never fully static).
//   2. A brand-color duotone grade over the photo (mix-blend-mode), so any
//      client photo — no matter its own colors — reads as "on-brand"
//      instead of a stock image dropped on top of a UI.
//   3. A visible two-tone type system: accent-colored eyebrow label above
//      an oversized display headline, exactly the editorial contrast that
//      was flat before.
export const ParallaxHero: React.FC<WowHeroProps> = ({ language, onCtaClick }) => {
  const { hero, colors, identity } = brandConfig;
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 180]);

  const headline = hero.headline[language] ?? hero.headline.fr;
  const subheadline = hero.subheadline[language] ?? hero.subheadline.fr;
  const cta = hero.ctaLabel[language] ?? hero.ctaLabel.fr;

  return (
    <section id="top" className="relative h-[92vh] min-h-[600px] overflow-hidden flex items-center">
      <motion.div style={{ y }} className="absolute inset-0 -top-20">
        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          {hero.backgroundType === 'video' ? (
            <video src={hero.backgroundSrc} autoPlay muted loop playsInline className="w-full h-full object-cover" />
          ) : (
            <img src={hero.backgroundSrc} alt="" className="w-full h-full object-cover" />
          )}
        </motion.div>

        {/* Brand duotone grade — ties ANY client photo to the palette
            without ever touching the source image. */}
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{ background: `linear-gradient(150deg, ${colors.primaryDark} 0%, ${colors.accent} 130%)`, opacity: 0.55 }}
        />
        <div className="absolute inset-0" style={{ background: `${colors.background}33` }} />
        {/* Legibility gradient for the text block */}
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(0deg, ${colors.background} 5%, ${colors.background}00 55%)` }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-3xl mx-auto px-5 text-center"
      >
        <span
          className="inline-block text-xs font-bold uppercase tracking-[0.3em] mb-4"
          style={{ color: colors.accent }}
        >
          {identity.city} · {identity.country}
        </span>
        <h1
          className="font-display text-[2.6rem] leading-[1.02] sm:text-7xl font-semibold tracking-tight"
          style={{ color: colors.textPrimary }}
        >
          {headline}
        </h1>
        <p className="mt-5 text-base sm:text-lg max-w-xl mx-auto" style={{ color: colors.textMuted }}>
          {subheadline}
        </p>
        <button
          onClick={onCtaClick}
          className="mt-8 px-9 py-4 rounded-full font-bold text-sm tracking-wide shadow-2xl transition-transform hover:scale-[1.03]"
          style={{ backgroundColor: colors.primary, color: colors.background }}
        >
          {cta}
        </button>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="w-5 h-5" style={{ color: colors.textMuted }} />
      </motion.div>
    </section>
  );
};
