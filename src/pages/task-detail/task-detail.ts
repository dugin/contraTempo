import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {TaskModel} from '../../model/task';
/*
  Generated class for the TaskDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-task-detail',
  templateUrl: 'task-detail.html'
})
export class TaskDetail {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello TaskDetailPage Page');
  }

}
