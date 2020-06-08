import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Udon noodles', '1 bag'),
        new Ingredient('Dashi stock', '1 box'),
        new Ingredient('Nori', '2 bags')
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    getList(id: number) {
        return this.ingredients[id];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredientsToList(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next();
    }

    updateIngredient(id: number, newIngredient: Ingredient) {
        this.ingredients[id] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(id: number) {
        this.ingredients.splice(id, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}