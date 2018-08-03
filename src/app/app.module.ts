import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { NotesPage } from '../pages/notes/notes';
import { AddNotePage } from '../pages/addNote/addNote';
import { AuthorizationPage } from '../pages/authorization/authorization';
import { RegisterPage } from '../pages/register/register';
import { TabsPage } from '../pages/tabs/tabs';
import { NoteDetailPage } from '../pages/note-detail/note-detail';
import { NoteItem } from '../pages/notes/components/note/note.component';
import { AccountPage } from '../pages/account/account';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { NotesService } from '../pages/notes/service/notes.service'

@NgModule({
  declarations: [
    MyApp,
    NotesPage,
    AddNotePage,
    NoteItem,
    AuthorizationPage,
    TabsPage,
    NoteDetailPage,
    RegisterPage,
    AccountPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NotesPage,
    AddNotePage,
    NoteItem,
    AuthorizationPage,
    TabsPage,
    NoteDetailPage,
    RegisterPage,
    AccountPage
  ],
  providers: [
    StatusBar,
    NotesService,
    SplashScreen,
    Camera,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
