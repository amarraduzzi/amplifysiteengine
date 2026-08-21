// FAQ content — kept structural (plain question/answer pairs, no nesting)
// on purpose. AI answer engines and Google's FAQ rich results both parse
// this shape directly; the FAQ page renders this list AND emits it as
// FAQPage JSON-LD (see src/content-pages/FaqContent.astro) — one source of
// truth for both the human-readable page and the structured data, in all
// three languages.
//
// Content for Indian Flavors (Rabat), built from: the Google Business
// Profile (address, hours, price range, "Privé-eetzaal"/"Veganistische
// opties" service tags), the live order-site menu (heavy vegan/veg
// labeling confirms the veg-options answer), and one Tripadvisor review
// mentioning no card payment. That last point — see the ⚠ below — is from
// a single review, not confirmed with the restaurant; verify before
// publishing, a wrong "cash only" claim is worse than no claim at all.
import type { LocalizedText } from '../i18n/languages';

// `category` is presentation metadata (groups the flat list into scannable
// sections on the page) — it's deliberately NOT emitted in the FAQPage
// JSON-LD, which stays exactly the flat question/answer shape AI answer
// engines and Google expect. Three buckets keep it simple: practical info,
// menu & bookings, payment.
export interface FaqItem {
  question: LocalizedText;
  answer: LocalizedText;
  category: 'pratique' | 'menu' | 'paiement';
}

export const faqCategoryLabels: Record<FaqItem['category'], LocalizedText> = {
  pratique: { fr: 'Infos pratiques', en: 'Practical info', ar: 'معلومات عملية' },
  menu: { fr: 'Menu & réservations', en: 'Menu & bookings', ar: 'القائمة والحجوزات' },
  paiement: { fr: 'Paiement', en: 'Payment', ar: 'الدفع' },
};

export const faqItems: FaqItem[] = [
  {
    question: {
      fr: 'Où se trouve Indian Flavors ?',
      en: 'Where is Indian Flavors located?',
      ar: 'أين يقع مطعم Indian Flavors؟',
    },
    answer: {
      fr: 'Indian Flavors se situe au 29 Jbel El Ayachi, Rabat 10080.',
      en: 'Indian Flavors is located at 29 Jbel El Ayachi, Rabat 10080.',
      ar: 'يقع مطعم Indian Flavors في 29 جبل العياشي، الرباط 10080.',
    },
    category: 'pratique',
  },
  {
    question: {
      fr: 'Quels sont les horaires d’ouverture ?',
      en: 'What are the opening hours?',
      ar: 'ما هي ساعات العمل؟',
    },
    answer: {
      fr: 'Nous sommes ouverts tous les jours de 13h00 à 23h00, service continu.',
      en: 'We are open every day from 1:00 PM to 11:00 PM, continuous service.',
      ar: 'نحن مفتوحون كل يوم من الساعة 13:00 حتى 23:00، بخدمة متواصلة.',
    },
    category: 'pratique',
  },
  {
    question: {
      fr: 'Proposez-vous la livraison à domicile ?',
      en: 'Do you offer home delivery?',
      ar: 'هل تقدمون خدمة التوصيل إلى المنزل؟',
    },
    answer: {
      fr: 'Oui. Toutes les commandes — sur place, à emporter ou en livraison — se passent directement via notre système de commande en ligne, relié à WhatsApp pour le suivi.',
      en: 'Yes. All orders — dine-in, takeaway or delivery — go through our online ordering system, connected to WhatsApp for tracking.',
      ar: 'نعم. تُنجز جميع الطلبات — في المطعم أو للاستلام أو للتوصيل — مباشرة عبر نظام الطلب الإلكتروني الخاص بنا، المرتبط بواتساب لمتابعة الطلب.',
    },
    category: 'pratique',
  },
  {
    question: {
      fr: 'Le restaurant propose-t-il des options végétariennes et vegan ?',
      en: 'Does the restaurant offer vegetarian and vegan options?',
      ar: 'هل يقدم المطعم خيارات نباتية وخيارات نباتية صرفة (فيغان)؟',
    },
    answer: {
      fr: 'Oui, une grande partie de notre carte est végétarienne ou vegan — entrées, plats principaux, biryani et boissons incluent plusieurs options clairement identifiées.',
      en: 'Yes, a large part of our menu is vegetarian or vegan — starters, main courses, biryani and drinks all include several clearly labeled options.',
      ar: 'نعم، جزء كبير من قائمتنا نباتي أو نباتي صرف — تشمل المقبلات والأطباق الرئيسية والبرياني والمشروبات عدة خيارات موضحة بوضوح.',
    },
    category: 'menu',
  },
  {
    question: {
      fr: 'Y a-t-il une salle privée pour les groupes ou événements ?',
      en: 'Is there a private room for groups or events?',
      ar: 'هل توجد قاعة خاصة للمجموعات أو المناسبات؟',
    },
    answer: {
      fr: "Oui, Indian Flavors dispose d'une salle privée. Pour les groupes ou occasions spéciales, nous recommandons d'appeler directement le restaurant pour réserver.",
      en: 'Yes, Indian Flavors has a private room. For groups or special occasions, we recommend calling the restaurant directly to book.',
      ar: 'نعم، يتوفر مطعم Indian Flavors على قاعة خاصة. بالنسبة للمجموعات أو المناسبات الخاصة، نوصي بالاتصال بالمطعم مباشرة للحجز.',
    },
    category: 'menu',
  },
  {
    question: {
      fr: 'Quel est le budget moyen par personne ?',
      en: 'What is the average budget per person?',
      ar: 'ما هي الميزانية المتوسطة للشخص الواحد؟',
    },
    answer: {
      fr: 'Comptez entre 50 et 150 MAD par personne selon les plats choisis.',
      en: 'Expect between 50 and 150 MAD per person depending on the dishes chosen.',
      ar: 'يتراوح المبلغ بين 50 و150 درهمًا للشخص الواحد حسب الأطباق المختارة.',
    },
    category: 'menu',
  },
  {
    question: {
      fr: 'Peut-on payer par carte bancaire ?', // ⚠ VÉRIFIER avant publication — voir commentaire ci-dessus
      en: 'Can we pay by card?', // ⚠ VERIFY before publishing — see comment above
      ar: 'هل يمكن الدفع بالبطاقة البنكية؟', // ⚠ تحقق قبل النشر — انظر التعليق أعلاه
    },
    answer: {
      fr: 'Le paiement en espèces est accepté sur place ; contactez-nous pour confirmer les autres moyens de paiement disponibles.',
      en: 'Cash payment is accepted in the restaurant; contact us to confirm other available payment methods.',
      ar: 'يُقبل الدفع نقدًا في المطعم؛ تواصلوا معنا لتأكيد وسائل الدفع الأخرى المتاحة.',
    },
    category: 'paiement',
  },
];
