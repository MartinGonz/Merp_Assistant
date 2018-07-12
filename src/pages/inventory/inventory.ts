import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, MenuController,ViewController} from 'ionic-angular';


export interface EQUIPMENT{
  helmet:ITEM;
  accesories:ITEM[];
  main:ITEM;
  chest:ITEM;
  secondary:ITEM;
  gloves:ITEM;
  pants:ITEM;
  boots:ITEM;
}

export interface ITEM {
  $key:string;
  type:string;
  subType:string;
  statBonus:{skill:string,bonus:number};
  skillBonus:number;
  name:string;
}


@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {

  constructor(public navCtrl: NavController,public viewCtrl:ViewController, public navParams: NavParams, public menuCtl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryPage');
  }
  public itemSet:EQUIPMENT;
  public bag:any[];

  goBack(){
    this.viewCtrl.dismiss();
    this.menuCtl.close();
  }

}
