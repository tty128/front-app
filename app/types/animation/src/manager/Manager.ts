import Config from '../../Config'
import MainAddOption from '../interface/MainAddOption'
import Point from '../interface/Point'
import DrawObject from '../object/DrawObject'

export default class Manager {
  private exec : Array<DrawObject> = []
  private actionIndex : Array<number> = []
  private destroyIndex : Array<number> = []
  private limit :number = Config.MANAGER_OBJECTS_LIMIT

  public objectExists () : boolean {
    return this.exec.length > 0
  }

  public getActiveLength () : number {
    return this.exec.length
  }

  public action (ctx : CanvasRenderingContext2D, correctionX: number, correctionY: number) : void {
    this.destroyIndex = []
    this.actionIndex = []
    this.exec.forEach((obj : DrawObject, index : number) => {
      const delay = obj.getDelay()
      if (delay <= 0) {
        if (obj.action(ctx, correctionX, correctionY)) { this.actionIndex.push(index) }
        this.actionIndex.forEach((i : number) => { this.event(i) })
        if (obj.destroy(ctx)) { this.destroyIndex.push(index) }
      } else {
        obj.setDelay(delay - 1)
      }
    })
    for (let i = this.destroyIndex.length - 1; i >= 0; i--) {
      this.destroy(this.destroyIndex[i])
    }
    if (this.exec.length > this.limit) {
      for (let i = 0; i < this.exec.length - this.limit; i++) {
        this.destroy(0)
      }
    }
  }

  public getActionIndex () : Array<number> {
    return this.actionIndex
  }

  public getDestroyIndex () :Array<number> {
    return this.destroyIndex
  }

  public setLimit (limit : number) : void {
    this.limit = limit
  }

  public add (obj : DrawObject, option : MainAddOption, move? : (x: number, y :number) => Point) : void {
    obj.setDelay(option.delay || 0)
    obj.setColor(option.color)
    obj.setUseCorrection(typeof option.useCorrection === 'boolean' ? option.useCorrection : true)
    if (move) {
      obj.setMove(move)
    }
    obj.created()
    this.exec.push(obj)
  }

  public destroy (index : number) : void {
    this.exec.splice(index, 1)
  }

  public event (index : number) : void {
    this.exec[index].event()
  }
}
