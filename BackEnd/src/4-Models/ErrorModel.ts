export class ErrorModel{
    constructor(public message: string, public status: number){}
}

export class RouteNotFoundErrorModel extends ErrorModel{
    constructor(route: string){
        super(`Route ${route} Not Found!`, 404)
    }
}

export class ValidationErrorModel extends ErrorModel{
    constructor(msg: string){
        super( msg, 400)
    }
}

export class ResourceNotFoundErrorModel extends ErrorModel{
    constructor(id: number){
        super(`This ${id} does nort exist!`, 404)
    }
}

export class AuthorizationErrorModel extends ErrorModel{
    constructor(message: string){
        super(message, 401)
    }
}

