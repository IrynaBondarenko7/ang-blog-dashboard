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
  formCategory?: string;
  formStatus: string = 'Add';
  categoryId: string = '';

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
      this.formStatus === 'Add'
        ? this.categoryService.saveData(categoryData)
        : this.categoryService.updateData(this.categoryId, categoryData);
    } catch (error) {
      console.error('Error adding category: ', error);
    }

    formData.reset();
    this.formStatus = 'Add';
  }

  onEdit(category: Category): void {
    this.formCategory = category.category;
    this.formStatus = 'Edit';
    this.categoryId = category.id;
  }

  async onDelete(id: string): Promise<void> {
    try {
      await this.categoryService.deleteData(id);
    } catch (error) {
      console.error('Error deleting category: ', error);
    }
  }
}
