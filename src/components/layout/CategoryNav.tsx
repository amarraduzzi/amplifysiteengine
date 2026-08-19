import React from 'react';
import { brandConfig } from '../../config/brand.config';
import type { Language, MenuCategory } from '../../types';

interface CategoryNavProps {
  categories: MenuCategory[];
  activeCategoryId: string;
  onSelect: (categoryId: string) => void;
  language: Language;
}

// Fixed engine component. Sticky under the header, horizontally scrollable
// on mobile. Same on every client site — only the category list (from
// src/data/menu.ts) changes.
export const CategoryNav: React.FC<CategoryNavProps> = ({ categories, activeCategoryId, onSelect, language }) => {
  const { colors } = brandConfig;

  return (
    <nav
      className="sticky z-30 top-[var(--header-h,4rem)] backdrop-blur-md"
      style={{ backgroundColor: `${colors.background}E6`, borderBottom: `1px solid ${colors.border}` }}
    >
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-none">
        {categories.map((cat) => {
          const active = cat.id === activeCategoryId;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all"
              style={{
                backgroundColor: active ? colors.primary : colors.surfaceMuted,
                color: active ? colors.background : colors.textMuted,
              }}
            >
              {cat.label[language] ?? cat.label.fr}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
