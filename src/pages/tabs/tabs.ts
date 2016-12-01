import { Component } from '@angular/core';
import { Complete } from '../complete/complete';
import { Upcoming } from '../upcoming/upcoming';
import { NavController  } from 'ionic-angular';
import {Add} from '../add/add';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = Upcoming;
  tab2Root: any = Complete;
 
  

  constructor(public navCtrl: NavController) {

  }

 }
