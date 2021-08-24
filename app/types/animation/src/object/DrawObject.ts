/* eslint-disable no-dupe-class-members */

import Config from '../../Config'
import Point from '../interface/Point'

export default abstract class DrawObject {
  private end : boolean = false
  protected x :number = 0
  protected y : number = 0
  protected delay : number = 0
  protected color : string = Config.DRAW_OBJECT_DEFAULT_COLOR
  protected alpha : number = 1
  protected trigger : boolean = false
  protected injectMove : ((x: number, y :number) => Point | void) = this.move
  protected useCorrection : boolean = true

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
  public action (ctx : CanvasRenderingContext2D, correctionX: number, correctionY:number) : boolean {
    const relativeX : number = this.x + (this.useCorrection ? correctionX : 0)
    const relativeY : number = this.y + (this.useCorrection ? correctionY : 0)
    this.paint(ctx, relativeX, relativeY)
    const point = this.injectMove(this.x, this.y)
    if (typeof point === 'object') {
      this.x = (point.x || this.x)
      this.y = (point.y || this.y)
    }
    return this.trigger
  }

  public abstract paint(ctx : CanvasRenderingContext2D, positionX :number, positionY:number) : void
  public abstract move (x: number, y :number) : void
  public abstract destroy (ctx: CanvasRenderingContext2D) : boolean
  public abstract event () : void

  public setUseCorrection (bool : boolean) : void {
    this.useCorrection = bool
  }

  public setMove (move :(x: number, y :number) => Point) : void {
    this.injectMove = move
  }

  public getTrigger () :boolean {
    return this.trigger
  }

  public setTrigger (bool :boolean) :void {
    this.trigger = bool
  }

  public getAlpha () :number {
    return this.alpha
  }

  public setAlpha (alpha :number) {
    this.alpha = alpha
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

  protected random (array : Array<any>) : number
  protected random (max : number) : number
  protected random (max : number, min :number) : number
  protected random (val1 : number | Array<any>, min? :number) : number {
    if (Array.isArray(val1)) {
      return Math.floor(Math.random() * val1.length)
    } else {
      return Math.floor(Math.random() * val1) + (min || 0)
    }
  }
}
