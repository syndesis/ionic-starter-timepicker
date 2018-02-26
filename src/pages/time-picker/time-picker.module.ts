import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimePickerPage } from './time-picker';

@NgModule({
  declarations: [
    TimePickerPage,
  ],
  imports: [
    IonicPageModule.forChild(TimePickerPage),
  ],
})
export class TimePickerPageModule {}
