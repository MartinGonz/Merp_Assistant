import { Component} from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AF } from './../../providers/af';
import { AngularFireList } from 'angularfire2/database';
import { PlayingTabsPage } from '../../pages/playing-tabs/playing-tabs';



@IonicPage()
@Component({
  selector: 'page-characters',
  templateUrl: 'characters.html',
})
export class CharactersPage {
  public characters: AngularFireList<any>;

  public menuIcon: string = this.af.menuIcon ;

  constructor(public afAuth:AngularFireAuth ,public navCtrl: NavController, private af:AF, ) {
   this.characters = this.af.getCharacters();
  }

  goPlayingPages(){
    this.navCtrl.setRoot(PlayingTabsPage)
  }

  deleteCharacter(char){
    this.af.deleteCharacter(char);
  }

  selectCharacter(character){
    if(character==null){
    this.af.joinGame(null)
    this.goPlayingPages();
    }else{
      this.af.selectedCharacter = character
      this.af.joinGame(character.$key)
      this.goPlayingPages()
    }
  }

  goBack(){
    console.log(this.navCtrl.canGoBack())
   // this.navCtrl.setRoot(this.navCtrl.getPrevious().component)
  }

}
