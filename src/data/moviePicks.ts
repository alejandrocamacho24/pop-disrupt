export interface MoviePick {
  title: string;
  year: string;
  genre: string;
  why: string;
}

export const moviePicks: Record<string, { vibe: string; picks: MoviePick[] }> = {
  "campfire-smores": {
    vibe: "Cozy campfire nostalgia",
    picks: [
      { title: "The Sandlot", year: "1993", genre: "Family / Comedy", why: "Endless summer energy that tastes like toasted marshmallow." },
      { title: "Stand By Me", year: "1986", genre: "Coming of Age", why: "Four kids, one fire, all the feelings." },
      { title: "E.T. the Extra-Terrestrial", year: "1982", genre: "Sci-Fi / Family", why: "Pure childhood warmth in a bowl." },
    ],
  },
  "chocolate-peanut-butter-cup": {
    vibe: "Rich, indulgent, irresistible",
    picks: [
      { title: "Charlie and the Chocolate Factory", year: "2005", genre: "Fantasy", why: "Sweet on sweet on sweet. No notes." },
      { title: "Chocolat", year: "2000", genre: "Romance / Drama", why: "Decadence with a side of longing." },
      { title: "Matilda", year: "1996", genre: "Family", why: "That cake scene deserves this flavor." },
    ],
  },
  "dubai-chocolate": {
    vibe: "Luxury and viral glamour",
    picks: [
      { title: "Ocean's Eleven", year: "2001", genre: "Heist", why: "Slick, expensive, impossibly smooth." },
      { title: "Crazy Rich Asians", year: "2018", genre: "Rom-Com", why: "Opulence in every single frame." },
      { title: "The Grand Budapest Hotel", year: "2014", genre: "Comedy", why: "Pastel-perfect indulgence." },
    ],
  },
  "grilled-cheese": {
    vibe: "Ultimate comfort watch",
    picks: [
      { title: "Chef", year: "2014", genre: "Comedy / Drama", why: "The greatest grilled cheese in cinema history." },
      { title: "Paddington 2", year: "2017", genre: "Family", why: "Warm, melty, universally beloved." },
      { title: "Julie & Julia", year: "2009", genre: "Drama", why: "Butter is the whole point." },
    ],
  },
  "korean-hot-honey": {
    vibe: "Sweet heat, high voltage",
    picks: [
      { title: "Parasite", year: "2019", genre: "Thriller", why: "Sweet start, scorching finish." },
      { title: "Train to Busan", year: "2016", genre: "Horror / Action", why: "Nonstop heat, zero mercy." },
      { title: "The Handmaiden", year: "2016", genre: "Thriller", why: "Lush, spicy, wickedly clever." },
    ],
  },
  "mexican-street-corn": {
    vibe: "Street-food festival energy",
    picks: [
      { title: "Coco", year: "2017", genre: "Animation", why: "Color, music, and family on full blast." },
      { title: "Roma", year: "2018", genre: "Drama", why: "Mexico City in every frame." },
      { title: "Y Tu Mamá También", year: "2001", genre: "Drama", why: "A road trip with chili-lime bite." },
    ],
  },
  "taco-truck-twist": {
    vibe: "Bold, loud, late-night",
    picks: [
      { title: "Chef", year: "2014", genre: "Comedy / Drama", why: "It is literally a food truck movie." },
      { title: "Nacho Libre", year: "2006", genre: "Comedy", why: "Ridiculous in the best possible way." },
      { title: "From Dusk Till Dawn", year: "1996", genre: "Action / Horror", why: "Spicy, wild, completely unhinged." },
    ],
  },
  "salted-butter-cinnamon-rolls": {
    vibe: "Bakery-warm and dreamy",
    picks: [
      { title: "Amélie", year: "2001", genre: "Romance", why: "Sweet, whimsical, softly glowing." },
      { title: "Kiki's Delivery Service", year: "1989", genre: "Animation", why: "A bakery, a broom, and pure comfort." },
      { title: "Little Women", year: "2019", genre: "Drama", why: "Cinnamon-scented and full of heart." },
    ],
  },
};
