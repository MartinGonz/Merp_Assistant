import {Component} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {AF} from './../../providers/af';
import {UserProvider} from './../../providers/user/user'
import {FirebaseListObservable} from 'angularfire2/database';
import {CreateGamePage} from "../create-game/create-game";
import {CurrentGamesPage} from "../current-games/current-games";
import {CritsAndDmgPage} from "../crits-and-dmg/crits-and-dmg";
import {InvitesPage} from "../invites/invites";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  {

  public menuIcon: string = this.af.menuIcon ;

  public characters: FirebaseListObservable<any>;

  createGameImg="https://firebasestorage.googleapis.com/v0/b/merp-64b26.appspot.com/o/implements.png?alt=media&token=09e0cd2c-7d58-4e5c-ae3d-525d4383c4f0";

  currentGameImg="https://firebasestorage.googleapis.com/v0/b/merp-64b26.appspot.com/o/party.jpg?alt=media&token=42205f52-31f9-4703-96a6-f3864a976d21";
  invitesImg="https://firebasestorage.googleapis.com/v0/b/merp-64b26.appspot.com/o/scroll-buttoned.jpg?alt=media&token=0ee1416e-9a04-4bb7-9014-ada706f20b1c";
  critAndDmgImg="https://firebasestorage.googleapis.com/v0/b/merp-64b26.appspot.com/o/books.jpeg?alt=media&token=fba82c7f-0fe4-4be2-8bef-04bf4e1548c2";

  constructor(public modalCtrl:ModalController ,public afAuth:AngularFireAuth,
              public navCtrl: NavController, private af:AF, public userProvider:UserProvider) {
   this.af.getGamesFromUser();
  }

  goCreateGame(){
    this.navCtrl.push(CreateGamePage);
  }
  goCurrentGames(){
    this.navCtrl.push(CurrentGamesPage);
  }
  goCritsAndDamage(){
    this.navCtrl.push(CritsAndDmgPage);
  }
  goGameInvites(){
    this.navCtrl.push(InvitesPage);
  }

}
