export class ItemOutPutDTO{
    
    readonly id: string;

    readonly item_name: string;
    
    readonly tags: any;

    readonly recipes: any;

    constructor(data){
        this.id = data.id;
        this.item_name = data.item_name;
        this.tags = data.tags;
        this.recipes = data.recipes;
    }
}