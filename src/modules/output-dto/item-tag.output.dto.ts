export class ItemtagOutputDTO{

    readonly id: string;

    readonly tag_name: string;

    readonly item: any;

    constructor(data){
        this.id = data.id;
        this.tag_name = data.tag_name;
        this.item = data.item;
    }
}