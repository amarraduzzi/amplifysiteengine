import React, { useState } from 'react';
import { brandConfig } from './config/brand.config';
import { cssVarsFromBrand } from './config/theme';
import { CartProvider } from './components/cart/CartContext';
import { Header } from './components/layout/Header';
import { CategoryNav } from './components/layout/CategoryNav';
import { MenuSection } from './components/menu/MenuSection';
import { ItemModal } from './components/menu/ItemModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { Footer } from './components/layout/Footer';
import { ParallaxHero } from './components/wow/ParallaxHero';
import { EditorialMoment } from './components/wow/EditorialMoment';
import { categories, menuItems } from './data/menu.example'; // -> switch to './data/menu' per client
import type { Language, MenuItem } from './types';

// App.tsx wires Layer 1 (fixed) + Layer 2 (brand.config data) + Layer 3
// (the wow modules picked in brand.config.wowModules) together. This file
// may need small edits when adding/removing wow modules for a client, but
// the component implementations it imports never change.
export default function App() {
  const [language, setLanguage] = useState<Language>(brandConfig.languages.default);
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id ?? '');
  const [openItem, setOpenItem] = useState<MenuItem | null>(null);

  const signatureItem = menuItems.find((i) => i.signature);
  const activeWow = brandConfig.wowModules[0] ?? 'none';

  const scrollToMenu = () => {
    document.getElementById(`cat-${categories[0]?.id}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <CartProvider>
      <div style={cssVarsFromBrand(brandConfig.colors) as React.CSSProperties}>
        <Header language={language} setLanguage={setLanguage} />

        {activeWow === 'parallaxHero' || brandConfig.wowModules.includes('parallaxHero') ? (
          <ParallaxHero language={language} onCtaClick={scrollToMenu} />
        ) : null}

        <CategoryNav
          categories={categories}
          activeCategoryId={activeCategoryId}
          onSelect={(id) => {
            setActiveCategoryId(id);
            document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: 'smooth' });
          }}
          language={language}
        />

        <MenuSection categories={categories.slice(0, 1)} items={menuItems} language={language} onOpenItem={setOpenItem} />

        {brandConfig.wowModules.includes('editorialMoment') && (
          <EditorialMoment language={language} signatureItem={signatureItem} />
        )}

        <MenuSection categories={categories.slice(1)} items={menuItems} language={language} onOpenItem={setOpenItem} />

        <Footer language={language} />

        <ItemModal item={openItem} language={language} onClose={() => setOpenItem(null)} />
        <CartDrawer language={language} />
      </div>
    </CartProvider>
  );
}
