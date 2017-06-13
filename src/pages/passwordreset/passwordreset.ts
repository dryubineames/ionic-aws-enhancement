import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';

import { User } from '../../providers/providers';

import {LoginPage} from '../login/login';

@Component({
    selector: 'page-passwordreset',
    templateUrl: 'passwordreset.html'
})
export class PasswordResetPage {
    passwordResetDetails = {
        "username": '',
        "code": '',
        "newPassword0" : '',
        "newPassword1" : ''
    }
    error: any;
    constructor(public navCtrl: NavController, public user: User) {
    }

    confirmNewPassword() {
        
      this.user.confirmNewPassword(this.passwordResetDetails.username,
                                   this.passwordResetDetails.code,
                                   this.passwordResetDetails.newPassword0
                              ).then((result) => {
                                  this.navCtrl.push(LoginPage);
                              }).catch((err) => {
                                  this.error = err;
                                  console.log(`Password reset error - ${err.message}`);
                              })
    }
}