import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFireList} from 'angularfire2/database';
import { AF } from './../../providers/af';


/**
 * Generated class for the ChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',

})
export class ChatPage {

  @ViewChild(Content) content: Content;

  public messages: AngularFireList<{}>
  public currentUser ;
  public messageToSend:string = '';
  public hideTime = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,private af:AF) {
    if(this.gameIsLoaded()){
        this.af.setMessages();
        this.messages = this.af.messages;
        this.currentUser=this.af.currentUser;
    }

  }

  ionViewDidEnter() {
      this.content.scrollToBottom();
    }


  gameIsLoaded(){
    let result =  (this.af.currentGame!=null)&&(this.af.currentGame!=undefined)
    return result
}
  sendMessage(){
    if (this.messageToSend.match('\s') ){
      this.af.sendMessage(this.messageToSend);
      this.messageToSend = '';
      this.ionViewDidEnter()
    }
  }



  loadAllMessages(){
    this.messages = this.af.getAllMessages()
  }

  parseDate(date:string){
    if(date!=null&&date!=undefined){
      let fechaYHora:string[] = date.split(' ')
      let horaYminutos = fechaYHora[1].split(':')
      return horaYminutos[0]+':'+horaYminutos[1]
    }
  }

  showDisplayName(displayName:string){
    let result ='';
    if (displayName != this.af.user.displayName){
      result = displayName + ': ';
    }
    return result;
  }
}
