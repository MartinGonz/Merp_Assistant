import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemCreationPage } from './item-creation';

@NgModule({
  declarations: [
    ItemCreationPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemCreationPage),
  ],
  exports: [
    ItemCreationPage
  ]
})
export class ItemCreationPageModule {}
