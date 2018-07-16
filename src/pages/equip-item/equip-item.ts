import { Component } from '@angular/core';
import {AlertController, IonicPage, MenuController, NavController, NavParams, ViewController} from 'ionic-angular';
import {AF} from "../../providers/af";

/**
 * Generated class for the EquipItemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-equip-item',
  templateUrl: 'equip-item.html',
})
export class EquipItemPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController,
              public menuCtrl:MenuController, public viewCtrl:ViewController, public af:AF) {

  }

  items;

  currentEquiped;

  confirmEquip(item){
    let alert = this.alertCtrl.create({
      title:'Equip this item ?',
      buttons:[{
        text:'Confirm',
        role:'confirm',
        handler:()=>{
          this.viewCtrl.dismiss(item)
        }
      },
        {
          text:'Cancel',
          role:'cancel'
        }

      ]
    })
    alert.present();
  }

  goBack(){
    this.viewCtrl.dismiss();
    this.menuCtrl.close();
  }

  ionViewWillEnter(){
    this.items = this.navParams.get("items");
    this.currentEquiped= this.navParams.get("current");
    console.log(this.items)
  }

  isCurrent(item){
    return item==this.currentEquiped;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EquipItemPage');
  }

}
