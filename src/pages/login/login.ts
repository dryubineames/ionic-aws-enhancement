import { Component } from '@angular/core';

import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { ConfirmPage } from '../confirm/confirm';

import { PasswordResetPage } from '../passwordreset/passwordreset';

import { User } from '../../providers/providers';

export class LoginDetails {
  username: string;
  password: string;
}

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public loginDetails: LoginDetails;

  public error: any;

  constructor(public navCtrl: NavController,
    public user: User,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
    this.loginDetails = new LoginDetails();
  }

  login() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    let details = this.loginDetails;
    console.log('login..');
    this.user.login(details.username, details.password).then((result) => {
      console.log('result:', result);
      loading.dismiss();
      this.navCtrl.setRoot(TabsPage);
    }).catch((err) => {
      if (err.message === "User is not confirmed.") {
        loading.dismiss();
        this.navCtrl.push(ConfirmPage, { 'username': details.username });
      }
      console.log('errrror', err);
      this.error = err;
      loading.dismiss();
    });
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }

  forgotPassword() {
    let prompt = this.alertCtrl.create({
      title: 'Forgot Password',
      message: "Please enter username for new password",
      inputs: [
        {
          name: 'Username',
          placeholder: 'login/username'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'New Password',
          handler: ((username) => {
            console.log(`New password clicked with ${username.Username}`);
            const login = username ? username.Username.trim() : '';
            if ( login.length > 3) {
              this.user.forgotPassword(login).then((data) => { 
                console.log(data);
                this.navCtrl.push(PasswordResetPage); // password reset page soon
             }).catch((err) => {
                console.log(`Error on processing forgot password, ${err.message}`);
                this.error = err;
              });
            }
          })
        }
      ]
    });
    prompt.present();
  }

}
