import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, FormArray, AbstractControl, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode: boolean = false;
  subscribtion: Subscription;
  recipeInfo: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit(): void {
    this.subscribtion = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    })
  }

  onAddIngredient(): void {
    (<FormArray>this.recipeInfo.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
    }));
  }

  getIngredientsControls(): AbstractControl[] {
    return (<FormArray>this.recipeInfo.get('ingredients')).controls;
  }

  initForm(): void {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImageURL = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      let recipe = this.recipeService.getRecipe(this.id);

      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImageURL = recipe.imageURL;

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount,
                [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
            }
          ))
        }
      }
    }

    this.recipeInfo = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'imageURL': new FormControl(recipeImageURL, Validators.required),
      'ingredients': recipeIngredients,
    })
  }

  onSubmit(): void {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeInfo.value);
      this.router.navigate(['../'], {relativeTo: this.route});
    } else {
      this.recipeService.addRecipe(this.recipeInfo.value);
      let newId = this.recipeService.getRecipes().length - 1;
      this.router.navigate(['../', newId], {relativeTo: this.route});
    }

    this.recipeInfo.reset();
  }

  onDeleteIngredient(index: number): void {
    (<FormArray>this.recipeInfo.get('ingredients')).removeAt(index);
  }

  onCancel(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
    this.recipeInfo.reset();
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
