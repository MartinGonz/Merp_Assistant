import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AF } from './../../providers/af';
import { UserProvider} from './../../providers/user/user';
import { AngularFireList} from 'angularfire2/database';
import { CharactersPage} from '../../pages/characters/characters';

/**
 * Generated class for the InvitesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-invites',
  templateUrl: 'invites.html',
})
export class InvitesPage {

  public menuIcon: string = this.af.menuIcon ;

  private playerInvites : AngularFireList<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private af:AF,private userProv: UserProvider) {
  this.playerInvites = this.af.getPlayerInvites()
  console.log(this.playerInvites)
  }

  deleteInvite(invite:string){
   this.af.deleteInvite(invite);
  }

  joinGame(gameKey:string,inviteKey:string){
    this.af.currentGame = gameKey;
    this.userProv.setGameInUser(this.af.currentUser,gameKey);
    this.af.getGamesFromUser();
    this.deleteInvite(inviteKey)
    this.navCtrl.push(CharactersPage)
  }

  getUserIcon(uid){
    return this.af.getProfilePic(uid);
  }

}
