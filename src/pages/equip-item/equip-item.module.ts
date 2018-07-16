import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EquipItemPage } from './equip-item';

@NgModule({
  declarations: [
    EquipItemPage,
  ],
  imports: [
    IonicPageModule.forChild(EquipItemPage),
  ],
  exports: [
    EquipItemPage
  ]
})
export class EquipItemPageModule {}
