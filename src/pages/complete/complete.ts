import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Add} from '../add/add';


/*
  Generated class for the Complete page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-complete',
  templateUrl: 'complete.html'
})
export class Complete {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    


  }


 addTask(){
    console.log("AddTask");
    

    this.navCtrl.getByIndex(0)._nav.push(Add);
  }
}

