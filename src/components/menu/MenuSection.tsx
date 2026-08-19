import React from 'react';
import { ItemCard } from './ItemCard';
import type { Language, MenuCategory, MenuItem } from '../../types';

interface MenuSectionProps {
  categories: MenuCategory[];
  items: MenuItem[];
  language: Language;
  onOpenItem: (item: MenuItem) => void;
}

// Fixed engine component. Groups items by category and renders the grid.
// Category order and item order come straight from src/data/menu.ts.
export const MenuSection: React.FC<MenuSectionProps> = ({ categories, items, language, onOpenItem }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
      {categories.map((cat) => {
        const catItems = items.filter((i) => i.categoryId === cat.id);
        if (catItems.length === 0) return null;
        return (
          <section key={cat.id} id={`cat-${cat.id}`}>
            <h2 className="font-display text-2xl font-semibold mb-4">{cat.label[language] ?? cat.label.fr}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {catItems.map((item) => (
                <ItemCard key={item.id} item={item} language={language} onOpen={onOpenItem} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};
