import { Component } from '@angular/core';
import { ModalController, AlertController, ViewController, Platform } from 'ionic-angular';
import { Tag } from '../tag/tag';
import { Icon } from '../icon/icon';
import { DatePicker } from 'ionic-native';
import { DateUtil } from '../../util/date-util';
import { ExceptionUtil } from '../../util/exception-util';
import { TaskModel } from '../../model/task';
import { TaskProvider } from '../../providers/task'
/*
  Generated class for the Add page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class Add {


  readonly ICON_CLASS = 0;
  readonly TAG_CLASS = 1;
  dateArray = new Map<string, Date>();
  isIOS: boolean;
  task = new TaskModel(false);



  constructor(public taskProvider: TaskProvider, public viewCtrl: ViewController, public modalCtrl: ModalController, public alertCtrl: AlertController, public platform: Platform) { }

  ionViewDidLoad() {

    this.isIOS = this.platform.is('ios');
    console.log('Hello Add Page');
  }


  add(classNumber: number) {

    switch (classNumber) {
      case this.TAG_CLASS:
        this.presentModal(Tag);
        break;

      case this.ICON_CLASS:
        this.presentModal(Icon);
        break;
    }

  }

  done() {

    let exceptionChecker = ExceptionUtil.checkTask(this.task);

    exceptionChecker === true ?
      this.insertIntoDB() : this.showExceptionAlert(exceptionChecker.toString());
  }

  insertIntoDB() {

    var timeTemp = this.task.timestamp;

    this.task.timestamp = DateUtil.transformDate(DateUtil.DB_DATE_FORMAT, this.task.timestamp);

    this.taskProvider.insert(this.task).then((d) => {

      this.task.id = d.insertId;

      this.task.timestamp = timeTemp;

      this.viewCtrl.dismiss(this.task);

    }).catch(err => {

      console.log("taskProvider.insert err: " + err);




    })


  }

  setDate(dateEnds: Date, type: string) {

    if (!this.isIOS) {
      this.dateArray.set(type, dateEnds);

      if (type.localeCompare("date") == 0)
        this.presentDatePicker("time")

      if (this.dateArray.size == 2) {

        this.dateArray.get("date")
          .setHours(
          this.dateArray.get("time").getHours(),
          this.dateArray.get("time").getMinutes()
          );

        this.task.timestamp = DateUtil.transformDate(
          DateUtil.LOCAL_DATE_FORMAT,
          null,
          this.dateArray.get('date')
        );

        this.dateArray.clear();
      }
    }

    else
      this.task.timestamp = DateUtil.transformDate(DateUtil.LOCAL_DATE_FORMAT, null, dateEnds);
  }

  presentDatePicker(type: string) {

    DatePicker.show({
      date: new Date(),
      mode: type,
      is24Hour: true,
      minDate: this.isIOS ? new Date() : new Date().valueOf(),
      androidTheme: DatePicker.ANDROID_THEMES.THEME_HOLO_LIGHT,
      locale: "pt_br"
    }).then(
      date => {
        console.log("date: " + date);

        if (date != null)
          this.setDate(date, type);


      },
      err => console.log("Error occurred while getting date:", err)
      );

  }

  close() {
    this.viewCtrl.dismiss();
  }

  presentModal(className) {

    let modal = this.modalCtrl.create(className);
    modal.present();
    modal.onDidDismiss(data => {

      if (data != null) {
        this.task.tag = data;

      }


    });
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

    prompt.present();
   


  }

}
