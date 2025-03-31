import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private firestore: Firestore, private toastr: ToastrService) {}

  async saveData(data: Category): Promise<void> {
    try {
      const categoriesCollection = collection(this.firestore, 'categories');
      await addDoc(categoriesCollection, data);
      this.toastr.success('Data Insert Successfully!');
    } catch (error) {
      console.error('Error saving category to Firestore: ', error);
      this.toastr.error('Something went wrong!');
      throw error;
    }
  }

  loadData(): Observable<Category[]> {
    const categoriesCollection = collection(this.firestore, 'categories');
    return collectionData(categoriesCollection, {
      idField: 'id',
    }) as Observable<Category[]>;
  }

  async updateData(id: string, editData: Partial<Category>): Promise<void> {
    try {
      const categoryDocRef = doc(this.firestore, `categories/${id}`);
      await updateDoc(categoryDocRef, editData);
      this.toastr.success('Category Updated Successfully!');
    } catch (error) {
      console.error('Error updating category in Firestore: ', error);
      this.toastr.error('Something went wrong!');
      throw error;
    }
  }

  async deleteData(id: string): Promise<void> {
    try {
      const categoryDocRef = doc(this.firestore, `categories/${id}`);
      await deleteDoc(categoryDocRef);
      this.toastr.success('Category Deleted Successfully!');
    } catch (error) {
      console.error('Error deleting category from Firestore: ', error);
      this.toastr.error('Something went wrong!');
      throw error;
    }
  }
}
