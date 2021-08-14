export default abstract class DrawObject {
  protected canvas : HTMLCanvasElement
  protected ctx : CanvasRenderingContext2D
  private end : boolean = false
  protected x :number | undefined
  protected y : number | undefined
  protected delay : number = 0

  constructor (canvas : HTMLCanvasElement, ctx : CanvasRenderingContext2D, x? :number, y? :number) {
    this.ctx = ctx
    this.canvas = canvas
    this.init()
    if (x) { this.x = x }
    if (y) { this.y = y }
    this.created()
  }

  public abstract init () : void
  public abstract created () : void
  public abstract action () : boolean
  public abstract destroy () : boolean
  public abstract event () : void

  public getDelay () :number {
    return this.delay
  }

  public setDelay (delay :number) {
    this.delay = delay
  }

  public kill () : void {
    this.end = true
  }

  public isEnd () : boolean {
    return this.end
  }
}
