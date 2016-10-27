import { Injectable } from '@angular/core';
import { Database } from '../util/database';
import { TagModel } from '../model/tag';

/*
  Generated class for the Tag provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TagProvider extends Database {



  constructor() {
    super();
  }



  createTable() {


    return Database.storage.executeSql('CREATE TABLE IF NOT EXISTS tag (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, color TEXT)', [])
     

  }



  insert(tag: TagModel) {
    return Database.storage.executeSql('INSERT INTO tag (name,color) VALUES (?,?)', [tag.name, tag.color])
  }

  getAll() {
    return Database.storage.executeSql('SELECT * FROM tag', [])
  }

  get(id: number) {
    return Database.storage.executeSql('SELECT * FROM tag WHERE id = ?'
      , [id])
  }

  update(tag: TagModel): Promise<any> {

    return Database.storage.executeSql('UPDATE tag SET  name = ?, color = ?  WHERE id = ?', [tag.name, tag.color, tag.id])

  }


  delete(id: number) {

    return Database.storage.executeSql('DELETE FROM tag WHERE id = ?'
      , [id,])

  }


}