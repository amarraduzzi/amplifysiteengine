import React from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { brandConfig } from '../../config/brand.config';
import { shadowTokens, motionTokens } from '../../config/theme';
import type { Language, MenuItem } from '../../types';

interface ItemCardProps {
  item: MenuItem;
  language: Language;
  onOpen: (item: MenuItem) => void;
}

// Fixed engine component. Every menu item on every client site renders
// through this exact card — image, name, price, quick-add. Visual variety
// between clients comes from brand.config colors/fonts and the photos
// themselves, never from a one-off card layout.
export const ItemCard: React.FC<ItemCardProps> = ({ item, language, onOpen }) => {
  const { colors, ordering } = brandConfig;
  const name = item.name[language] ?? item.name.fr;
  const description = item.description?.[language] ?? item.description?.fr;

  return (
    <motion.button
      onClick={() => onOpen(item)}
      whileHover={{ y: -4 }}
      transition={{ duration: motionTokens.base, ease: motionTokens.easeOut }}
      className="text-left rounded-2xl overflow-hidden flex flex-col"
      style={{ backgroundColor: colors.surface, boxShadow: shadowTokens.card, border: `1px solid ${colors.border}` }}
    >
      <div className="aspect-[4/3] w-full overflow-hidden relative">
        <img src={item.image} alt={name} className="w-full h-full object-cover" loading="lazy" />
        {item.signature && (
          <span
            className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
            style={{ backgroundColor: colors.accent, color: colors.background }}
          >
            Signature
          </span>
        )}
      </div>
      <div className="p-3.5 flex flex-col gap-1.5 flex-1">
        <h3 className="font-display font-semibold text-base leading-tight" style={{ color: colors.textPrimary }}>
          {name}
        </h3>
        {description && (
          <p className="text-xs line-clamp-2" style={{ color: colors.textMuted }}>
            {description}
          </p>
        )}
        <div className="mt-auto pt-2 flex items-center justify-between">
          <span className="font-bold text-sm" style={{ color: colors.textPrimary }}>
            {item.priceMAD} {ordering.currency}
          </span>
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: colors.primary, color: colors.background }}
          >
            <Plus className="w-4 h-4" />
          </span>
        </div>
      </div>
    </motion.button>
  );
};
