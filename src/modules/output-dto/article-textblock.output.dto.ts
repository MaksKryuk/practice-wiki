export class ArticleTextblockOutputDTO{

    readonly article_id: number;

    readonly text_blocks_id: string;

    readonly position_number: string;

    constructor(data){
        this.article_id = data.article_id;
        this.text_blocks_id = data.text_blocks_id;
        this.position_number = data.position_number
    }
}