import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
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
  selector: 'page-task-list',
  templateUrl: 'task-list.html'
})
export class TaskList {

  tasksUpcoming = new Array<TaskModel>();
  tasksComplete = new Array<TaskModel>();
  tasksList = this.tasksUpcoming;
  taskType: string = 'upcoming';

  constructor(public modalCtrl: ModalController,
    public taskProvider: TaskProvider,
    public tagProvider: TagProvider) {

    tagProvider.createTable().then(() => {

      taskProvider.createTable().then(() => {

        //this.taskProvider.deleteAll();

        this.getAll();

      }).catch(err => {

        console.log("tagProvider.createTable(): " + err);

      })
    }).catch(err => {

      console.log("taskProvider.createTable(): " + err);

    })
  }

  onChange(event: string) {
    console.log(event);

    if (event.localeCompare('upcoming') == 0)
      this.tasksList = this.tasksUpcoming
    else
      this.tasksList = this.tasksComplete

  }

  countDown(index: number) {

    console.log("countDown index: " + index);

    let timer = Observable.timer(null, 1000);
    timer.subscribe(() => {

      let date = this.tasksUpcoming[index].date;

      if (date.seconds != null) {
        date.seconds = date.getSeconds();

        if (date.seconds < 5)
          if (date.getDiffInMs() >= 0)
            this.setCompleted(index);
      }

      if (date.minutes != null)
        date.minutes = date.getMinutes();


      if (date.hours != null)
        date.hours = date.getHours();


      if (date.days != null)
        date.days = date.getDays();

    }
    );

  }

  setCompleted(index: number) {

    this.taskProvider.setCompleted(this.tasksUpcoming[index].id, true).then(() => {

      let task = this.tasksUpcoming[index];
      task.date = new DateModel(task.timestamp, false, 'Dias', 0)
      this.tasksComplete.unshift(task);
      this.tasksUpcoming.splice(index, 1);

    })

  }



  private checkDate(date: DateModel, timestamp: string) {

    console.log("checkDate");

    if (date.days != 0)
      return new DateModel(timestamp, false, 'Dias', date.days);


    else if (date.hours != 0)
      return new DateModel(timestamp, false, 'Horas', null, date.hours, date.minutes);

    else
      return new DateModel(timestamp, false, 'Minutos', null, null, date.minutes, date.seconds);

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

    let d = new DateModel(task.timestamp, true);

    task.date = this.checkDate(d, task.timestamp);

    var i = 0;


    for (i; i < this.tasksUpcoming.length; i++) {

      let t = this.tasksUpcoming[i];

      if (task.date.getDiffInMs() < t.date.getDiffInMs())
        continue;

      else {

        this.tasksUpcoming.splice(i, 0, task);
        this.countDown(i);
        this.countDown(this.tasksUpcoming.length - 1);
        return;
      }

    }
    this.tasksUpcoming.push(task);
    this.countDown(i);

  }


  private getAll() {


    this.taskProvider.getAll().then((tasks) => {


      for (let x = 0; x < tasks.rows.length; x++) {

        this.tagProvider.get(tasks.rows.item(x).idtag).then((data) => {

          let localDate = DateUtil.transformDate(
            DateUtil.LOCAL_DATE_FORMAT,
            tasks.rows.item(x).timestamp);

          let date = new DateModel(localDate, true);

          let iscompleted: boolean = tasks.rows.item(x).iscompleted;

          let task = new TaskModel(
            iscompleted,
            tasks.rows.item(x).id,
            tasks.rows.item(x).subject,
            tasks.rows.item(x).name,
            localDate,
            new TagModel(
              data.rows.item(0).name,
              data.rows.item(0).color,
              data.rows.item(0).id
            ),
            iscompleted ? new DateModel(localDate, false, 'Dias', date.days) : this.checkDate(date, localDate));



          tasks.rows.item(x).iscompleted ?
            this.tasksComplete.unshift(task) : this.tasksUpcoming.unshift(task);


          this.countDown(x);
        })
      }



    })
  }


}
