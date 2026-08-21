// Curated testimonials for Indian Flavors (Rabat) — real reviews sourced
// from the restaurant's Tripadvisor page (see sourceUrl on each entry) and
// translated to French, English and Arabic, not fabricated. Republishing
// real, on-domain reviews is what the standing note in site.config.ts is
// about: AI answer engines scan review PAGES for recommendations, not just
// the third-party listing itself.
//
// `aggregateRating` is the REAL overall rating from Tripadvisor (4.4/5,
// 43 reviews at time of writing) — deliberately NOT computed from the
// testimonials array below. Only showing a curated, mostly-positive
// selection while claiming its average as the site-wide rating would be
// misleading structured data; this keeps the JSON-LD honest even though
// the visible selection skews positive (standard, legitimate curation —
// the number just has to stay real). Numbers, not text, so no localization
// needed here.
//
// One 4-star review (Rehaan E.) is included on purpose: a testimonials
// page that is 100% five stars reads as curated-to-the-point-of-fake to a
// skeptical visitor. A little texture is more credible, not less.
import type { LocalizedText } from '../i18n/languages';

export interface Testimonial {
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: LocalizedText;
  date: string; // ISO date, used in the Review JSON-LD
  sourceUrl?: string;
}

const TRIPADVISOR_URL =
  'https://www.tripadvisor.com/Restaurant_Review-g293736-d26503526-Reviews-Indian_Flavors_Restaurant-Rabat_Rabat_Sale_Kenitra.html';

export const aggregateRating = {
  ratingValue: '4.4',
  reviewCount: '43',
};

export const testimonials: Testimonial[] = [
  {
    name: 'Farzana H.',
    rating: 5,
    text: {
      fr: "Des saveurs vraiment authentiques de la cuisine indo-pakistanaise. Le meilleur Chicken Manchow Soup que j'ai goûté, portions généreuses de lamb kadai et de butter chicken, service très attentionné.",
      en: 'Truly authentic flavors of Indo-Pakistani cuisine. The best Chicken Manchow Soup I have tasted, generous portions of lamb kadai and butter chicken, very attentive service.',
      ar: 'نكهات أصيلة حقًا للمطبخ الهندي الباكستاني. أفضل شوربة تشيكن مانشو تذوقتها، وحصص سخية من لحم الضأن كاداي والزبدة تشيكن، وخدمة مهتمة جدًا.',
    },
    date: '2026-01-15',
    sourceUrl: TRIPADVISOR_URL,
  },
  {
    name: 'Karolina S.',
    rating: 5,
    text: {
      fr: "Restaurant soigné et chaleureux, cuisine délicieuse. Le lamb biryani était tout simplement le meilleur que j'ai mangé. Personnel excellent.",
      en: 'A polished, warm restaurant with delicious food. The lamb biryani was simply the best I have ever had. Excellent staff.',
      ar: 'مطعم أنيق ودافئ، ومأكولات لذيذة. كان برياني لحم الضأن ببساطة الأفضل الذي تناولته على الإطلاق. طاقم ممتاز.',
    },
    date: '2024-10-12',
    sourceUrl: TRIPADVISOR_URL,
  },
  {
    name: 'Amna S.',
    rating: 5,
    text: {
      fr: "Cuisine indienne incroyable. On a pris pani puri, samosa, butter chicken et lamb rogan josh — excellent service, et l'ambiance avec la musique bollywood en plus.",
      en: 'Incredible Indian food. We had pani puri, samosa, butter chicken and lamb rogan josh — excellent service, plus a great atmosphere with Bollywood music.',
      ar: 'مأكولات هندية رائعة. طلبنا باني بوري وسامبوسة وبتر تشيكن ولحم ضأن روغان جوش — خدمة ممتازة، وأجواء رائعة مع موسيقى بوليوود.',
    },
    date: '2026-06-10',
    sourceUrl: TRIPADVISOR_URL,
  },
  {
    name: 'Vince A.',
    rating: 5,
    text: {
      fr: "Cet endroit, c'est du 10/10. Personnel adorable et le naan tout simplement le meilleur que j'ai mangé.",
      en: "This place is a 10/10. Lovely staff, and simply the best naan I have ever had.",
      ar: 'هذا المكان رائع بكل المقاييس. طاقم لطيف، وأفضل خبز نان تناولته على الإطلاق.',
    },
    date: '2025-10-05',
    sourceUrl: TRIPADVISOR_URL,
  },
  {
    name: 'Wahiba S. E.',
    rating: 5,
    text: {
      fr: "Une cuisine pleine de saveurs indiennes authentiques. Le butter chicken et le naan à l'ail étaient parfaits, service rapide et amical.",
      en: 'Cooking full of authentic Indian flavors. The butter chicken and garlic naan were perfect, fast and friendly service.',
      ar: 'مأكولات مليئة بالنكهات الهندية الأصيلة. كانت الزبدة تشيكن وخبز النان بالثوم مثاليين، وخدمة سريعة وودودة.',
    },
    date: '2025-07-20',
    sourceUrl: TRIPADVISOR_URL,
  },
  {
    name: 'Rehaan E.',
    rating: 4,
    text: {
      fr: "Très bonne cuisine, serveur sympathique. Le butter chicken était un peu sucré à mon goût, et j'aurais aimé pouvoir payer par carte.",
      en: 'Very good food, friendly waiter. The butter chicken was a bit sweet for my taste, and I would have liked to pay by card.',
      ar: 'طعام جيد جدًا، ونادل ودود. كانت الزبدة تشيكن حلوة قليلًا بالنسبة لذوقي، وكنت أتمنى لو أمكن الدفع بالبطاقة.',
    },
    date: '2024-06-18',
    sourceUrl: TRIPADVISOR_URL,
  },
];
