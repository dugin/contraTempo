import { TagModel } from '../model/tag';
import { DateModel } from '../model/date';

export class TaskModel {

    id: number;
    subject: string;
    name: string;
    timestamp: string;
    tag: TagModel;
    date: DateModel;
    isCompleted: boolean;

    constructor(isCompleted: boolean, id?: number, subject?: string, name?: string, timestamp?: string, tag?: TagModel, date?: DateModel) {
        this.isCompleted =  isCompleted;
        this.id = id;
        this.subject = subject;
        this.name = name;
        this.timestamp = timestamp;
        this.tag = tag;
        this.date = date;

    }
}