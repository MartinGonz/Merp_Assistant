import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AF,USER_TO_DISPLAY } from './../../providers/af';
import { UserProvider } from './../../providers/user/user';
import { PlayingTabsPage } from '../../pages/playing-tabs/playing-tabs';



export interface GAME{
  gameMaster : string ;
  gameName:string;
  players : PLAYER[];
}
export interface PLAYER{
  character: string;
  playerId:string;
}

@IonicPage()
@Component({
  selector: 'page-current-games',
  templateUrl: 'current-games.html',
})
export class CurrentGamesPage {
  error;

  gamesList : any;

  public menuIcon: string = this.af.menuIcon ;

  constructor(public navCtrl: NavController, public navParams: NavParams, private af:AF,private userProvider:UserProvider) {
  this.gamesList= this.af.games
  console.log(this.gamesList)
  }

  selectGame(gameKey:string, gameMaster:string){
    this.af.currentGame = gameKey;
    let currentUser = this.af.currentUser
    let canPlay=false;

    let listUsersToDisplay:USER_TO_DISPLAY[]=[];

    let players = this.af.getPlayers(gameKey);
    players.forEach(array=> {
      array.forEach(element => {
        let characterToDisplay = this.userProvider.getCharacter(element.playerId, element.character)

        if (currentUser != element.playerId) {
          let userToDisplay: USER_TO_DISPLAY = {
            userId: element.playerId,
            character: characterToDisplay,
          }
          listUsersToDisplay.push(userToDisplay);
        }
        if (currentUser == gameMaster) {
          canPlay = true;
          this.af.setGM();
        }
        else if (currentUser == element.playerId) {
          this.af.selectedCharacter = characterToDisplay;
          canPlay = true;
          console.log(this.af.selectedCharacter)
        }
      });
    });

    if (canPlay) {
      this.af.setUsersToDisplay(listUsersToDisplay)
      console.log(listUsersToDisplay)
      this.navCtrl.setRoot(PlayingTabsPage);
      } else {
         this.error = 'You were not invited to this game'
    }
  }



}
