import fs from 'fs';
import path from 'path';

// Generate dynamic 500+ daily recipes for Masala Sizzle
const proteins = [
  { name: "Chicken Breast", type: "Chicken", kw: "chicken-breast" },
  { name: "Chicken Thighs", type: "Chicken", kw: "chicken-thigh" },
  { name: "Minced Chicken", type: "Chicken", kw: "minced-chicken" },
  { name: "Mutton Mince", type: "Mutton", kw: "keema" },
  { name: "Lamb Cubes", type: "Mutton", kw: "lamb-curry" },
  { name: "Boiled Eggs", type: "Egg", kw: "boiled-eggs" },
  { name: "Scrambled Eggs", type: "Egg", kw: "scrambled-eggs" },
  { name: "Paneer Cubes", type: "Veg", kw: "paneer-tikka" }
];

const flavors = [
  { name: "Tikka", ing: ["Yogurt", "Garam Masala", "Chili"], style: "Indian", health: "High Protein", kw: "tikka-masala" },
  { name: "Lemon Ginger", ing: ["Lemon", "Ginger", "Honey"], style: "Indian", health: "Immunity", kw: "lemon-ginger" },
  { name: "Pepper Fry", ing: ["Black Pepper", "Curry Leaves", "Oil"], style: "Indian", health: "Keto", kw: "pepper-fry" },
  { name: "Garlic Chili", ing: ["Soy Sauce", "Garlic", "Chilies"], style: "Indo-Chinese", health: "Metabolism", kw: "garlic-chili" },
  { name: "Manchurian", ing: ["Spring Onion", "Vinegar", "Celery"], style: "Indo-Chinese", health: "Light", kw: "manchurian" },
  { name: "Szechuan", ing: ["Szechuan Pepper", "Garlic", "Sesame"], style: "Indo-Chinese", health: "Zesty", kw: "szechuan" },
  { name: "Pesto Masala", ing: ["Basil", "Olive Oil", "Walnuts"], style: "Indo-Italian", health: "Brain Food", kw: "pesto" },
  { name: "Arrabbiata", ing: ["Tomatoes", "Oregano", "Chili Flakes"], style: "Indo-Italian", health: "Heart Healthy", kw: "arrabbiata-sauce" },
  { name: "Alfredo Tadka", ing: ["Cream", "Black Mustard", "Garlic"], style: "Indo-Italian", health: "Comfort", kw: "creamy-alfredo" },
  { name: "Cumin Rub", ing: ["Roasted Cumin", "Lime", "Olive Oil"], style: "Indian", health: "Digestion", kw: "cumin-roasted" },
  { name: "Hariyali", ing: ["Mint", "Coriander", "Green Chili"], style: "Indian", health: "Fresh", kw: "mint-coriander-green" },
  { name: "Honey Chili", ing: ["Honey", "Soy", "Chili Flakes"], style: "Indo-Chinese", health: "Energy", kw: "honey-chili" },
  { name: "Vindaloo Tadka", ing: ["Vinegar", "Dried Chili", "Clove"], style: "Indian", health: "Spicy-Keto", kw: "spicy-vindaloo" }
];

const cookingMethods = ["Pan Seared", "Slow Sautéed", "Oven Roasted", "Quick Stir-fry", "Steam Tossed", "Char-grilled"];

function generateRecipes() {
  const allRecipes = [];
  let id = 1;

  proteins.forEach(protein => {
    flavors.forEach(flavor => {
      cookingMethods.forEach(method => {
        const title = `${method} ${flavor.name} ${protein.name}`;
        
        // Generate an exact contextual image from Pollinations.ai (Free, no-auth generative AI endpoint)
        // By passing a specific structured prompt it always returns a high quality food photo
        const prompt = `Professional macro food photography of ${title}, served in a dark moody restaurant setting, 8k resolution, cinematic lighting`;
        // Using a random seed for daily variation in image style
        const seed = Math.floor(Math.random() * 100000);
        const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=800&height=600&seed=${seed}&nologo=true`;

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
