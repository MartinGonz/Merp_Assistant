import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';



export interface USER {
    providerId: string;
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
    invites:FirebaseListObservable<any[]>;
    characters : FirebaseListObservable<any[]>;
    games: FirebaseListObservable<GAME_PER_USER[]>
};

export interface GAME_PER_USER{
 game:string
}

export interface CHARACTER{
  $key:string;
  stats : any;
  perception:any;
  movement:any;
  health:any;
  weapons:any;
  generals:any;
  subtrefuge:any;
  magic:any;
  defense:any;
  name:string;
  armourType:string;
  inventory:any;
}

@Injectable()
export class UserProvider {

  private users : FirebaseListObservable<any[]>;

  constructor(public db:AngularFireDatabase) {
    this.users = this.db.list('users')
  }

  getUser(uid:string){
    var result:USER = {} as USER;
    this.db.object('users/'+uid).forEach(element => {
            result.providerId = element.providerId;
            result.email = element.email;
            result.photoURL=element.photoURL;
            result.displayName = element.displayName;
            result.characters = this.db.list('users/'+uid+'/characters');
            result.invites = this.db.list('users/'+uid+'/invites');
            result.games = this.db.list('users/'+uid+'/games');
    });;
    return result;
  }

  getUserDisplayName(uid){
    return this.db.object('users/'+uid+'/displayName')
  }

  getAllUsers(){
    return this.users;
  }
  getCharacter(uid:string,charId:string){
  let characterToLoad = {} as CHARACTER;
   this.db.object('users/'+uid+'/characters/'+charId).forEach(character =>{
      characterToLoad.$key = charId
      characterToLoad.stats = character.stats
      characterToLoad.perception = character.perception
      characterToLoad.health = character.health
      characterToLoad.movement = character.movement
      characterToLoad.weapons = character.weapons
      characterToLoad.generals = character.generals
      characterToLoad.subtrefuge = character.subtrefuge
      characterToLoad.magic = character.magic
      characterToLoad.defense = character.defense
      characterToLoad.armourType = character.armourType
      characterToLoad.name = character.name
     characterToLoad.inventory = character.inventory
  })

    return characterToLoad;
  }

  createUser(user:any,userName:string){
    var userCreate = {
           providerId : user.providerId,
           displayName :userName,
           email : user.email,
           photoURL : 'https://firebasestorage.googleapis.com/v0/b/merp-64b26.appspot.com/o/diceIcon.png?alt=media&token=a7bcb3e7-0cd1-414c-a403-c192095e16fa',
           invites:null,
           characters : null,
           games:null
          }
    this.users.update(user.uid,userCreate);
  }

  setGameInUser(user:string,gameKey:string){
   const gameObsrvable =  this.db.list('users/'+user+'/games')
   gameObsrvable.push({game: gameKey})

  }



}
