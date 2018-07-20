import {Injectable, NgZone} from "@angular/core";
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
import {UserProvider,USER} from  './user/user'



export interface GAME{
  gameMaster : string ;
  gameName:string;
  players : FirebaseListObservable<any[]>;
  messages: FirebaseListObservable<any[]>;
  notes : FirebaseListObservable<any[]>;
}

export interface USER_TO_DISPLAY{
  userId:string;
  character:any;
}
export interface INVENTORY{
  itemSet:any;
  bag:any[];
  coins:any;
}


@Injectable()
export class AF {

  public displayName : string;
  public email : string;
  public currentUser : string = null;
  public currentGame : string;
  public games : any[] = [];

  private isGM = false;

  public messages : FirebaseListObservable<any[]>;
  public notes : FirebaseListObservable<any[]>;

  public usersToDisplay : USER_TO_DISPLAY[];

  user: USER = {} as USER;

  userToInvite :USER = { } as USER;

  menuIcon = "https://firebasestorage.googleapis.com/v0/b/merp-64b26.appspot.com/o/diceIcon.png?alt=media&token=a7bcb3e7-0cd1-414c-a403-c192095e16fa";

  public selectedCharacter: any;


  constructor(private ngZone: NgZone,public db: AngularFireDatabase,public  afAuth: AngularFireAuth, public userProvider:UserProvider) {
     db.database.goOnline();
     afAuth.authState;

     }


  zoneRun() {
        this.ngZone.run( () => {} );
  }

  setUsersToDisplay(listOfUsers:USER_TO_DISPLAY[]){
    this.usersToDisplay = listOfUsers;
  }

  getCharacters(){
    return this.user.characters;
  }

  getProfilePic(uid:string){
    return this.db.object('users/'+uid+'/photoURL');
  }

  setCurrentUser(user){
             this.user= this.userProvider.getUser(user.uid);
             this.currentUser=user.uid;
             return (this.currentUser!=undefined&&this.currentUser!=null)
  }

  saveCharacter(key:string,stats,perception,health,movement,weapons,generals,subtrefuge,magic,defense,name,armour:string,inventory){
      let keyAtEnd = "";
      if(key==""){
             var characterCreate = {
                name:name,
                user:this.currentUser,
                stats:stats,
                perception:perception,
                health:health,
                movement:movement,
                weapons:weapons,
                generals:generals,
                subtrefuge:subtrefuge,
                magic:magic,
                defense:defense,
                armourType:armour,
                timestamp:Date.now(),
                inventory:inventory
            }
         keyAtEnd = this.user.characters.push(characterCreate).key;
      }else{
        keyAtEnd=key;
        var characterUpdate = {
          name:name,
          stats:stats,
          perception:perception,
          health:health,
          movement:movement,
          weapons:weapons,
          generals:generals,
          subtrefuge:subtrefuge,
          magic:magic,
          defense:defense,
          armourType:armour,
          timestamp:Date.now(),
          inventory:inventory
      }
      this.user.characters.update(key,characterUpdate);
    }
    return keyAtEnd;
  }

  deleteCharacter(char:any){
    this.user.characters.remove(char);
  }

  getGames(){
    return this.games
  }

  getPlayerInvites(){
    return this.user.invites;
  }

  deleteInvite(inviteKey){
    this.user.invites.remove(inviteKey);
  }

  pushGameInvite(userkey:string , invitation :any){
    this.userToInvite = this.userProvider.getUser(userkey)
    this.userToInvite.invites.push(invitation);
  }

  joinGame(characterKey:string){
    let player ;
    if(characterKey == null){
      let newChar = this.newCharacter()
        player = {
          playerId: this.currentUser,
          character : newChar
       }
       this.selectedCharacter =this.userProvider.getCharacter(this.currentUser,newChar);
      }else{
        player = {
          playerId: this.currentUser,
          character : this.oldCharNewGame(characterKey)
      }
    }
    let players= this.db.list('games/'+this.currentGame+'/players')
    players.push(player);
   }

  newCharacter(){
		let STATS = {INT:0,AGI:0,PRE:0,CON:0,I:0,STR:0};
		let PERCEPTION = {PR:0,BPR:0,RPR:0};
		let HEALTH = {HP:0,BHP:0,RHP:0};
		let MOVEMENT = {NA:0,BNA:0,RNA:0,
						LE:0,BLE:0,RLE:0,
						HL:0,BHL:0,RHL:0,
						CM:0,BCM:0,RCM:0,
						PL:0,BPL:0,RPL:0};
	  let WEAPONS = { ED:0,ED2:0,BMED:0,BIED:0,RED:0,
						BL:0,BL2:0,BMBL:0,BIBL:0,RBL:0,
						TH:0,TH2:0,BMTH:0,BITH:0,RTH:0,
						THR:0,THR2:0,BMTHR:0,BITHR:0,RTHR:0,
						PRO:0,PRO2:0,BMPRO:0,BIPRO:0,RPRO:0,
						PO:0,PO2:0,BMPO:0,BIPO:0,RPO:0};
	  let GENERALS = {CL:0,CL2:0,BMCL:0,BICL:0,RCL:0,
						RD:0,RD2:0,BMRD:0,BIRD:0,RRD:0,
						SW:0,SW2:0,BMSW:0,BISW:0,RSW:0,
						TR:0,TR2:0,BMTR:0,BITR:0,RTR:0};
		let SUBTREFUGE = {AM:0,AM2:0,BMAM:0,BIAM:0,RAM:0,
							SH:0,SH2:0,BMSH:0,BISH:0,RSH:0,
							LP:0,LP2:0,BMLP:0,BILP:0,RLP:0,
							DT:0,DT2:0,BMDT:0,BIDT:0,RDT:0};
		let MAGIC ={RN:0,RN2:0,BMRN:0,BIRN:0,RRN:0,
					UMO:0,UMO2:0,BMUMO:0,BIUMO:0,RUMO:0,
					DS:0,DS2:0,BMDS:0,BIDS:0,RDS:0};
    let DEFENSE = { DB:0,BDB:0,RDB:0};
    let INVENTORY={ ITEM_SET:{HELMET:null,ACCESSORIES:[],MAIN:null,CHEST:null,SECONDARY:null,GLOVES:null,PANTS:null,BOOTS:null},
                    BAG:[]};
   return this.saveCharacter("",STATS,PERCEPTION,HEALTH,MOVEMENT,WEAPONS,GENERALS,SUBTREFUGE,MAGIC,DEFENSE,"","", INVENTORY)
	}

  getPlayers(gameKey){
    return this.db.list('games/'+gameKey+'/players');
  }

  processGame(gameObject:any){
    this.games = []
    let gameToLoad = null ;
     gameObject.forEach(element3 => {
         gameToLoad = {
          gameKey : element3.$key,
          gameName: element3.gameName,
          gameMaster: element3.gameMaster,
          players: element3.players
            }
         this.games.push(gameToLoad);
       });
  }
  getGameByKey(key:string){
    let as =  this.db.object('games/'+ key)
    return as;
  }

  getGamesFromUser(){
  this.db.list('users/'+this.currentUser+'/games').subscribe(element => {
    element.forEach(element2 => {
       this.processGame(this.getGameByKey(element2.game))
       });
    });
  }

  getAllGames(){
    return this.db.list('games')
  }

  setMessages(){
    this.messages = this.db.list('games/'+this.currentGame+'/messages',{
      query:{
        limitToLast:15
      }
    })
  }

  getAllMessages(){
    return this.db.list('games/'+this.currentGame+'/messages')
  }

  setNotes(){
    this.notes =this.db.list('games/'+this.currentGame+'/notes')
  }

  sendNote(text){
    let note ={
      text:text
    }
    this.notes.push(note)
  }

  sendMessage(text) {
    var message = {
      text: text,
      user : this.currentUser,
      displayName: this.user.displayName,
      time:  new Date().toLocaleString()
    };
    this.messages.push(message);
  }

  isGameMaster(){
    return this.isGM;
  }

  setGM(){
    this.isGM = true;
  }

 createCharacterSubscriber(charKey:string,uid:string){
    return this.db.object('users/'+uid+'characers/'+charKey).subscribe(element =>{
      this.selectedCharacter = {
                  key: charKey,
                  stats: element.stats,
                  perception: element.perception,
                  health: element.health,
                  movement: element.movement,
                  weapons: element.weapons,
                  generals: element.generals,
                  subtrefuge: element.subtrefuge,
                  magic: element.magic,
                  defense: element.defense,
                  name: element.name,
                  inventory:element.inventory
            }
        })
  }

  oldCharNewGame(charKey:string){
    let char = this.userProvider.getCharacter(this.currentUser,charKey)
    return this.saveCharacter("",char.stats,char.perception,char.health,char.movement,char.weapons,char.generals,char.subtrefuge,char.magic,char.defense,'',char.armourType,char.inventory)
  }

  getInventory(owner:string){
    let inventory={} as INVENTORY;
    if(this.selectedCharacter.inventory==undefined&&this.isGM&&owner!=undefined){
     this.db.object('users/'+owner+'/characters/'+this.selectedCharacter.key+'/inventory').forEach(element=>{
       inventory.itemSet=element.itemSet
       inventory.bag=element.bag
       inventory.coins=element.coins
     })
    }else {
      inventory=this.selectedCharacter.inventory;
    }
    return inventory;
  }
  saveInventory(uid:string,inventory:any){
    const inventoryFromDb =   this.db.object('users/'+uid+'/characters/'+this.selectedCharacter.key+'/inventory/')
    inventoryFromDb.update(inventory);
    console.log(inventory);
  }

}
