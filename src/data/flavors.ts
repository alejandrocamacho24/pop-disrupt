import campfireSmores from "@/assets/Campfire_S_mores.png";
import chocolatePeanutButterCup from "@/assets/Chocolate_Peanut_Butter_Cup.png";
import dubaiChocolate from "@/assets/Dubai_Chocolate.png";
import grilledCheese from "@/assets/Grilled_Cheese.png";
import koreanHotHoney from "@/assets/Korean_Hot_Honey.png";
import mexicanStreetCorn from "@/assets/Mexican_Street_Corn.png";
import tacoTruckTwist from "@/assets/Taco_Truck_Twist.png";
import SaltedButterCinnamonRolls from "@/assets/Tres_Leches_Dream.png";

export interface Flavor {
  id: string;
  name: string;
  image: string;
  description: string;
  tags: string[];
}

export const flavors: Flavor[] = [
  {
    id: "campfire-smores",
    name: "Campfire S'mores",
    image: campfireSmores,
    description: "Toasted marshmallow meets chocolate graham goodness. A campfire classic, now on your popcorn.",
    tags: ["Sweet", "Nostalgic"],
  },
  {
    id: "chocolate-peanut-butter-cup",
    name: "Chocolate Peanut Butter Cup",
    image: chocolatePeanutButterCup,
    description: "Rich chocolate and creamy peanut butter. The iconic combo reimagined for popcorn lovers.",
    tags: ["Sweet", "Rich"],
  },
  {
    id: "dubai-chocolate",
    name: "Dubai Chocolate",
    image: dubaiChocolate,
    description: "Luxurious pistachio and chocolate fusion inspired by the viral Dubai chocolate bar trend.",
    tags: ["Premium", "Trending"],
  },
  {
    id: "grilled-cheese",
    name: "Grilled Cheese",
    image: grilledCheese,
    description: "Melty, buttery, cheesy perfection. Comfort food just got a crunchy upgrade.",
    tags: ["Savory", "Comfort"],
  },
  {
    id: "korean-hot-honey",
    name: "Korean Hot Honey",
    image: koreanHotHoney,
    description: "Sweet honey meets gochujang heat. A spicy-sweet K-food mashup that slaps.",
    tags: ["Spicy", "Sweet"],
  },
  {
    id: "mexican-street-corn",
    name: "Mexican Street Corn",
    image: mexicanStreetCorn,
    description: "Elote vibes with chili, lime, and cotija. Street food flavor in every kernel.",
    tags: ["Savory", "Spicy"],
  },
  {
    id: "taco-truck-twist",
    name: "Taco Truck Twist",
    image: tacoTruckTwist,
    description: "All the taco seasoning you love, minus the tortilla. Crunchy taco Tuesday, any day.",
    tags: ["Savory", "Bold"],
  },
  {
    id: "salted-butter-cinnamon-rolls",
    name: "Salted Butter Cinnamon Rolls",
    image: SaltedButterCinnamonRolls,
    description: "Warm cinnamon roll glaze with a salted butter twist. Bakery-fresh flavor in every bite.",
    tags: ["Sweet", "Bakery"],
  },
];
