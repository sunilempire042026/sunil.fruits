export interface Product {
  id: number;
  name: string;
  origin: string;
  category: string;
  price: number;
  unit: string;
  description: string;
  details: string[];
  emoji: string;
  gradient: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  season: string;
}

export const categories = [
  { id: 'all', label: 'All Fruits', icon: '🍇' },
  { id: 'tropical', label: 'Tropical', icon: '🥭' },
  { id: 'berry', label: 'Berry', icon: '🍓' },
  { id: 'melon', label: 'Melon', icon: '🍈' },
  { id: 'citrus', label: 'Citrus', icon: '🍋' },
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Alphonso Mango',
    origin: 'Ratnagiri, India',
    category: 'tropical',
    price: 89.99,
    unit: 'box of 6',
    description: 'The "King of Mangoes" — prized for its rich, creamy texture and saffron-colored flesh with an intoxicatingly sweet aroma.',
    details: [
      'Hand-picked at peak ripeness from century-old orchards',
      'Naturally ripened — no chemical催熟 agents used',
      'GI-tagged for authentic Ratnagiri origin',
      'Ships in temperature-controlled packaging',
      'Best enjoyed within 5 days of delivery',
    ],
    emoji: '🥭',
    gradient: 'from-amber-400 via-orange-400 to-yellow-300',
    rating: 4.9,
    reviews: 342,
    inStock: true,
    season: 'April – June',
  },
  {
    id: 2,
    name: 'Ruby Roman Grapes',
    origin: 'Ishikawa, Japan',
    category: 'berry',
    price: 149.99,
    unit: 'bunch',
    description: 'An exquisite luxury grape variety, each berry the size of a ping-pong ball with an impossibly sweet, wine-like flavor.',
    details: [
      'Each bunch weighs over 300g with Brix level ≥18',
      'Grown in climate-controlled greenhouses',
      'Only 300 bunches produced per season',
      'Individual berries tested for sugar content',
      'Arrives in premium presentation box',
    ],
    emoji: '🍇',
    gradient: 'from-purple-500 via-red-400 to-rose-400',
    rating: 5.0,
    reviews: 87,
    inStock: true,
    season: 'July – September',
  },
  {
    id: 3,
    name: 'Yubari King Melon',
    origin: 'Hokkaido, Japan',
    category: 'melon',
    price: 199.99,
    unit: 'whole melon',
    description: 'A hybrid crown melon with perfectly netted skin and flesh so sweet it melts on the tongue. The pinnacle of melon craftsmanship.',
    details: [
      'Cultivated by master farmers with 50+ years experience',
      'Each vine produces only one melon for maximum flavor',
      'Perfectly round with symmetrical netting pattern',
      'Flesh has a unique creamy, melt-in-mouth texture',
      'Comes with certificate of authenticity',
    ],
    emoji: '🍈',
    gradient: 'from-green-400 via-lime-300 to-emerald-300',
    rating: 4.8,
    reviews: 156,
    inStock: true,
    season: 'June – August',
  },
  {
    id: 4,
    name: 'White Strawberry',
    origin: 'Nagano, Japan',
    category: 'berry',
    price: 64.99,
    unit: 'box of 8',
    description: 'Ethereal pearl-white berries with delicate pink seeds and a flavor reminiscent of pineapple and cotton candy.',
    details: [
      'Rare "White Jewel" variety (Shiroi Houseki)',
      'Naturally white — not bleached or modified',
      'Lower acidity than red strawberries',
      'Each berry hand-inspected for perfection',
      'Packaged in silk-lined presentation box',
    ],
    emoji: '🍓',
    gradient: 'from-pink-200 via-rose-100 to-white',
    rating: 4.7,
    reviews: 218,
    inStock: true,
    season: 'December – March',
  },
  {
    id: 5,
    name: "Buddha's Hand Citron",
    origin: 'Calabria, Italy',
    category: 'citrus',
    price: 34.99,
    unit: 'single fruit',
    description: 'A stunning fingered citrus with intense floral aroma. No pulp — all fragrant zest, perfect for cooking and garnishing.',
    details: [
      'Each fruit is unique — no two look alike',
      'Almost entirely zest with no bitter pith',
      'Intensely aromatic — perfumes an entire room',
      'Ideal for zesting, candying, or infusing',
      'Makes a striking natural centerpiece',
    ],
    emoji: '🍋',
    gradient: 'from-yellow-300 via-amber-300 to-lime-300',
    rating: 4.6,
    reviews: 94,
    inStock: true,
    season: 'November – February',
  },
  {
    id: 6,
    name: 'Densuke Watermelon',
    origin: 'Hokkaido, Japan',
    category: 'melon',
    price: 129.99,
    unit: 'whole melon',
    description: 'The world\'s most expensive watermelon — impossibly dark green skin with flesh so crisp and sweet it shatters like glass.',
    details: [
      'Only grown in Toma town, Hokkaido',
      'Maximum 100 per farmer per season',
      'Brix sugar level guaranteed ≥11',
      'Distinctive jet-black rind with no stripes',
      'Auctioned annually for record-breaking prices',
    ],
    emoji: '🍉',
    gradient: 'from-green-700 via-green-500 to-red-400',
    rating: 4.9,
    reviews: 63,
    inStock: true,
    season: 'June – August',
  },
];
