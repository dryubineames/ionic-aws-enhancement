import { Component } from '@angular/core';
import { App } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { AboutPage } from '../about/about';
import { AccountPage } from '../account/account';
import {ChangePasswordPage} from '../changepassword/changepassword';

import { User } from '../../providers/providers';

@Component({
  templateUrl: 'settings.html'
})
export class SettingsPage {

  public aboutPage = AboutPage;
  public accountPage = AccountPage;
  public updatePwdPage = ChangePasswordPage;

  constructor(public user: User, public app: App) {
  }

  logout() {
    this.user.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }

}
