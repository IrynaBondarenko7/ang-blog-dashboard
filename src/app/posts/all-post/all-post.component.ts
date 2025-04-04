import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-all-post',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './all-post.component.html',
  styleUrl: './all-post.component.css',
})
export class AllPostComponent {
  postService = inject(PostsService);
  postsArray: Post[] = [];

  ngOnInit() {
    this.postService.loadPostsData().subscribe((val) => {
      this.postsArray = val;
      this.postsArray;
    });
  }

  formatTimestampToDate(timestamp: Timestamp): string {
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  onDelete(postImgPath: string, id: string) {
    this.postService.deletePostImage(postImgPath, id).subscribe();
  }

  onFeatured(id: string, value: boolean) {
    const featuredData = {
      isFeatured: value,
    };
    this.postService.markFeatured(id, featuredData).subscribe();
  }
}
