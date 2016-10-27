import { Injectable } from '@angular/core';
import { Database } from '../util/database';
import { TaskModel } from '../model/task';

/*
  Generated class for the task provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TaskProvider extends Database {



  constructor() {
    super();


   
  }



  createTable() {


    return Database.storage.executeSql('CREATE TABLE IF NOT EXISTS task (id INTEGER PRIMARY KEY AUTOINCREMENT, subject TEXT,  name TEXT, timestamp TEXT, idtag INTEGER, FOREIGN KEY(idtag) REFERENCES tag(id))', [])
     
  }



  insert(task: TaskModel): Promise<any> {
    return Database.storage.executeSql('INSERT INTO task (subject, name, timestamp, idtag) VALUES (?,?,?,?)', [task.subject ,task.name, task.timestamp, task.tag.id])
  }

  getAll(): Promise<any> {
    return Database.storage.executeSql('SELECT * FROM task ORDER BY timeStamp ASC', [])
  }

  get(id: number): Promise<any> {
    return Database.storage.executeSql('SELECT * FROM task WHERE id = ?'
      , [id])
  }

  update(task: TaskModel): Promise<any> {

    return Database.storage.executeSql('UPDATE task SET subject= ?, name = ?, timestamp = ?, idtag= ?  WHERE id = ?', [task.subject, task.name, task.timestamp, task.tag.id])

  }


  delete(id: number): Promise<any> {

    return Database.storage.executeSql('DELETE FROM task WHERE id = ?'
      , [id,])

  }


}