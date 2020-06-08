import { Component, OnInit, HostListener, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  isOpen = false;
  id: number;

  constructor(private recipeService: RecipeService, private elRef: ElementRef, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
      );
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  addToList() {
    this.recipeService.addToShoppingList(this.recipe.ingredients);
  }

  editRecipe() {
    this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  @HostListener('document:click', ['$event']) toggle(event: Event) {
    if (!this.elRef.nativeElement.querySelector('.dropdown-options').contains(event.target)) {
      this.isOpen = false;
    }
  }
}
