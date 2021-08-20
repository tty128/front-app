/* eslint-disable no-dupe-class-members */

import Config from '../../Config'
import Point from '../interface/Point'

export default abstract class DrawObject {
  private end : boolean = false
  protected x :number = 0
  protected y : number = 0
  protected delay : number = 0
  protected color : string = Config.DRAW_OBJECT_DEFAULT_COLOR
  protected trigger : boolean = false
  protected injectMove : ((x: number, y :number) => Point | void) = this.move

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
    const point = this.injectMove(this.x, this.y)
    if (typeof point === 'object') {
      this.x = point.x || this.x
      this.y = point.y || this.y
    }
    return this.trigger
  }

  public abstract paint(ctx : CanvasRenderingContext2D) : void
  public abstract move (x: number, y :number) : void
  public abstract destroy () : boolean
  public abstract event () : void

  public setMove (move :(x: number, y :number) => Point) : void {
    this.injectMove = move
  }

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

  protected arcFillAntiAlias (ctx: CanvasRenderingContext2D, antiAliasOption : { strength :number, color?: string, alpha? :number }, x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean) : void {
    const span = 2
    const alpha : number = antiAliasOption.alpha || 1
    const color : string = antiAliasOption.color || '0,0,0'
    const strength : number = antiAliasOption.strength
    const splitAlpha : number = alpha / strength
    for (let i = 0; i < strength; i++) {
      ctx.arc(x - ((span / 2) * i), y - ((span / 2) * i), radius - (span * i), startAngle, endAngle, counterclockwise)
      ctx.fillStyle = 'rgba(' + color + ',' + (splitAlpha * (i + 1)) + ')'
    }
  }

  protected arcStrokeAntiAlias (ctx: CanvasRenderingContext2D, antiAliasOption: { strength: number, lineWidth?: number, color?: string, alpha?: number }, x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean) : void {
    const alpha : number = antiAliasOption.alpha || 1
    const color : string = antiAliasOption.color || '0,0,0'
    const strength : number = antiAliasOption.strength
    const lineWidth : number = antiAliasOption.lineWidth || 1
    const splitAlpha : number = alpha / strength
    for (let i = 0; i < strength; i++) {
      ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise)
      ctx.lineWidth = lineWidth / strength
      ctx.strokeStyle = 'rgba(' + color + ',' + (splitAlpha * (i + 1)) + ')'
    }
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
