import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeAdded = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Burger',
  //     'Delicious with cheese and bacon',
  //     'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Beef', 300),
  //       new Ingredient('Bacon', 2),
  //       new Ingredient('Chedar cheese', 4)
  //     ]),
  //   new Recipe(
  //     'Pasta',
  //     'Pasta carbonara with pork',
  //     'https://www.fifteenspatulas.com/wp-content/uploads/2012/03/Spaghetti-Carbonara-Fifteen-Spatulas-12.jpg',
  //     [
  //       new Ingredient('Pasta', 300),
  //       new Ingredient('Egg', 1),
  //       new Ingredient('Pork', 50),
  //       new Ingredient('Hard cheese', 25)
  //     ]
  //     )
  // ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeAdded.next(this.recipes.slice());
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipeAdded.next(this.recipes.slice())
  }

  updateRecipe(id: number, newRecipe: Recipe): void {
    this.recipes[id] = newRecipe;
    this.recipeAdded.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeAdded.next(this.recipes.slice())
  }
}
