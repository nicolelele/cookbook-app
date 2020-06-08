import { Injectable } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [];
    // = [
    //     new Recipe(
    //         'Vegan Tantanmen',
    //         'Soy milk adds a smooth, mellow flavor to the rich, spicy broth. So delicious!',
    //         '../../../assets/img/ramen.jpg',
    //         [
    //             new Ingredient('vegetable stock', '500 ml (2 cups)'),
    //             new Ingredient('extra-firm tofu', '100 grams (3.5 oz)'),
    //             new Ingredient('sasame oil', '2 – 3 tablespoons'),
    //             new Ingredient('grated garlic', '2 teaspoons'),
    //             new Ingredient('grated ginger', '2 teaspoons'),
    //             new Ingredient('dark miso paste', '1 teaspoon'),
    //             new Ingredient('soy souce', '3 tablespoons'),
    //             new Ingredient('sake', '2 teaspoons'),
    //             new Ingredient('green onion', '1'),
    //             new Ingredient('bok choy', '1'),
    //             new Ingredient('tahini', '3 tablespoons'),
    //             new Ingredient('chili oil', '1 tablespoon'),
    //             new Ingredient('ramen noodles (packaged or fresh)', '2 servings')
    //         ],
    //         'Put vegetable stock in a pot and warm up while you prepare rest of soup ingredients. Mash tofu with a fork, fry stirring until crispy and golden brown. In a small bowl combine miso paste with 1 tablespoon soy sauce and stir well. Reduce heat to medium, add garlic and ginger. Fry stirring until cooked through n stir tofu back in. Add soy sauce-miso paste mixture and sake, sliced green onions and fry for 5 – 10 minutes. In a bowl combine  tahini, 2 tbsp of soy sauce, rice vinegar and chili oil, mix well. Cook bok choy until tender and add ramen noodles. Serve with chili oil!'
    //     ),
    //     new Recipe(
    //         'Pear Pie',
    //         'I’ve been on a pear kick lately. This is a strange thing for me because, well, I don’t really like pears!',
    //         '../../../assets/img/pear-cake.jpg',
    //         [
    //             new Ingredient('pears peeled and sliced', '1 kg'),
    //             new Ingredient('brown sugar', '4 tablespoons'),
    //             new Ingredient('vanilla', '1 bean'),
    //             new Ingredient('all purpose flour', '2 cup'),
    //             new Ingredient('baking powder', '1 bag'),
    //             new Ingredient('cinnamon', '1 stick'),
    //             new Ingredient('cardamon', '½ teaspoon')
    //         ],
    //         'Preheat the oven to 350F /180C. Line bake pan with parchment or grease really well. Arrange pear slices. Drizzle maple syrup or sprinkle brown sugar all over. Mix all wet ingredients, add dry, pour over  pears, even it out and bake for 35 to 40 minutes. Cool for 15 mins, carefully take out, sprinkle a good pinch of cinnamon or pumpkin pie spice or other fave spice blend on pears. Cool for another 10 mins, then slice and serve with whipped coconut cream or vegan ice cream! Soooooo good!'
    //     ),
    //     new Recipe(
    //         'Spring Rolls with Ginger Peanut Sauce',
    //         'It all starts with a rainbow of fruits and veggies- so much goodness in one wrap. And we haven’t even got to the dipping sauce yet!',
    //         '../../../assets/img/spring-rolls.jpg',
    //         [
    //             new Ingredient('carrots', '4'),
    //             new Ingredient('avocado', '1')
    //         ],
    //         'Prep veggies and set aside for easy assembly. Bring 3 cups water to boil in a saucepan and set aside to cool slightly for cooking rice papers. Prepare peanut sauce by adding all ingredients except water to a mixing bowl and whisking. Add hot water 1 tbsp at a time and whisk until desired consistency is achieved (should be pourable but thick). Set aside. Add hot water to a large shallow dish (I used a skillet) and submerge a rice paper to soften for about 10-20 seconds. If you let it go too long or if your water is too hot, they will get too fragile to work with. Once soft, transfer to a clean, slightly damp surface (I prefer a wooden cutting board), and gently smooth out into a circle. Add carrots, peppers, mango, beets, and a healthy handful each cilantro and mint (and any other desired fillings!). Fold bottom over the fillings, then gently roll over once and fold in the side to seal, then roll until completely sealed. Place on a serving plate and top with a room temperature damp towel to keep fresh. Repeat process until all toppings are used - about 7 or 8 (amount as original recipe is written // adjust if altering batch size). Serve with dipping sauce and sriracha, if desired. Store leftovers covered in the fridge for up to a couple days, though best when fresh!'
    //     ),
    //     new Recipe(
    //         'Miso Udon Noodle Soup',
    //         'Soy milk adds a smooth, mellow flavor to the rich, spicy broth. So delicious!',
    //         '../../../assets/img/udon.jpg',
    //         [
    //             new Ingredient('vegetable broth', '1 l (4 cups)'),
    //             new Ingredient('aburaage - thin deep fried tofu', '100 grams'),
    //             new Ingredient('peanut oil', '1 – 2 tablespoons'),
    //             new Ingredient('grated garlic', '2 cloves'),
    //             new Ingredient('grated ginger', '1-inch'),
    //             new Ingredient('dark miso paste', '1 teaspoon'),
    //             new Ingredient('soy souce', '3 tablespoons'),
    //             new Ingredient('sake', '2 teaspoons'),
    //             new Ingredient('green onions', '4 medium'),
    //             new Ingredient('daikon radish', '100g'),
    //             new Ingredient('carrots', '30g'),
    //             new Ingredient('daikon radish', '100g'),
    //             new Ingredient('shiitake and shimeji Mushrooms', '100g'),
    //             new Ingredient('dashi kombu seewead', '100g'),
    //             new Ingredient('chili paste', '1/2 teaspoon'),
    //             new Ingredient('salt and pepper', 'to taste'),
    //             new Ingredient('cilantro', '1/4 cup'),
    //             new Ingredient('udon noodles (packaged or fresh)', '2 servings'),
    //             new Ingredient('ground white sesame seeds', '2 tbsp')
    //         ],
    //         'Roll dashi kombu seaweed and shred it as thinly as possible, cut aburaage in half lengthwise, place pieces on top of each other, and cut them into 1 cm strips, cut daikon radish, green onions, mushrooms. Now, let\'s make the ultimate miso soup. Pour 400 ml of water into a pot, add the shredded kombu seaweed. Cook all veggies for about 10 minutes in our super yummy broth, on medium heat, when it begins to boil, cover completely. Reduce the heat to low and simmer for about 10 minutes until softened. Add the diluted miso to the broth and distribute. Finally, top with the ground white sesame seeds and whatever you like. Enjoy!'
    //     ),
    //     new Recipe(
    //         'Apple Pie with Coconut Crust',
    //         'A classic holiday dessert, made vegan! This recipe is perfect for fall, easy to make and damn delicious.',
    //         '../../../assets/img/apple-pie.jpg',
    //         [
    //             new Ingredient('all purpose flour', '2 1/2 cups'),
    //             new Ingredient('cane sugar', '1 1/2 tablespoons'),
    //             new Ingredient('vanilla', '1/2 teaspoon'),
    //             new Ingredient('salt', '3/4 teaspoon'),
    //             new Ingredient('coconut oil', '1 cup solid'),
    //             new Ingredient('ice water', '6-8 tablespoons'),

    //             new Ingredient('apples, sliced', '1 kg'),
    //             new Ingredient('cane sugar', '1/2 cup'),
    //             new Ingredient('all purpose flour', '3 tablespoons'),
    //             new Ingredient('fresh lemon juice', '2 tbsp'),
    //             new Ingredient('ground nutmeg', '1/4 tsp'),
    //             new Ingredient('salt', '1/4 tsp'),
    //             new Ingredient('cinnamon', '1 tsp'),
    //         ],
    //         'Prepare the crust: In a large bowl, mix together the all-purpose flour, cane sugar, and salt until uniform. Add in the ice water, 2 tablespoons at a time, until the dough is moist enough to form a ball. We used 8 tablespoons in total. Shape the dough into a disk, wrap it and place it into the refrigerator for at least 30 minutes to set. In the meantime, mix everything together for the filling in a large bowl and then set it aside until the dough is ready. Grease a pie pan and preheat the oven to 400°F, roll out half of the dough from the center to the edges, gently press the crust into the pan - this will form the bottom crust. Add apples, then cover with second half of dough cut into ½-1” strips, optionally - brush pie with a thin layer of almond milk and sprinkle with sugar. Bake for 50-70 minutes, or until golden brown, being sure to remove the pie ring after about 30 minutes, cool for 60 minutes before serving.'
    //     ),
    // ];

    constructor(private shoppingListService: ShoppingListService) { }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredientsToList(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
