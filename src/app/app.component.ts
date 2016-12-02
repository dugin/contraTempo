import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { TaskList } from '../pages/task-list/task-list';
import { Database } from '../util/database';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {

      Database.openDatabase().then(() => {

        this.rootPage = TaskList;
      }
      ).catch(err => {

        console.log("openDatabase: " + err);

      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
