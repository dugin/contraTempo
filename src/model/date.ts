import Moment from 'moment';

export class DateModel {

    public days: number;
    public hours: number;
    public minutes: number;
    public seconds: number;
    public type: string;
    public timestamp: string;

    constructor(timestamp: string,
      ex: boolean,
     type?: string,
     days?: number,
        hour?: number,
        minutes?: number,
        seconds?: number
       ) {

  this.timestamp = timestamp;
  
        if (ex) {
            this.days = this.getDays();
            this.hours = this.getHours();
            this.minutes = this.getMinutes();
            this.seconds = this.getSeconds();
        }

        else {
            this.type = type;
            this.days = days;
            this.hours = hour;
            this.minutes = minutes;
            this.seconds = seconds;
        }

    }

    getHours(){
        return  this.getTimeDiff("hours") % 24;
    }

     getDays(){
        return  this.getTimeDiff("days");
    }

     getMinutes(){
        return  this.getTimeDiff("minutes") % 60;
    }

     getSeconds(){
        return  this.getTimeDiff("seconds") % 60;
    }

    getDiffInMs(){
         return  this.getTimeDiff("ms");
    }


    private getTimeDiff(type: Moment.UnitOfTime): number {

        let currentDate = Moment();
        let lastInsertedObjDate = Moment(this.timestamp, 'HH:mm DD/MM/YY');


        return Math.abs(currentDate.diff(lastInsertedObjDate, type));





    }




}