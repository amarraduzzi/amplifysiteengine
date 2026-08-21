// Display-only menu highlights for the marketing site — NOT the ordering
// system. This site deliberately does not implement cart/checkout (see the
// architecture decision: ordering lives on the separate order-landing-page
// engine, linked via siteConfig.ordering.orderSiteUrl). This is just enough
// menu content, per category, to be genuinely useful to a visitor and to
// give Google/AI crawlers real food-related text to index — the full,
// orderable menu (60+ items) lives on the order site.
//
// Content pulled directly from indianflavor.pages.dev's live menu (Aug
// 2026) — real dishes/prices/descriptions, not placeholders. Category
// labels match the order site's own category names so a customer doesn't
// get confused seeing two different naming schemes across the two sites.
// Only a curated subset per category, not the full list.
//
// Trilingual: dish NAMES stay in their conventional English/transliterated
// form across all three languages (this is standard practice for Indian
// restaurant menus, including in French and Arabic-market restaurants —
// "Vegetable Samosa" isn't translated to "Samoussa aux légumes" on the
// order site either); only the descriptive sentence changes per language.
import type { LocalizedText } from '../i18n/languages';

export interface MenuHighlightItem {
  name: string;
  description: LocalizedText;
  priceMAD: number;
  // Per-DISH photo — this is now the default template pattern, not a
  // one-off for this client: a menu that shows what the food actually
  // looks like sells harder than a menu that only names it, and buyers
  // scanning a category banner photo above six unrelated items (the old
  // design) can't tell which dish is which. Same honesty rule as the
  // category `image` below applies at the item level too — only set this
  // when a real, accurate photo of THIS exact dish exists. An item with no
  // photo just renders as a text-only row; that's the correct fallback,
  // never substitute a photo of a different dish to fill the gap.
  image?: string;
  imageAlt?: LocalizedText;
  // Powers the Menu page's "Végétarien" filter (final punch-list item #3).
  // Deliberately only a vegetarian flag, not vegan — vegetarian is a fact
  // we can read straight off each dish's own ingredient description (no
  // meat named), but "vegan" would require certainty about hidden dairy
  // (ghee in a naan dough, yogurt in a marinade) that isn't verifiable
  // from this content alone. Same honesty standard as aggregateRating in
  // testimonials.ts: don't claim what isn't confirmed.
  vegetarian?: boolean;
}
export interface MenuHighlightCategory {
  label: LocalizedText;
  items: MenuHighlightItem[];
  // Real photo for this category — ONLY set when a genuine, accurate match
  // exists among the client's supplied photography. Deliberately left
  // undefined for categories with no honest match (Spécialités Tandoori,
  // Hyderabadi Dum Biryani, Boissons Fraîches) rather than reusing an
  // unrelated dish photo under the wrong category label — see the honesty
  // principle already documented for aggregateRating in testimonials.ts;
  // the same standard applies here. Ask the client for more per-category
  // shots to fill the gaps instead of faking a match.
  image?: string;
  imageAlt?: LocalizedText;
}

export const menuHighlights: MenuHighlightCategory[] = [
  {
    // No category-level banner here anymore — now that both items below
    // have their own accurate dish photo, a generic category banner on
    // top would just repeat the same food a second time. Category banners
    // stay for the categories below that DON'T have per-item photos yet.
    label: { fr: 'Entrées Végétariennes', en: 'Vegetarian Starters', ar: 'المقبلات النباتية' },
    items: [
      {
        name: 'Vegetable Samosa (2 pcs)',
        description: {
          fr: 'Pâtisserie indienne croustillante farcie de légumes aromatiques épicés.',
          en: 'Crispy Indian pastry filled with fragrant, spiced vegetables.',
          ar: 'معجنات هندية مقرمشة محشوة بخضروات عطرية متبّلة.',
        },
        priceMAD: 40,
        vegetarian: true,
        image: '/images/dish-samosa.webp',
        imageAlt: {
          fr: 'Deux samosas végétariens croustillants avec sauce tamarin',
          en: 'Two crispy vegetable samosas with tamarind sauce',
          ar: 'قطعتا سامبوسة نباتية مقرمشة مع صلصة التمر الهندي',
        },
      },
      {
        name: 'Vegetable Pani Puri (6 pcs)',
        description: {
          fr: "Boules croustillantes farcies d'eau acidulée épicée et de chutneys.",
          en: 'Crispy hollow puris filled with tangy spiced water and chutneys.',
          ar: 'كرات مقرمشة محشوة بماء حامض متبّل وصلصات الشطني.',
        },
        priceMAD: 45,
        vegetarian: true,
        image: '/images/dish-pani-puri.webp',
        imageAlt: {
          fr: 'Pani puri garnis de pommes de terre, pois chiches et coriandre',
          en: 'Pani puri topped with potatoes, chickpeas and coriander',
          ar: 'باني بوري محشوة بالبطاطس والحمص والكزبرة',
        },
      },
    ],
  },
  {
    label: { fr: 'Spécialités Tandoori', en: 'Tandoori Specialties', ar: 'أطباق التندور' },
    items: [
      {
        name: 'Tandoori Chicken',
        description: {
          fr: 'Poulet mariné aux épices et yaourt, grillé au four tandoor traditionnel.',
          en: 'Chicken marinated in spices and yogurt, grilled in a traditional tandoor oven.',
          ar: 'دجاج متبّل بالبهارات واللبن، مشوي في فرن التندور التقليدي.',
        },
        priceMAD: 100,
        image: '/images/dish-tandoori-chicken.webp',
        imageAlt: {
          fr: 'Cuisses de poulet tandoori grillées, servies avec oignons et citron',
          en: 'Grilled tandoori chicken legs, served with onions and lemon',
          ar: 'أفخاذ دجاج تندوري مشوية، تُقدّم مع البصل والليمون',
        },
      },
      {
        name: 'Chicken Tikka',
        description: {
          fr: 'Brochettes de dés de poulet désossés marinés et cuits au tandoor.',
          en: 'Skewers of marinated boneless chicken chunks, cooked in the tandoor.',
          ar: 'أسياخ من قطع الدجاج منزوعة العظم والمتبّلة، مطهوة في التندور.',
        },
        priceMAD: 95,
        image: '/images/dish-chicken-tikka.webp',
        imageAlt: {
          fr: 'Brochettes de chicken tikka grillées, garnies de coriandre fraîche',
          en: 'Grilled chicken tikka skewers, garnished with fresh coriander',
          ar: 'أسياخ تشيكن تكا مشوية، مزينة بالكزبرة الطازجة',
        },
      },
    ],
  },
  {
    label: { fr: 'Hyderabadi Dum Biryani', en: 'Hyderabadi Dum Biryani', ar: 'برياني حيدر آبادي' },
    image: '/images/gallery-biryani.webp',
    imageAlt: {
      fr: 'Biryani, pani puri et naan servis à table',
      en: 'Biryani, pani puri and naan served at the table',
      ar: 'برياني وباني بوري وخبز نان مُقدَّمة على الطاولة',
    },
    items: [
      {
        name: 'Lamb Biryani',
        description: {
          fr: "Riz basmati parfumé mi-cuit avec de l'agneau tendre et épices douces.",
          en: 'Fragrant basmati rice slow-cooked with tender lamb and mild spices.',
          ar: 'أرز بسمتي عطري مطهو مع لحم الضأن الطري وبهارات معتدلة.',
        },
        priceMAD: 110,
      },
      {
        name: 'Chicken Biryani',
        description: {
          fr: "Spécialité d'Hyderabad : poulet et riz basmati cuits à l'étouffée.",
          en: "Hyderabad's signature dish: chicken and basmati rice slow-cooked together.",
          ar: 'طبق حيدر آباد المميز: دجاج وأرز بسمتي مطهوان معًا على نار هادئة.',
        },
        priceMAD: 95,
      },
    ],
  },
  {
    label: { fr: 'Plats Principaux', en: 'Main Courses', ar: 'الأطباق الرئيسية' },
    image: '/images/gallery-curries.webp',
    imageAlt: {
      fr: 'Currys mijotés servis en plat principal',
      en: 'Slow-cooked curries served as a main course',
      ar: 'أطباق كاري مطهوة على نار هادئة كطبق رئيسي',
    },
    items: [
      {
        name: 'Butter Chicken',
        description: {
          fr: 'Incontournable poulet mijoté dans une sauce veloutée au beurre et tomate.',
          en: 'The classic: chicken simmered in a velvety butter and tomato sauce.',
          ar: 'الطبق الأشهر: دجاج مطهو في صلصة الزبدة والطماطم المخملية.',
        },
        priceMAD: 80,
      },
      {
        name: 'Chicken Tikka Masala',
        description: {
          fr: 'Poulet tandoori grillé servi dans une sauce masala crémeuse.',
          en: 'Grilled tandoori chicken served in a creamy masala sauce.',
          ar: 'دجاج تندوري مشوي يُقدَّم في صلصة ماسالا كريمية.',
        },
        priceMAD: 80,
      },
    ],
  },
  {
    label: { fr: 'Naan, Riz & Nouilles', en: 'Naan, Rice & Noodles', ar: 'خبز النان والأرز والنودلز' },
    image: '/images/gallery-naan.webp',
    imageAlt: {
      fr: 'Naan fait maison, cuit au tandoor',
      en: 'House-made naan, baked in the tandoor',
      ar: 'خبز نان محضّر منزليًا، مخبوز في التندور',
    },
    items: [
      {
        name: 'Garlic Naan',
        description: {
          fr: "Naan chaud parfumé à l'ail frais haché et coriandre.",
          en: 'Warm naan flavored with fresh chopped garlic and coriander.',
          ar: 'خبز نان دافئ منكّه بالثوم الطازج المفروم والكزبرة.',
        },
        priceMAD: 29,
        vegetarian: true,
      },
      {
        name: 'Cheese Naan',
        description: {
          fr: 'Pain tandoori moelleux généreusement fourré au fromage.',
          en: 'Soft tandoori bread generously stuffed with cheese.',
          ar: 'خبز تندوري طري محشو بسخاء بالجبن.',
        },
        priceMAD: 35,
        vegetarian: true,
      },
    ],
  },
  {
    label: { fr: 'Boissons Fraîches', en: 'Cold Drinks', ar: 'المشروبات الباردة' },
    items: [
      {
        name: 'Mango Lassi',
        description: {
          fr: 'Boisson indienne onctueuse au yaourt et pulpe de mangue fraîche.',
          en: 'Creamy Indian yogurt drink with fresh mango pulp.',
          ar: 'مشروب هندي كريمي من اللبن مع لب المانجو الطازج.',
        },
        priceMAD: 40,
        vegetarian: true,
      },
    ],
  },
];
