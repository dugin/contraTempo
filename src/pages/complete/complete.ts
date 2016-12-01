import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TaskProvider } from '../../providers/task';
import { TagProvider } from '../../providers/tag'
import { DateUtil } from '../../util/date-util';
import { TaskModel } from '../../model/task';
import { TagModel } from '../../model/tag';
import { DateModel } from '../../model/date';

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

   GET_COMPLETED = 1;
   tasks = new Array<TaskModel>();

 constructor( public taskProvider: TaskProvider,
   public tagProvider: TagProvider) {

      this.getAll();
   }




   private getAll() {
    console.log("getAll complete");  

    this.taskProvider.getAll(this.GET_COMPLETED).then((tasks) => {


      for (let x = 0; x < tasks.rows.length; x++) {

        this.tagProvider.get(tasks.rows.item(x).idtag).then((data) => {

          let localDate = DateUtil.transformDate(
            DateUtil.LOCAL_DATE_FORMAT,
            tasks.rows.item(x).timestamp);

          let date = new DateModel(localDate, true);

          this.tasks.unshift(new TaskModel(
            false,
            tasks.rows.item(x).id,
            tasks.rows.item(x).subject,
            tasks.rows.item(x).name,
            localDate,
            new TagModel(
              data.rows.item(0).name,
              data.rows.item(0).color,
              data.rows.item(0).id
            ),
            new DateModel(localDate, false, 'Dias', date.days)));

        
        })
      }

    })
  }



}

