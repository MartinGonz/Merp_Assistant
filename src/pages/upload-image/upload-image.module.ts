import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadImagePage } from './upload-image';

@NgModule({
  declarations: [
    UploadImagePage,
  ],
  imports: [
    IonicPageModule.forChild(UploadImagePage),
  ],
  exports: [
    UploadImagePage
  ]
})
export class UploadImagePageModule {}
