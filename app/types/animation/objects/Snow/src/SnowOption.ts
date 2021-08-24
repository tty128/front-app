import Point from '../../../src/interface/Point'

export default interface SnowOption {
    size? : number,
    maxSize? : number,
    speed? : number,
    style? : number,
    reactive? : Point,
    childSpan? : number,
    childQuantity? :number
    fallSpeed? : number,
    alphaSubtraction? : number
}
