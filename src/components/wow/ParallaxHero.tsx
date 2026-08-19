import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { brandConfig } from '../../config/brand.config';
import { MagneticButton } from '../ui/MagneticButton';
import type { Language } from '../../types';

interface WowHeroProps {
  language: Language;
  onCtaClick: () => void;
}

const headlineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } },
};
const wordVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

// Wow module (Layer 3): "parallaxHero". The single biggest lever for "wow
// factor". Techniques used:
//   1. Slow Ken Burns zoom on the photo — never fully static.
//   2. A soft, EDGE-ONLY brand-color vignette (radial, not a flat tint over
//      the whole image) — ties the photo to the palette without dulling
//      the food itself. A flat full-image tint looks "branded" but makes
//      food look less appetizing, which matters more for a restaurant.
//   3. A two-tone type system: accent eyebrow + oversized display headline,
//      revealed word-by-word instead of as one flat block.
//   4. A magnetic, glowing CTA (see ui/MagneticButton) instead of a static
//      pill button.
export const ParallaxHero: React.FC<WowHeroProps> = ({ language, onCtaClick }) => {
  const { hero, colors, identity } = brandConfig;
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 180]);

  const headline = hero.headline[language] ?? hero.headline.fr;
  const subheadline = hero.subheadline[language] ?? hero.subheadline.fr;
  const cta = hero.ctaLabel[language] ?? hero.ctaLabel.fr;
  const words = headline.split(' ');

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

        {/* Edge-only brand vignette: transparent over the center (where the
            food is) so the dish stays true-color and appetizing, tinted
            only toward the edges to still feel on-brand. */}
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{
            background: `radial-gradient(ellipse at center, transparent 30%, ${colors.primaryDark} 145%)`,
            opacity: 0.5,
          }}
        />
        <div className="absolute inset-0" style={{ background: `${colors.background}22` }} />
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

        <motion.h1
          variants={headlineVariants}
          initial="hidden"
          animate="visible"
          className="font-display text-[2.6rem] leading-[1.02] sm:text-7xl font-semibold tracking-tight"
          style={{ color: colors.textPrimary }}
        >
          {words.map((word, i) => (
            <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.28em]">
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <p className="mt-5 text-base sm:text-lg max-w-xl mx-auto" style={{ color: colors.textMuted }}>
          {subheadline}
        </p>

        <div className="mt-8">
          <MagneticButton
            onClick={onCtaClick}
            glowColor={colors.accent}
            className="px-9 py-4 rounded-full font-bold text-sm tracking-wide"
            style={{
              backgroundColor: colors.primary,
              color: colors.background,
              boxShadow: `0 0 0 1px ${colors.textPrimary}26 inset, 0 12px 30px -8px ${colors.primaryDark}CC`,
            }}
          >
            {cta}
          </MagneticButton>
        </div>
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
