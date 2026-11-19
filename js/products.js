// Edit this file to update your catalog. Prices are in South African Rand (ZAR).

const SHIPPING_OPTIONS = [
  { id: "pickup", label: "Pickup in Pretoria", fee: 0 },
  { id: "postnet", label: "Postnet-to-Postnet (South Africa only)", fee: 109 }
];

const WIRING_OPTIONS = ["Unwired", "Wired"];

const PAYMENT_OPTIONS = [
  { id: "eft", label: "EFT" },
  { id: "cash", label: "Cash (5% discount)" }
];

const CASH_DISCOUNT_RATE = 0.05;

const PRODUCTS = [
  {
    id: "student",
    name: "Student Reed",
    description: "A reliable, easy-blowing reed for beginner and school-level players. Forgiving response, stable pitch.",
    price: 420,
    strengths: ["Soft", "Medium", "Hard"]
  },
  {
    id: "professional",
    name: "Professional Reed",
    description: "Premium cane, finely scraped for advanced and professional players wanting a rich, responsive sound.",
    price: 580,
    strengths: ["Medium-Soft", "Medium", "Medium-Hard", "Hard"]
  },
  {
    id: "refurbished",
    name: "Refurbished Reed",
    description: "Previously played by me in concerts and symphony performances, then cleaned, lightly dusted, resealed, and fully played in. Ideal for young students or youth orchestras. Subject to availability.",
    price: 220,
    strengths: ["As available"]
  }
];
