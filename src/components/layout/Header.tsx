import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Globe } from 'lucide-react';
import { brandConfig } from '../../config/brand.config';
import { motionTokens } from '../../config/theme';
import { useCart } from '../cart/CartContext';
import type { Language } from '../../types';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

// Fixed engine component. Merges the strongest patterns seen across the
// legacy projects (Japoneza's top status bar, Caribou's mobile/desktop
// split, Tempo's config-driven cart total) into ONE canonical version.
// Do not fork this per client — everything that should differ per client
// (colors, name, logo, languages) already comes from brand.config.ts.
export const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
  const { count, totalMAD, openDrawer } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const { identity, colors, contact, languages } = brandConfig;

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md transition-all duration-300 ${
        scrolled ? 'shadow-lg' : ''
      }`}
      style={{
        backgroundColor: `${colors.surface}F2`,
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      {/* Status strip — open/closed, city. Optional but part of the fixed
          contract: every client site gets this same trust signal. */}
      <div
        className="hidden sm:flex justify-between items-center text-[11px] font-medium py-1 px-4 tracking-wide"
        style={{ backgroundColor: colors.primary, color: colors.background }}
      >
        <span className="uppercase tracking-wider text-[10px] font-semibold">
          {identity.name} · {identity.city}
        </span>
        <span className="font-mono">{contact.phoneDisplay}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <a href="#top" className="flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src={identity.logoSrc} alt={identity.name} className="h-9 w-auto object-contain" />
          <span className="font-display font-semibold text-lg" style={{ color: colors.textPrimary }}>
            {identity.name}
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          {languages.enabled.length > 1 && (
            <div
              className="flex items-center rounded-full p-1 gap-0.5"
              style={{ backgroundColor: colors.surfaceMuted, border: `1px solid ${colors.border}` }}
            >
              <Globe className="w-3.5 h-3.5 ml-1.5" style={{ color: colors.textMuted }} />
              {languages.enabled.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className="px-2.5 py-1 rounded-full text-xs font-bold uppercase transition-all"
                  style={{
                    backgroundColor: language === lang ? colors.primary : 'transparent',
                    color: language === lang ? colors.background : colors.textMuted,
                  }}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}

          <motion.button
            whileTap={{ scale: 0.95 }}
            transition={{ duration: motionTokens.fast }}
            onClick={openDrawer}
            className="relative flex items-center gap-2 font-bold px-4 py-2.5 rounded-full shadow-md"
            style={{ backgroundColor: colors.primary, color: colors.background }}
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              {count > 0 && (
                <span
                  className="absolute -top-2 -right-2 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.background, color: colors.primary, border: `2px solid ${colors.primary}` }}
                >
                  {count}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-sm">
              {totalMAD} {brandConfig.ordering.currency}
            </span>
          </motion.button>
        </div>
      </div>
    </header>
  );
};
