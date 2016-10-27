import { SQLite } from 'ionic-native';


export abstract class Database {

  private static DB_NAME = 'data.db';
  private static DB_LOCATION = 'default'

  public static storage: SQLite;

  constructor() { }

  static openDatabase(): Promise<any> {

      if (Database.storage == null) {

        Database.storage = new SQLite();

       return Database.storage.openDatabase({
          name: this.DB_NAME,
          location: this.DB_LOCATION
       });
      }
       
      else
        return Promise.resolve(Database.storage);

  }

  abstract createTable();
  abstract insert(obj : any);
  abstract update(obj : any);
  abstract delete(id : number);
  abstract get(id : number);
  abstract getAll();


}