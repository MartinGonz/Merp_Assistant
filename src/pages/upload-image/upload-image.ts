import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { AngularFireStorage } from 'angularfire2/storage';
import {AF} from "../../providers/af";
import { finalize } from 'rxjs/operators';

/**
 * Generated class for the UploadImagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-upload-image',
  templateUrl: 'upload-image.html',
})
export class UploadImagePage {

  picture='';
  uploaded=null;
  uploadPercent:any;
  downloadURL:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              // private storage: AngularFireStorage,
              private af:AF) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadImagePage');
  }

  ionViewWillEnter(){
    this.picture=this.navParams.get('picture')
  }

  updatePicture(event:any){
    console.log(this.uploaded)
    if (event.target.files && event.target.files[0]) {
      this.uploaded=event.target.files[0];
      let reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.picture = (<FileReader>event.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  changeImage(){
    // const file = this.uploaded;
    // const filePath = '/userImages/'+this.af.currentUser;
    // const fileRef = this.storage.ref(filePath);
    // const task = this.storage.upload(filePath, file)
    // // observe percentage changes
    // this.uploadPercent = task.percentageChanges();
    // // get notified when the download URL is available
    // task.snapshotChanges().pipe(
    //   finalize(() => this.downloadURL = fileRef.getDownloadURL() )
    // )
    //   .subscribe()
  }
  cancel(){
    this.navCtrl.pop();
  }
}
