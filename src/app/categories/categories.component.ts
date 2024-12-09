import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  constructor(private firestore: Firestore) {}

  async onSubmit(formData: any): Promise<void> {
    try {
      const categoryData = formData.value;

      const categoriesCollection = collection(this.firestore, 'categories');

      const docRef = await addDoc(categoriesCollection, categoryData);

      console.log('Category added successfully!', docRef.id);
    } catch (error) {
      console.error('Error adding category: ', error);
    }
  }
}
