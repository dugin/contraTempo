import { Component } from '@angular/core';
import { NavController, ViewController, AlertController, NavParams } from 'ionic-angular';
import { TagModel } from '../../model/tag';
import { ExceptionUtil } from '../../util/exception-util';
/*
  Generated class for the TagDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tag-detail',
  templateUrl: 'tag-detail.html'
})
export class TagDetail {

  groupColors = [];
  styleColorInput = { icon: "ios-arrow-down" };
  styleGrid = { visibility: "hidden", class: null };
  tag = new TagModel();
  index: number;

  constructor(public navParams: NavParams, public alertCtrl: AlertController, public navCtrl: NavController, public viewCtrl: ViewController) {


  }

  ionViewDidLoad() {
    console.log('Hello TagDetail Page');
    this.fillColors();
    this.getParameters();


  }


  getParameters() {


    if (this.navParams.get('tag') != null) {
      this.tag.color = this.navParams.get('tag').color;
      this.tag.name = this.navParams.get('tag').name;
      this.tag.id = this.navParams.get('tag').id;

    }

    if (this.navParams.get('index') != null)
      this.index = this.navParams.get('index');
  }

  onColorPick() {
    if (this.styleGrid.visibility.localeCompare("visible") == 0 && this.styleColorInput.icon.localeCompare("ios-arrow-up") == 0) {
      this.styleGrid.visibility = "hidden";
      this.styleColorInput.icon = "ios-arrow-down";
      this.styleGrid.class = null;

    }
    else {
      this.styleGrid.class = "animated bounceInUp";
      this.styleGrid.visibility = "visible";
      this.styleColorInput.icon = "ios-arrow-up";
    }

  }

  fillColors() {

    this.groupColors.push({ colors: ["blue", "red", "pink", "green"] });
    this.groupColors.push({ colors: ["orange", "purple", "gray", "black"] });


  }

  close() {

    this.viewCtrl.dismiss();

  }

  setColor(color: string) {

    console.log("setColor");


    this.tag.color = color;

    this.onColorPick();
  }

  doneEditing() {
    let exceptionChecker = ExceptionUtil.checkTag(this.tag);
    console.dir(this.tag);
    console.log(exceptionChecker);


    if (exceptionChecker === true) {

      this.tag.name = this.tag.name.toUpperCase();

      this.viewCtrl.dismiss({
        tag: this.tag,
        index: this.index
      })
    }
    else
      this.showExceptionAlert(exceptionChecker.toString());






  }



  showExceptionAlert(msg: string) {
       let prompt = this.alertCtrl.create({
      title: 'Erro',
      message: msg,
      buttons: [
        {
          text: 'Ok'

        }
      ]
    });
    prompt.setCssClass('alert');
 
    prompt.present();
   
   

     
   




  }


  checkFields(): boolean {

    if (this.tag.name == null || this.tag.color == null)
      return false;

    else if (this.tag.name.length == 0)
      return false;

    return true;
  }

}
