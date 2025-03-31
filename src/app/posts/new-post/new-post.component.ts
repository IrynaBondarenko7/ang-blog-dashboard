import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css',
})
export class NewPostComponent {
  permalink = new FormControl({ value: '', disabled: true });

  onTitleChanged($event: Event) {
    const title = ($event.target as HTMLInputElement).value;
    const formattedTitle = title.trim().toLowerCase().replace(/\s+/g, '-');

    this.permalink.setValue(formattedTitle);
  }
}
