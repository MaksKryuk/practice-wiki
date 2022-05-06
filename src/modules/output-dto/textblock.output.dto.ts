export class TextblockOutputDTO{

    readonly id: string;

    readonly text: string;

    constructor(data){
        this.id = data.id;
        this.text = data.text;
    }

}