import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable(
  {providedIn: 'root'}
)
export class DataStorageService {

  constructor(
    private http: HttpClient,
     private recipeService: RecipeService,
     private authService: AuthService) {}

  saveRecipe() {
    this.http.put(
      'https://ng-course-recipe-book-8164a-default-rtdb.firebaseio.com/recipes.json',
      this.recipeService.getRecipes())
      .subscribe(response => {
        console.log(response);
      })
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(
      'https://ng-course-recipe-book-8164a-default-rtdb.firebaseio.com/recipes.json',
      ).pipe(
        map(recipes => {
          return recipes.map(recipe => {
            let newRecipe = {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            return newRecipe;
          })
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      )
  }
}
