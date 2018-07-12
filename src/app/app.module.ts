import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { CharacterSheet} from '../pages/character-sheet/character-sheet';
import { LoginPage } from '../pages/login/login';
import { LobbyPage} from '../pages/lobby/lobby'
import { CharactersPage} from '../pages/characters/characters';
import { PlayingTabsPage } from '../pages/playing-tabs/playing-tabs';
import { PlayingTabsPageModule } from '../pages/playing-tabs/playing-tabs.module';
import { TablePage } from '../pages/table/table';
import { ChatPage} from '../pages/chat/chat';
import { NotesPage } from '../pages/notes/notes';
import { CreateGamePage} from '../pages/create-game/create-game';
import { CurrentGamesPageModule} from '../pages/current-games/current-games.module';
import { InvitesPage} from '../pages/invites/invites';
import { CritsAndDmgPage} from '../pages/crits-and-dmg/crits-and-dmg'



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {AF} from './../providers/af'



// angulare fire 2
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { UserProvider } from '../providers/user/user';
import {InventoryPage} from "../pages/inventory/inventory";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CharacterSheet,
    LoginPage,
    LobbyPage,
    CharactersPage,
    CreateGamePage,
    InvitesPage,
    CritsAndDmgPage,
    InventoryPage
  ],
  imports: [
    BrowserModule,
    PlayingTabsPageModule,
    CurrentGamesPageModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CharacterSheet,
    CharactersPage,
    LobbyPage,
    PlayingTabsPage,
    ChatPage,
    TablePage,
    NotesPage,
    CreateGamePage,
    InvitesPage,
    CritsAndDmgPage,
    InventoryPage
  ],
  providers: [
    AF,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider
  ]
})
export class AppModule {}
