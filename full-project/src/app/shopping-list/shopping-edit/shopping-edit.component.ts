import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingListForm') shoppingListForm: NgForm;
  ingredientEdit: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredientEdit = this.shoppingListService.ingredientEditInit.subscribe((index) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(index);

      this.shoppingListForm.setValue({
        'ingridientName': this.editedItem.name,
        'ingridientAmount': this.editedItem.amount
      })
    })
  }

  onSubmit(): void {
    let ingredient = new Ingredient(
      this.shoppingListForm.value.ingridientName,
      this.shoppingListForm.value.ingridientAmount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient)
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }

    this.reset()
  }

  onClear() {
    this.reset()
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.reset()
  }

  ngOnDestroy(): void {
    this.ingredientEdit.unsubscribe();
  }

  reset(): void {
    this.shoppingListForm.reset();
    this.editMode = false;
    this.editedItem = undefined;
    this.editedItemIndex = undefined;
  }
}
