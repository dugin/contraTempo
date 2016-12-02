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

    return Database.storage.executeSql('CREATE TABLE IF NOT EXISTS task (id INTEGER PRIMARY KEY AUTOINCREMENT, subject TEXT,  name TEXT, timestamp TEXT, idtag INTEGER, iscompleted INTEGER, FOREIGN KEY(idtag) REFERENCES tag(id))', [])
     
  }

  insert(task: TaskModel): Promise<any> {

    let iscompleted = task.isCompleted ? 1 : 0; 

    return Database.storage.executeSql('INSERT INTO task (subject, name, timestamp, idtag, iscompleted) VALUES (?,?,?,?,?)', [task.subject ,task.name, task.timestamp, task.tag.id, iscompleted])
  }

  getAll(): Promise<any> {
    return Database.storage.executeSql('SELECT * FROM task ORDER BY timeStamp ASC',[]);
  }

  get(id: number): Promise<any> {
    return Database.storage.executeSql('SELECT * FROM task WHERE id = ?'
      , [id ])
  }

  update(task: TaskModel): Promise<any> {

     let iscompleted = task.isCompleted ? 1 : 0; 

    return Database.storage.executeSql('UPDATE task SET subject= ?, name = ?, timestamp = ?, idtag= ?, isCompleted = ?  WHERE id = ?', [task.subject, task.name, task.timestamp, task.tag.id, iscompleted])

  }

  setCompleted(id: number, iscompleted: boolean){
   
    return Database.storage.executeSql('UPDATE task SET  isCompleted = ?  WHERE id = ?', [iscompleted ? 1 : 0, id])


  }

  delete(id: number): Promise<any> {

    return Database.storage.executeSql('DELETE FROM task WHERE id = ?'
      , [id])

  }

  deleteAll(): Promise<any> {

    return Database.storage.executeSql('DELETE FROM task'
      , [])

  }


}