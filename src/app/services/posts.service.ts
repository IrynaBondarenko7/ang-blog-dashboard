import { Injectable } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';
import { Post } from '../models/post';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private storage: Storage,
    private firestore: Firestore,
    private toastr: ToastrService,
    private router: Router
  ) {}

  uploadImage(file: File, postData: Post): Promise<void> {
    return new Promise((resolve, reject) => {
      const filePath = `postIMG/${Date.now()}`;
      const fileRef = ref(this.storage, filePath);

      uploadBytes(fileRef, file)
        .then(() => getDownloadURL(fileRef))
        .then((imageURL) => {
          postData.postImgPath = imageURL;
          return this.savePost(postData);
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  private savePost(postData: Post): Promise<void> {
    const postsCollection = collection(this.firestore, 'posts');
    return addDoc(postsCollection, postData)
      .then(() => {
        this.toastr.success('Post Added Successfully!');
        this.router.navigate(['/posts']);
      })
      .catch((error) => {
        this.toastr.error('Something went wrong. Try again!');
        throw error;
      });
  }

  loadPostsData(): Observable<Post[]> {
    const postsCollection = collection(this.firestore, 'posts');
    return collectionData(postsCollection, { idField: 'id' }) as Observable<
      Post[]
    >;
  }
}
