import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  categoryArray?: Array<Category>;

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val) => {
      this.categoryArray = val;
      console.log(val);
    });
  }
  async onSubmit(formData: any): Promise<void> {
    const categoryData: Category = formData.value;

    try {
      this.categoryService.saveData(categoryData);
    } catch (error) {
      console.error('Error adding category: ', error);
    }
  }
}
