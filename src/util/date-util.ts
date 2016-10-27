import Moment from 'moment';

export class DateUtil {

  static LOCAL_DATE_FORMAT = 0;
  static DB_DATE_FORMAT = 1;

 

  static transformDate(type: number, dateString?: string, date?: Date): string {

    switch (type) {

      case DateUtil.LOCAL_DATE_FORMAT:
        return dateString ? Moment(dateString, 'YYYY-MM-DD HH:mm').format('HH:mm DD/MM/YY') : Moment(date).format('HH:mm DD/MM/YY');



      case DateUtil.DB_DATE_FORMAT:
        return dateString ? Moment(dateString, 'HH:mm DD/MM/YY').format('YYYY-MM-DD HH:mm') : Moment(date).format('YYYY-MM-DD HH:mm');



    }
  }

  static getHours(timestamp : string){
        return  this.getTimeDiff(timestamp, "hours") % 24;
    }

   static  getDays(timestamp : string){
        return  this.getTimeDiff(timestamp, "days");
    }

   static  getMinutes(timestamp : string){
        return  this.getTimeDiff(timestamp, "minutes") % 60;
    }

   static  getSeconds(timestamp : string){
        return  this.getTimeDiff(timestamp, "seconds") % 60;
    }

    private static getTimeDiff(date: string, type: Moment.UnitOfTime): number {

        let currentDate = Moment();
        let lastInsertedObjDate = Moment(date, 'HH:mm DD/MM/YY');


        return Math.abs(currentDate.diff(lastInsertedObjDate, type));





    }


 



}



