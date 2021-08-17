/* eslint-disable no-dupe-class-members */
import EventParams from '../interface/EventParams'
import MainAddOption from '../interface/MainAddOption'
import Manager from '../Manager'
import DrawObject from '../object/DrawObject'

export default abstract class AnimationMain {
  protected canvas : HTMLCanvasElement
  protected ctx : CanvasRenderingContext2D | null = null
  protected manager : Manager
  protected abstract randomColor: Array<string> | null

  constructor (canvas : HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.manager = new Manager()
  }

  public abstract clickEvent (params : EventParams) : void

  public abstract moveEvent (params : EventParams) : void

  public abstract paint (ctx : CanvasRenderingContext2D) : void

  protected getCanvas () : HTMLCanvasElement {
    return this.canvas
  }

  protected add (obj : DrawObject, option? : MainAddOption) :void {
    const op : MainAddOption = option || {}
    if (this.randomColor && !op.color) {
      op.color = this.randomColor[this.random(this.randomColor)]
    }
    this.manager.add(obj, op)
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

  public start () : void {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.paint(this.ctx)
      if (this.manager.objectExists()) {
        this.manager.action(this.ctx)
      }
    }
  }
}
