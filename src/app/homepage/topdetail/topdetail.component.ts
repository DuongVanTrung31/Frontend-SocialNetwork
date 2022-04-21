import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-topdetail',
  templateUrl: './topdetail.component.html',
  styleUrls: ['./topdetail.component.css']
})
export class TopdetailComponent implements OnInit {
  user!: User
  id = parseInt(<string>localStorage.getItem("ID"));
  @ViewChild('uploadFile', {static: true}) public imageDom: ElementRef | undefined
  selectedImage: any;
  constructor(private userService:UserService,
              private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.userService.getUserInfo(this.id).subscribe(data => this.user = data)
  }

  uploadFireBase() {
    this.selectedImage = this.imageDom?.nativeElement.files[0];
    if (this.selectedImage != null) {
      const filePath = this.selectedImage.name;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges()
        .pipe(
          finalize(
            () => (fileRef.getDownloadURL()
              .subscribe((url) => {
                this.user.avatarUrl = url
                this.userService.updateImg(this.id,{avatarUrl: url}).subscribe(() => {
                  this.ngOnInit()
                })
              }))
          )
        ).subscribe()
    }
  }
}
