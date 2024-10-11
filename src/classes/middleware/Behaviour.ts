export interface Behaviour<behaviourSubject extends Request|Response>{    
    behave(): Promise<Response|null>
}

export interface RequestBehaviour extends Behaviour<Request>{
}

export interface ResponseBehaviour extends Behaviour<Response>{
}

export abstract class AbstractBehaviour<behaviourSubject extends Request|Response> implements Behaviour<behaviourSubject>
{
    constructor(protected subject: behaviourSubject)
    {}

    abstract behave(): Promise<Response|null>    
}

