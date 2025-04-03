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
  doc,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Post } from '../models/post';
import { ToastrService } from 'ngx-toastr';
import {
  Observable,
  from,
  switchMap,
  tap,
  catchError,
  throwError,
  map,
} from 'rxjs';
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

  uploadImage(
    file: File,
    postData: Post,
    formStatus: string,
    id: string
  ): Observable<void> {
    const filePath = `postIMG/${Date.now()}`;
    const fileRef = ref(this.storage, filePath);

    return from(uploadBytes(fileRef, file)).pipe(
      switchMap(() => from(getDownloadURL(fileRef))),
      switchMap((imageURL) => {
        if (formStatus === 'Edit') {
          return this.updatePost(id, postData);
        } else {
          postData.postImgPath = imageURL;
          return this.savePost(postData);
        }
      }),
      catchError((error) => {
        this.toastr.error('Something went wrong. Try again!');
        return throwError(() => error);
      })
    );
  }

  savePost(postData: Post): Observable<void> {
    const postsCollection = collection(this.firestore, 'posts');

    return from(addDoc(postsCollection, postData)).pipe(
      map(() => void 0),
      tap(() => {
        this.toastr.success('Post Added Successfully!');
        this.router.navigate(['/posts']);
      }),
      catchError((error) => {
        this.toastr.error('Something went wrong. Try again!');
        return throwError(() => error);
      })
    );
  }

  loadPostsData(): Observable<Post[]> {
    const postsCollection = collection(this.firestore, 'posts');
    return collectionData(postsCollection, { idField: 'id' }) as Observable<
      Post[]
    >;
  }

  loadOnePost(id: string): Observable<Post | null> {
    const postRef = doc(this.firestore, `posts/${id}`);
    return from(getDoc(postRef)).pipe(
      map((postSnap) =>
        postSnap.exists() ? ({ id, ...postSnap.data() } as Post) : null
      )
    );
  }

  updatePost(id: string, updatedPostData: Partial<Post>): Observable<void> {
    const postRef = doc(this.firestore, `posts/${id}`);
    return from(updateDoc(postRef, updatedPostData)).pipe(
      tap(() => {
        this.toastr.success('Post Updated Successfully!');
        this.router.navigate(['/posts']);
      }),
      catchError((error) => {
        this.toastr.error('Something went wrong. Try again!');
        return throwError(() => error);
      })
    );
  }
}
