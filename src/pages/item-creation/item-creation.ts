import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, ViewController} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-item-creation',
  templateUrl: 'item-creation.html',
})
export class ItemCreationPage {

  constructor( public menuCtl: MenuController,public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }
  private newItem={name:"", defenseBonus:0,skillBonus:0,subType:"",type:"",twoHanded:false, description:"No Description"};

  private subTypeToSelect:{value:string,description:string}[];

    ionViewDidLoad() {
    console.log('ionViewDidLoad ItemCreationPage');
  }
  checkTwoHanded(){
    return this.newItem.type=="Weapon";
  }
  checkType(){
    return this.newItem.type!="";
  }
  checkName(){
    return this.newItem.name!="";
  }
  checkSubType(){
    return this.newItem.subType!="";
  }
  checkShield(){
      return this.newItem.type!="Shield"
  }

  goBack(){
    this.viewCtrl.dismiss()
    this.menuCtl.close();
  }

  loadSubType(){
    if(this.newItem.type=="Helmet"||this.newItem.type=="Gloves"||this.newItem.type=="Pants"||this.newItem.type=="Chest"||this.newItem.type=="Boots"){
      this.subTypeToSelect= [{value:"NA",description:"No Armour"},
        {value:"LE",description:"Leather"},
        {value:"HL",description:"Hardened Leather"},
        {value:"CH",description:"Chain Mail"},
        {value:"PL",description:"Plate armour"}];
    }else if(this.newItem.type=="Weapon") {
      this.subTypeToSelect = [{value: "ED", description: "Edge"},
        {value: "BL", description: "Blunt"},
        {value: "TH", description: "2 Handed"},
        {value: "THR", description: "Throw"},
        {value: "PRO", description: "Projectile"},
        {value: "PO", description: "Pole"}]
    }else if(this.newItem.type=="Shield") {
      this.subTypeToSelect=[{value:"WS",description:"Wooden Shield"},
        {value:"MS",description:"Metal Shield"},
        {value:"RMS",description:"Rare Material Shield"}]
    }
  }

  create(){
    this.viewCtrl.dismiss(this.newItem)
    this.menuCtl.close();
  }

}
