export class ArticleOutputDTO{

    readonly id: string;

    readonly item_id: string;

    readonly article_name: string;

    readonly text_blocks: any;

    constructor(data){
        this.id = data.id;
        this.item_id = data.item_id;
        this.article_name = data.article_name;
        this.text_blocks = data.text_blocks;
    }

}