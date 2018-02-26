import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TimePickerPage } from '../pages/time-picker/time-picker';
import { TimePickerPageModule } from '../pages/time-picker/time-picker.module';

@NgModule({
    declarations: [MyApp, HomePage],
    imports: [BrowserModule, IonicModule.forRoot(MyApp), TimePickerPageModule],
    bootstrap: [IonicApp],
    entryComponents: [MyApp, HomePage, TimePickerPage],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule {}
