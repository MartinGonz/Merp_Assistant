import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AF} from './../../providers/af';
import {UserProvider} from './../../providers/user/user';
import {FirebaseListObservable} from 'angularfire2/database';
import {HomePage} from "../home/home";

/**
 * Generated class for the CreateGamePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-game',
  templateUrl: 'create-game.html',
})
export class CreateGamePage {
  error;

  public games : FirebaseListObservable<any>;

  public gameName : string;

  public players : any;


  private users : FirebaseListObservable<any[]>;

  public menuIcon: string = this.af.menuIcon ;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af:AF, private usersProvideer:UserProvider) {

  this.users = this.usersProvideer.getAllUsers();
  this.games = this.af.getAllGames();

  }

  createGame(){
    if(this.gameName!=null&&this.players!=null){
      let game = {
        gameMaster: this.af.currentUser,
        gameName:this.gameName,
        players:null
      }

      let gameKey = this.games.push(game).key;
      this.notifyPlayerInvite(this.players,gameKey,this.gameName,this.af.user.displayName)
      this.usersProvideer.setGameInUser(this.af.currentUser,gameKey)
      this.error=null
      this.navCtrl.setRoot(HomePage)
    }else{
      this.error = 'Game Name and Players cannot be empty'
    }
  }

  notifyPlayerInvite(players:string[],gamekey:string,gameName:string,gameMasterName:string){
    players.forEach(element => {
      if (element!= this.af.currentUser) {
      let playerInvite = {
        gameMaster:gameMasterName,
        gameKey:gamekey,
        gameName:gameName
      }
      this.af.pushGameInvite(element,playerInvite)
      }
    });
  }

}
