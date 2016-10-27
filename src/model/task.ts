import { TagModel } from '../model/tag';
import { DateModel } from '../model/date';

export class TaskModel {
    subject: string;
    name: string;
    timestamp: string;
    tag: TagModel;
    date: DateModel

    constructor(subject?: string, name?: string, timestamp?: string, tag?: TagModel, date?: DateModel) {

        this.subject = subject;
        this.name = name;
        this.timestamp = timestamp;
        this.tag = tag;
        this.date = date;

    }
}