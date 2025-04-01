import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [ReactiveFormsModule, AngularEditorModule, CommonModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css',
})
export class NewPostComponent {
  permalink = new FormControl({ value: '', disabled: true });
  imgSrc: any = 'assets/placeholder-img.png';
  selectedImg: any;
  categories: Category[] = [];

  private categoryService = inject(CategoriesService);
  private formBuilder = inject(FormBuilder);
  postForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    permalink: [''],
    excerpt: ['', [Validators.required, Validators.minLength(50)]],
    category: ['', [Validators.required]],
    postImg: ['', [Validators.required]],
    content: ['', [Validators.required]],
  });

  constructor() {}

  ngOnInit() {
    this.categoryService.loadData().subscribe((val) => {
      this.categories = val;
    });
  }

  get formControl() {
    return this.postForm.controls;
  }

  onTitleChanged($event: Event) {
    const title = ($event.target as HTMLInputElement).value;
    const formattedTitle = title.trim().toLowerCase().replace(/\s+/g, '-');

    this.permalink.setValue(formattedTitle);
  }

  showPreview($event: Event) {
    const input = $event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgSrc = e.target?.result;
      };
      reader.readAsDataURL(input.files[0]);
      this.selectedImg = input.files[0];
    }
  }
}
