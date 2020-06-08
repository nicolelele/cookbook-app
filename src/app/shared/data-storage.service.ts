import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        const url = 'https://cookbook-app-fe7aa.firebaseio.com/recipes.json';

        this.http.put(url, recipes).subscribe(response => {
        });
    }

    fetchRecipes() {
        const url = 'https://cookbook-app-fe7aa.firebaseio.com/recipes.json';

        return this.http.get<Recipe[]>(url)
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                    });
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                }));
    }
}