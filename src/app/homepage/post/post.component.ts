import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../../services/post.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  idUser = parseInt(<string>localStorage.getItem('ID'));
  selectedImage: any = null;
  imageUrl: string = "";
  formPost!: FormGroup;
  @ViewChild('uploadFile', {static: true}) public imageDom: ElementRef | undefined
  selected: string = "PUBLIC";
  typeStatus: string = "Đăng bài viết";

  constructor(private storage: AngularFireStorage,
              private _fb: FormBuilder,
              private postService: PostService,
              public dialogRef: MatDialogRef<PostComponent>) {
  }

  ngOnInit(): void {
    this.formPost = this._fb.group({
      content:['', Validators.required],
      image:[''],
      status: ['', Validators.required],
    })
  }

  uploadFireBase() {
    if (this.selectedImage != null) {
      const filePath = this.selectedImage.name;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges()
        .pipe(
          finalize(
            () => (fileRef.getDownloadURL()
              .subscribe(url => this.imageUrl = url))
          )
        ).subscribe()
    }
  }

  uploadImage() {
    this.selectedImage = this.imageDom?.nativeElement.files[0];
    this.uploadFireBase()
  }

  onPost() {
    const post = {
      content: this.formPost.value.content,
      image: this.imageUrl,
      status: this.formPost.value.status
    }
    this.postService.savePost(this.idUser, post).subscribe(() => {
      this.formPost.reset()
    })
  }
}
