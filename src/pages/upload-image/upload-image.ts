import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

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
  file:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
      this.file=event.target.files[0];
      let reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.picture = (<FileReader>event.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  changeImage(){
    // const userImagesRef = this.firebase.storage.ref().child("userImages");
    // let uploadTask = userImagesRef.putFile(this.file)
    //
    // this.uploadPercent = uploadTask.percentageChanges();
    // // get notified when the download URL is available
    // uploadTask.snapshotChanges().pipe(
    //   finalize(() => this.downloadURL = userImagesRef.getDownloadURL() )
    // )
    //   .subscribe()
  }
  cancel(){
    this.navCtrl.pop();
  }
}
