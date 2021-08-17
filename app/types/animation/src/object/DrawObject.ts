import Config from '../../Config'

export default abstract class DrawObject {
  private end : boolean = false
  protected x :number = 0
  protected y : number = 0
  protected delay : number = 0
  protected color : string = Config.DRAW_OBJECT_DEFAULT_COLOR
  protected trigger : boolean = false

  constructor ()
  constructor (x : Array<number>)
  constructor (x : number)
  constructor (x : number, y : number)
  constructor (val1? :number | Array<number>, val2? :number) {
    if (Array.isArray(val1)) {
      if (val1.length >= 2) {
        this.x = val1[0]
        this.y = val1[1]
      } else {
        this.x = this.y = val1[0]
      }
    } else if (typeof val1 === 'number') {
      if (val2) {
        this.x = val1
        this.y = val2
      } else {
        this.x = this.y = val1
      }
    }
  }

  public abstract created () : void
  public action (ctx : CanvasRenderingContext2D) : boolean {
    this.paint(ctx)
    this.move()
    return this.trigger
  }

  public abstract paint(ctx : CanvasRenderingContext2D) : void
  public abstract move() : void
  public abstract destroy () : boolean
  public abstract event () : void

  public getTrigger () :boolean {
    return this.trigger
  }

  public setTrigger (bool :boolean) :void {
    this.trigger = bool
  }

  public getDelay () :number {
    return this.delay
  }

  public setDelay (delay :number) {
    this.delay = delay
  }

  public getColor () :string {
    return this.color
  }

  public setColor (color? : string) {
    if (color && color !== '') {
      this.color = color || this.color
    }
  }

  public kill () : void {
    this.end = true
  }

  public isEnd () : boolean {
    return this.end
  }
}
