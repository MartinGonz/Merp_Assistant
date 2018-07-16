import { Component } from '@angular/core'
import {  NavController, NavParams, ModalController } from 'ionic-angular'
import { AF, USER_TO_DISPLAY } from './../../providers/af'
import {CharacterSheet} from '../../pages/character-sheet/character-sheet'

/**
 * Generated class for the TablePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-table',
  templateUrl: 'table.html',
})
export class TablePage {

 public  usersToDisplay : USER_TO_DISPLAY[];
 private currentSubscriber;

  constructor(public navCtrl: NavController, public navParams: NavParams,private af:AF,private modalCtrl:ModalController) {
    if(this.gameIsLoaded()){
      this.usersToDisplay = this.af.usersToDisplay;
      console.log(this.usersToDisplay)
    }
  }


  selectToReview(character:any,uid:string){
  if(this.af.isGameMaster()){
      if(this.currentSubscriber!=undefined){
        this.currentSubscriber.unsubscribe()
      }
      this.af.selectedCharacter=character
      let modal = this.modalCtrl.create(CharacterSheet,{owner:uid})
      modal.present();
      this.currentSubscriber = this.af.createCharacterSubscriber(character.$key,uid)
    }
  }

  isSelectedCharacter(key:string){
    let selectedChar = this.af.selectedCharacter
    let result = false;
    if (selectedChar!=null && selectedChar!=undefined){
     result = (selectedChar.$key == key)
    }
    return  result
  }

  gameIsLoaded(){
    return (this.af.currentGame!=null&&this.af.currentGame!=undefined)
  }

  sumPerception(perception:any){
    let result= 0;
       if(perception!=undefined){
         result = ((perception.PR*5)+(perception.BPR*5)-(perception.RPR*5))
       }
       return result
  }

  sumDefense(char:any){
    let result= 0;
      if(char.defense!=undefined&& char.stats!=undefined){
        result = ((char.defense.DB*5)+(char.defense.BDB*5)-(char.defense.RDB*5)+char.stats.AGI)
      }
      return result
  }

  sumHP(char:any){
    let result= 0;
      if(char.health!=undefined&& char.stats!=undefined){
        result = (char.health.HP+char.health.BHP-char.health.RHP+char.stats.CON)
      }
      return result
  }
}
