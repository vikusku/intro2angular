import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsUpdated = new Subject<Ingredient[]>();
  ingredientEditInit = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 7)
  ];

  getingredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsUpdated.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient): void {
    this.ingredients[index] = newIngredient;
    this.ingredientsUpdated.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsUpdated.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]): void {
    ingredients.forEach(ingredient => {
      let indexOf = this.indexOfIngredient(ingredient);
      if (indexOf >=0 ) {
        this.ingredients[indexOf].amount =
          Number(this.ingredients[indexOf].amount) + Number(ingredient.amount);
      } else {
        this.ingredients.push(ingredient);
      }
    })

    this.ingredientsUpdated.next(this.ingredients.slice());
  }

  indexOfIngredient(ingredient: Ingredient) {
    for (let i = 0; i < this.ingredients.length; i++) {
      if (this.ingredients[i].name === ingredient.name) {
        return i
      }
    }

    return -1;
  }

}
