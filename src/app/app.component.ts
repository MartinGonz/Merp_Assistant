import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from 'angularfire2/auth';
import { AF } from './../providers/af';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CreateGamePage} from '../pages/create-game/create-game';
import { CurrentGamesPage} from '../pages/current-games/current-games';
import { PlayingTabsPage } from '../pages/playing-tabs/playing-tabs';
import { InvitesPage} from '../pages/invites/invites';
import { CritsAndDmgPage} from '../pages/crits-and-dmg/crits-and-dmg'


@Component({
  templateUrl: 'app.html'})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  profilePic : string = "https://firebasestorage.googleapis.com/v0/b/merp-64b26.appspot.com/o/diceIcon.png?alt=media&token=a7bcb3e7-0cd1-414c-a403-c192095e16fa";

  pages: Array<{title: string, component: any}>;


  constructor(public platform: Platform,public afAuth:AngularFireAuth, public statusBar: StatusBar, public splashScreen: SplashScreen,private af:AF ) {
    this.initializeApp();

      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'Table', component: PlayingTabsPage },
        { title: 'Damage & Critical', component: CritsAndDmgPage },
        { title: 'Create Game', component: CreateGamePage},
        { title: 'Current Games', component: CurrentGamesPage},
        { title: 'Game Invites', component: InvitesPage}

      ];
    const authObserver = afAuth.authState.subscribe( user => {
      // used for an example of ngFor and navigation
      if (user) {
        this.af.setCurrentUser(user);
        this.profilePic = this.af.getProfilePic(user.uid).toString();
        authObserver.unsubscribe();
        this.rootPage = HomePage;
      } else {
        authObserver.unsubscribe();
        this.rootPage = LoginPage;
      }
    });

}

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

     // let db = new SQLite();
     // db.openDataBase({name:"data.db",location:"default"}).then(()=>{
     //   db.executeSql("CREATE TABLE IF NOT EXISTS   ")
     // })
    });
  }

  logout(){
    this.afAuth.auth.signOut()
    this.nav.setRoot(LoginPage);

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
