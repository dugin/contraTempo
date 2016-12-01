import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Icon page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-icon',
  templateUrl: 'icon.html'
})
export class Icon {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Icon Page');
  }

}
