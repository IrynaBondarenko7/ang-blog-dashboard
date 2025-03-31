import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
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
      const categoryRef = await addDoc(categoriesCollection, data);
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
}
