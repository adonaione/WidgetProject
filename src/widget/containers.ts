import Container from './Container';


class LeftLeaningContainer extends Container {
    constructor(){
        super()
        this.borderRadius = '10% 25%'
    }
}

class RightLeaningContainer extends Container {
    constructor(){
        super()
        this.borderRadius = '25% 10%'
    }
}

class CircleContainer extends Container {
    constructor(){
        super()
        this.borderRadius = '50%'
    }
}

export {
    LeftLeaningContainer,
    RightLeaningContainer,
    CircleContainer
}
