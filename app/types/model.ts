export default interface Model{
    ModelId : number
    ModelObj : object | null

    getModelId () : number
    getModelObj () : object | null
}
