
import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFireList} from 'angularfire2/database';
import { AF } from './../../providers/af';

@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage {

 @ViewChild(Content) content: Content;

    public notes: AngularFireList<any[]>

    public noteToSend:string = '';


    constructor(public navCtrl: NavController, public navParams: NavParams,private af:AF) {
      if(this.gameIsLoaded()){
          this.af.setNotes();
          this.notes = this.af.notes;
      }

    }

  ionViewDidEnter() {
        this.content.scrollToBottom();
  }

  gameIsLoaded(){
      let result =  (this.af.currentGame!=null)&&(this.af.currentGame!=undefined)
      return result
  }
    sendNote(){
      if (this.noteToSend.match('\s') ){
        this.af.sendNote(this.noteToSend);
        this.noteToSend = '';
        this.ionViewDidEnter()
      }
    }

}
