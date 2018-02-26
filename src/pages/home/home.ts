import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from 'ionic-angular';
import { TimePickerPage } from '../time-picker/time-picker';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    timeForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private modalController: ModalController
    ) {
        this.timeForm = this.formBuilder.group({
            time: ['6:00 PM']
        });
    }

    setTime() {
        const modal = this.modalController.create(TimePickerPage, {
            time: this.timeForm.controls['time'].value
        });
        modal.onDidDismiss(newTime => {
            if (newTime) {
                this.timeForm.patchValue({ time: newTime });
            }
        });
        modal.present();
    }
}
