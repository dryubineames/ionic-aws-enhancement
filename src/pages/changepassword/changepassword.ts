import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';

import {TabsPage} from '../tabs/tabs';

import { User } from '../../providers/providers';

@Component({
    selector: 'page-changepassword',
    templateUrl: 'changepassword.html'
})
export class ChangePasswordPage {

    passwordUpdate = {
        "oldPwd" : '',
        "newPwd0" : null,
        "newPwd1" : null
    }
    error: Error;

    constructor(private navCtrl: NavController, private user: User) {
        this.error = null;
    }

    changePassword() {

     console.log('changePassword();')
     console.log(`updating password}`);
     this.error = null; // reset the error object

     this.user.updatePassword(this.passwordUpdate.oldPwd, 
     this.passwordUpdate.newPwd0).then( (result) => {
         this.navCtrl.push(TabsPage);
     }).catch ((err) => {
         this.error = err;
     });

    }
}