import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
  ViewController,
  ModalController,
  AlertController
} from 'ionic-angular';
import {AF} from "../../providers/af";
import {ItemCreationPage} from "../item-creation/item-creation";
import {EquipItemPage} from "../equip-item/equip-item";


export interface EQUIPMENT{
  helmet:number;
  accessories:number;
  main:number;
  chest:number;
  secondary:number;
  gloves:number;
  pants:number;
  boots:number;
}

export interface ITEM {
  type:string;
  subType:string;
  defenseBonus:number;
  skillBonus:number;
  name:string;
  twoHanded:boolean;
  description:string;
}


@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {

  constructor(public modalctrl:ModalController, public navCtrl: NavController,private af:AF,
              public viewCtrl:ViewController, public navParams: NavParams,public alertCtrl:AlertController,
              public menuCtl: MenuController) {

    let inventory = this.af.getInventory();
    if(inventory!=null&&inventory!=undefined){
      this.itemSet = inventory.itemSet;
      this.bag = inventory.bag;
    }
  }

  public owner:string;
  public armourType:string;
  public itemSet:EQUIPMENT;
  public bag:ITEM[]= new Array();

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryPage');
  }

  ionViewWillEnter(){
    this.armourType=this.navParams.get("armourType")
  }
  goBack(){
    let inventory = {itemSet:this.itemSet,bag:this.bag};
    this.saveInventory();
    this.viewCtrl.dismiss(inventory);
    this.menuCtl.close();
  }

  createItem(){
    let modal = this.modalctrl.create(ItemCreationPage)
    modal.onDidDismiss(newItem=>{
      if(newItem!=undefined&&newItem!=null){
        this.bag.push(newItem);
      }
    })
    modal.present();

  }

  saveInventory(){
    let inventory = {itemSet:this.itemSet,bag:this.bag}
    this.af.saveInventory(this.owner,inventory);
  }

  confirmDelete(item:any){
    let alert = null;
    let index = this.bag.indexOf(item);
    if(this.itemSet.pants==index){
      alert = this.alertCtrl.create({
        title:"Nonononono",
        message:"You can't go running around naked, get another set of pants",
        buttons:['OK']
      })
    }else {
    alert = this.alertCtrl.create({
      title:'Confirm Delete',
      message:'Do you really want to delete this?',
      buttons:[
        {
          text:'Confirm',
          role:'confirm',
          handler:()=>{
            this.bag.splice(index,1);
          }
        },
        {
          text:'Cancel',
          role:'cancel'
        }
      ]
    })
    }
    alert.present();
  }
  alertWrongType(){
    let alert = this.alertCtrl.create({
      title:"Try another",
      message:"You can't use more than one type of armour",
      buttons:['OK']
    })
    alert.present()
  }
  openEquipHelmet(){
    let helmets = this.bag.filter(item=> item.type=="Helmet" || item.type=="Base").slice();

    let modal = this.modalctrl.create(EquipItemPage, {items: helmets,current:this.bag[this.itemSet.helmet]});

    modal.onDidDismiss(selected=>{
      if(selected!=null&&selected!=undefined) {
        if(selected.subType==this.armourType){
          this.itemSet.helmet = this.bag.indexOf(selected);
        }else{
          this.alertWrongType();
        }
      }
        })
    modal.present()
  }
  openEquipMainHand(){
    let weapons= this.bag.filter(item=> item.type=="Weapon" || item.type=="Base" || item.type=="Shield").slice();

    let modal = this.modalctrl.create(EquipItemPage, {items: weapons,current:this.bag[this.itemSet.main]});

    modal.onDidDismiss(selected=>{
      if(selected!=null&&selected!=undefined) {
        let itemSelected= this.bag.indexOf(selected);
        if(selected.twoHanded){
          this.itemSet.main=this.bag.indexOf(selected);
          this.itemSet.secondary= 0;
        }else {
          this.itemSet.main=this.bag.indexOf(selected);
        }
      }
    })
    modal.present()
  }
  openEquipSecondaryHand(){
    if(this.bag[this.itemSet.main].twoHanded) {
      let alert = this.alertCtrl.create({
        title:"Nope",
        message:"You will need that hand to hold your weapon",
        buttons:['OK']
      })
      alert.present();
    }else{
    let weapons= this.bag.filter(item=> (item.type=="Weapon" || item.type=="Shield" || item.type=="Base")&& item.twoHanded==false ).slice();

    let modal = this.modalctrl.create(EquipItemPage, {items: weapons,current:this.bag[this.itemSet.secondary]});

    modal.onDidDismiss(selected=>{
      if(selected!=null&&selected!=undefined) {
        this.itemSet.secondary = this.bag.indexOf(selected);
      }
    })
    modal.present()
    }
  }
  openEquipChest(){
    let chest = this.bag.filter(item=> item.type=="Chest" || item.type=="Base").slice();

    let modal = this.modalctrl.create(EquipItemPage, {items: chest,current:this.bag[this.itemSet.chest]});

    modal.onDidDismiss(selected=>{
      if(selected!=null&&selected!=undefined) {
        if(selected.subType==this.armourType) {
          this.itemSet.chest = this.bag.indexOf(selected)
        }else{
          this.alertWrongType();
        }
      };
    })
    modal.present()
  }
  openEquipGloves(){
    let gloves= this.bag.filter(item=> item.type=="Gloves" || item.type=="Base").slice();

    let modal = this.modalctrl.create(EquipItemPage, {items: gloves,current:this.bag[this.itemSet.gloves]});

    modal.onDidDismiss(selected=>{
      if(selected!=null&&selected!=undefined) {
        if (selected.subType == this.armourType) {
          this.itemSet.gloves = this.bag.indexOf(selected)
        }else{
          this.alertWrongType();
        }
      }
    })
    modal.present()
  }
  openEquipPants(){
    let pants=  this.bag.filter(item=> item.type=="Pants" || item.type=="Base").slice();

    let modal = this.modalctrl.create(EquipItemPage, {items: pants,current:this.bag[this.itemSet.pants]});

    modal.onDidDismiss(selected=>{
      if(selected!=null&&selected!=undefined) {
        if (selected.subType == this.armourType) {
          this.itemSet.pants = this.bag.indexOf(selected);
        }else{
          this.alertWrongType();
        }
      }
    })
    modal.present()
  }
  openEquipBoots(){
    let boots = this.bag.filter(item=> item.type=="Boots" || item.type=="Base").slice();

    let modal = this.modalctrl.create(EquipItemPage, {items: boots,current:this.bag[this.itemSet.boots]});

    modal.onDidDismiss(selected=>{
      if(selected!=null&&selected!=undefined) {
        if (selected.subType == this.armourType) {
          this.itemSet.boots = this.bag.indexOf(selected);
        }else{
          this.alertWrongType();
        }
      }
    })
    modal.present()
  }

  openDescription(item){
    let alert = this.alertCtrl.create({
      title:"Description",
      message: item.description +" (Type: "+item.type+", SubType: "+item.subType+", Skill Bonus:"+item.skillBonus+", Defense Bonus:"+item.defenseBonus+")",
      buttons:['Go Back']
    })
    alert.present()

  }

}
