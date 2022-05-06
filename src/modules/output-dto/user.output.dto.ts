export class UserOutputDTO{
    readonly id: string;

    readonly role: string; 

    readonly login: string;
    
    readonly createdAt: string;
    
    readonly updatedAt: string;

    constructor(data) {
        this.id = data.id;
        this.role = data.role;
        this.login = data.login;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}