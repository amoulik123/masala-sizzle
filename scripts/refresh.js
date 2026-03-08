import fs from 'fs';
import path from 'path';

// Generate dynamic 500+ daily recipes for Masala Sizzle
const proteins = [
  { name: "500g Chicken Breast", type: "Chicken", kw: "chicken-breast", baseName: "Chicken Breast" },
  { name: "500g Chicken Thighs", type: "Chicken", kw: "chicken-thigh", baseName: "Chicken Thighs" },
  { name: "500g Minced Chicken", type: "Chicken", kw: "minced-chicken", baseName: "Minced Chicken" },
  { name: "500g Mutton Mince", type: "Mutton", kw: "keema", baseName: "Mutton Mince" },
  { name: "500g Lamb Cubes", type: "Mutton", kw: "lamb-curry", baseName: "Lamb Cubes" },
  { name: "4 Boiled Eggs", type: "Egg", kw: "boiled-eggs", baseName: "Boiled Eggs" },
  { name: "4 Scrambled Eggs", type: "Egg", kw: "scrambled-eggs", baseName: "Scrambled Eggs" },
  { name: "400g Paneer Cubes", type: "Veg", kw: "paneer-tikka", baseName: "Paneer Cubes" }
];

const flavors = [
  { name: "Tikka", ing: ["2 tbsp Yogurt", "1 tbsp Garam Masala", "1 tsp Chili Powder"], style: "Indian", health: "High Protein", kw: "tikka-masala", baseIng: ["Yogurt", "Garam Masala", "Chili Powder"] },
  { name: "Lemon Ginger", ing: ["2 tbsp Lemon Juice", "1 inch Ginger", "1 tbsp Honey"], style: "Indian", health: "Immunity", kw: "lemon-ginger", baseIng: ["Lemon Juice", "Ginger", "Honey"] },
  { name: "Pepper Fry", ing: ["1 tbsp Black Pepper", "10 Curry Leaves", "2 tbsp Coconut Oil"], style: "Indian", health: "Keto", kw: "pepper-fry", baseIng: ["Black Pepper", "Curry Leaves", "Coconut Oil"] },
  { name: "Garlic Chili", ing: ["2 tbsp Soy Sauce", "4 cloves Garlic", "2 Green Chilies"], style: "Indo-Chinese", health: "Metabolism", kw: "garlic-chili", baseIng: ["Soy Sauce", "Garlic", "Green Chilies"] },
  { name: "Manchurian", ing: ["1/4 cup Spring Onion", "1 tbsp Vinegar", "1 stalk Celery"], style: "Indo-Chinese", health: "Light", kw: "manchurian", baseIng: ["Spring Onion", "Vinegar", "Celery"] },
  { name: "Szechuan", ing: ["1 tsp Szechuan Pepper", "4 cloves Garlic", "1 tbsp Sesame Oil"], style: "Indo-Chinese", health: "Zesty", kw: "szechuan", baseIng: ["Szechuan Pepper", "Garlic", "Sesame Oil"] },
  { name: "Pesto Masala", ing: ["1/4 cup Basil", "2 tbsp Olive Oil", "2 tbsp Walnuts"], style: "Indo-Italian", health: "Brain Food", kw: "pesto", baseIng: ["Basil", "Olive Oil", "Walnuts"] },
  { name: "Arrabbiata", ing: ["1 cup Tomato Puree", "1 tsp Oregano", "1 tsp Chili Flakes"], style: "Indo-Italian", health: "Heart Healthy", kw: "arrabbiata-sauce", baseIng: ["Tomato Puree", "Oregano", "Chili Flakes"] },
  { name: "Alfredo Tadka", ing: ["1/2 cup Heavy Cream", "1 tsp Black Mustard Seeds", "3 cloves Garlic"], style: "Indo-Italian", health: "Comfort", kw: "creamy-alfredo", baseIng: ["Heavy Cream", "Black Mustard Seeds", "Garlic"] },
  { name: "Cumin Rub", ing: ["1 tbsp Roasted Cumin", "1/2 Lime", "1 tbsp Olive Oil"], style: "Indian", health: "Digestion", kw: "cumin-roasted", baseIng: ["Roasted Cumin", "Lime", "Olive Oil"] },
  { name: "Hariyali", ing: ["1/2 cup Mint Leaves", "1/2 cup Coriander", "2 Green Chilies"], style: "Indian", health: "Fresh", kw: "mint-coriander-green", baseIng: ["Mint Leaves", "Coriander", "Green Chilies"] },
  { name: "Honey Chili", ing: ["2 tbsp Honey", "1 tbsp Soy Sauce", "1 tsp Chili Flakes"], style: "Indo-Chinese", health: "Energy", kw: "honey-chili", baseIng: ["Honey", "Soy Sauce", "Chili Flakes"] },
  { name: "Vindaloo Tadka", ing: ["2 tbsp Vinegar", "2 Dried Red Chilies", "4 Cloves"], style: "Indian", health: "Spicy-Keto", kw: "spicy-vindaloo", baseIng: ["Vinegar", "Dried Red Chilies", "Cloves"] }
];

const cookingMethods = ["Pan Seared", "Slow Sautéed", "Oven Roasted", "Quick Stir-fry", "Steam Tossed", "Char-grilled"];

const foodImageIds = [
  "1546066123-f26059d48b53", "1604382354936-07c5d9983bd3", "1546548970-83b9ffc7ed9a",
  "1504674900247-0877df9cc836", "1555939594-58d7cb561ad1", "1512621776951-a57141f2eefd",
  "1543353071-10c8ba85a9ec", "1567620985472-f596fe5898c1", "1565299624946-b28f40a0ae38",
  "1473093226795-af9932fe5856", "1493770348161-369560ae357d", "1476224203421-9ac3993557a7",
  "1565958033581-44755106c279", "1606787366850-de6330128bfc", "1540189549341-210168f69e63",
  "1484723091479-7c2dbaf8fc03", "1554679665-f5537f187268", "1589302168068-964664d93dc8"
];

function generateRecipes() {
  const allRecipes = [];
  let id = 1;

  proteins.forEach(protein => {
    flavors.forEach(flavor => {
      cookingMethods.forEach(method => {
        const title = `${method} ${flavor.name} ${protein.name}`;
        
        // Use realistic Unsplash ids
        const imageId = foodImageIds[id % foodImageIds.length];
        const imageUrl = `https://images.unsplash.com/photo-${imageId}?auto=format&fit=crop&w=800&q=80`;

        allRecipes.push({
          id: id++,
          title: title,
          category: flavor.style,
          proteinType: protein.type,
          time: `${Math.floor(Math.random() * 8) + 12} mins`, // Sub 20 mins always
          difficulty: "Easy",
          image: imageUrl,
          health: flavor.health,
          ingredients: [protein.name, ...flavor.ing, "Salt"].slice(0, 6),
          instructions: [
            `Step 1: Prep ${protein.name} and marinate with ${flavor.ing[0]}.`,
            `Step 2: Use ${method} technique to cook the base.`,
            `Step 3: Add ${flavor.ing.slice(1).join(" and ")} and toss.`,
            `Step 4: Season with salt and serve hot.`
          ]
        });
      });
    });
  });

  // Shuffle daily
  return allRecipes.sort(() => 0.5 - Math.random());
}

const recipes = generateRecipes();
const outputPath = path.resolve('./src/data/recipes.json');

fs.writeFileSync(outputPath, JSON.stringify(recipes, null, 2));

console.log(`✅ Refreshed ${recipes.length} daily recipes at ${new Date().toISOString()} and saved to src/data/recipes.json`);
