export class TagModel {
    public name: string;
    public color: string;
    public id: number;

    constructor(name?: string, color?: string, id?: number) {
        this.id = id;
        this.color = color;
        this.name = name;
    }
}