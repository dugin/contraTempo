import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Add } from '../add/add';
import { TaskModel } from '../../model/task';
import { TagModel } from '../../model/tag';
import { DateModel } from '../../model/date';
import { TaskProvider } from '../../providers/task';
import { TagProvider } from '../../providers/tag'
import { DateUtil } from '../../util/date-util';
import { Observable } from 'rxjs/Rx';
/*
  Generated class for the Upcoming page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-upcoming',
  templateUrl: 'upcoming.html'
})
export class Upcoming {

  tasks = new Array<TaskModel>();
  dates = new Array<DateModel>();


  constructor(public modalCtrl: ModalController, public taskProvider: TaskProvider, public tagProvider: TagProvider, public navCtrl: NavController) {

    tagProvider.createTable().then(() => {

      taskProvider.createTable().then(() => {

        this.getAll();

      }).catch(err => {

        console.log("tagProvider.createTable(): " + err);

      })
    }).catch(err => {

      console.log("taskProvider.createTable(): " + err);

    })
  }

  countDown(index: number) {

    console.log("countDown index: " + index);

    let timer = Observable.timer(null, 1000);
    timer.subscribe(() => {

      let date = this.dates[index];

      if (date.seconds != null)
        date.seconds = date.getSeconds();

      if (date.minutes != null)
        date.minutes = date.getMinutes();

      if (date.hours != null)
        date.hours = date.getHours();


      if (date.days != null)
        date.days = date.getDays();

    }
    );

  }



  private checkDate(date: DateModel, timestamp: string, index?: number) {

    console.log("checkDate");

    if (index == null) {

      if (date.days != 0)
        this.dates.push(new DateModel(timestamp, false, 'Dias', date.days));


      else if (date.days == 1)
        this.dates.push(new DateModel(timestamp, false, 'Dia', date.days));

      else {

        if (date.hours != 0)
          this.dates.push(new DateModel(timestamp, false, 'Horas', null, date.hours, date.minutes));


        else if (date.hours == 1)
          this.dates.push(new DateModel(timestamp, false, 'Hora', null, date.hours, date.minutes));


        else {
          this.dates.push(new DateModel(timestamp, false, 'Minutos', null, null, date.minutes, date.seconds));

        }

      }
    }
    else {
      if (date.days != 0)
        this.dates.splice(index, 0, new DateModel(timestamp, false, 'Dias', date.days));


      else if (date.days == 1)
        this.dates.splice(index, 0, new DateModel(timestamp, false, 'Dia', date.days));

      else {

        if (date.hours != 0)
          this.dates.splice(index, 0, new DateModel(timestamp, false, 'Horas', null, date.hours, date.minutes));


        else if (date.hours == 1)
          this.dates.splice(index, 0, new DateModel(timestamp, false, 'Hora', null, date.hours, date.minutes));


        else {
          this.dates.splice(index, 0, new DateModel(timestamp, false, 'Minutos', null, null, date.minutes, date.seconds));


        }

      }
    }




  }


  addTask() {
    this.presentModal();

  }

  private presentModal() {

    let modal = this.modalCtrl.create(Add);
    modal.present();
    modal.onDidDismiss(task => {

      if (task != null) {
        this.insertSorted(task);

      }


    });
  }


  private insertSorted(task: TaskModel) {

    task.date = new DateModel(task.timestamp, true)

    var i = 0;

    if (this.tasks.length > 0) {
      for (i; i < this.tasks.length; i++) {



        let t = this.tasks[i];

        if (i == this.tasks.length - 1) {

          this.tasks.push(task);
          break;
        }

        else if (task.date.getDiffInMs() > t.date.getDiffInMs())
          continue;



        else {

          this.tasks.splice(i, 0, task);

          break;
        }

      }
      if (i == this.tasks.length -2 )
        this.checkDate(task.date, task.timestamp);
      else
        this.checkDate(task.date, task.timestamp, i);

      this.countDown(i);
    }
    else
      this.tasks.push(task);

  }


  private getAll() {
    console.log("getAll");

    this.taskProvider.getAll().then((tasks) => {


      for (let x = 0; x < tasks.rows.length; x++) {

        this.tagProvider.get(tasks.rows.item(x).idtag).then((data) => {

          let localDate = DateUtil.transformDate(
            DateUtil.LOCAL_DATE_FORMAT,
            tasks.rows.item(x).timestamp);

          let date = new DateModel(localDate, true);

          this.tasks.push(new TaskModel(
            tasks.rows.item(x).subject,
            tasks.rows.item(x).name,
            localDate,
            new TagModel(
              data.rows.item(0).name,
              data.rows.item(0).color,
              data.rows.item(0).id
            ),
            date));

          this.checkDate(date, localDate);
          this.countDown(x);
        })
      }

    })
  }


}
