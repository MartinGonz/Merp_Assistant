import { Component, OnInit } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AF } from './../../providers/af';
import { UserProvider } from './../../providers/user/user';
import { HomePage } from './../../pages/home/home';
import Error = firebase.auth.Error;


@Component({
    selector: 'login-page',
    templateUrl: 'login.html'
})

export class LoginPage implements OnInit {
    error;

   public user:string;
   public password:string;
   public passwordConfirm:string;

   public userCreate:string;
   public userName:string;
   public passwordCreate:string;

    constructor(public afAuth: AngularFireAuth,public af: AF, public navCtrl:NavController,
                public userProvider:UserProvider, public alertCtrl:AlertController ) {
    }

    ngOnInit() { }
    onClickLogingWithUserAndPass(){

        this.afAuth.auth.signInWithEmailAndPassword(this.user,this.password)
            .then(user =>  this.successHandler()).catch(e => this.errorHandler(e));

    }

    onClickLoginWithGoogle() {
          this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then(() => this.successHandler()).catch(e => this.errorHandler(e));
    }

    onClickLoginWithFacebook() {
        this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
            .then(() => this.successHandler()).catch(e => this.errorHandler(e));
    }

    createUser(){
         if (this.passwordCreate==this.passwordConfirm) {
        this.afAuth.auth.createUserWithEmailAndPassword(this.userCreate,this.passwordCreate)
        .then(() =>   this.afAuth.auth.signInWithEmailAndPassword(this.userCreate,this.passwordCreate)
            .then(() => this.successCreationHandler())).catch(e => this.errorHandler(e));} else {
           let alert=this.alertCtrl.create({
             title:'Error',
             message: "Password and Confirmation do not match",
             buttons:['OK']
           })
           alert.present()}
    }

    successHandler() {
       const authObserver = this.afAuth.authState.subscribe(user=>{
            if (user) {
                if(this.af.setCurrentUser(user)){
                authObserver.unsubscribe();
                this.navCtrl.setRoot(HomePage);
                this.af.getGamesFromUser()
                }
                else {
                authObserver.unsubscribe();
                this.navCtrl.setRoot(LoginPage);
                 }
            }
        })
        }
    successCreationHandler(){
           const authObserver = this.afAuth.authState.subscribe(user=>{
            if (user) {
                this.userProvider.createUser(user,this.userName);
                if(this.af.setCurrentUser(user)){
                authObserver.unsubscribe();
                this.navCtrl.setRoot(HomePage);
                this.af.getGamesFromUser()
                }
                else {
                authObserver.unsubscribe();
                this.navCtrl.setRoot(LoginPage);
                 }
            }
        })
    }
    errorHandler(e) {
      let alert=this.alertCtrl.create({
        title:'Error',
        message: e.message,
        buttons:['OK']
      })
      alert.present()
        this.af.zoneRun();
    }
}
