import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { AuthorizationPageModule } from '../pages/authorization/authorization.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { NotesService } from '../core/service/notes.service';
import { AuthService } from '../core/service/auth.service';

import { StoreModule } from '@ngrx/store';
import { notesReduser } from '../redux/notes/notes.reduser';
import { authReducer } from '../redux/auth/auth.reduser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { NotesEffects } from '../redux/notes/notes.effects';
import { AuthEffects } from '../redux/auth/auth.effects';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AuthorizationPageModule,
    RegisterPageModule,
    TabsPageModule,
    EffectsModule.forRoot([
      NotesEffects,
      AuthEffects,
    ]),
    IonicModule.forRoot(MyApp),
    StoreModule.forRoot({
      notesPage: notesReduser,
      authPage: authReducer,
    }),
    StoreDevtoolsModule.instrument(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    NotesService,
    AuthService,
    SplashScreen,
    Camera,
    LocalNotifications,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ],
})
export class AppModule {}
