/* eslint-disable no-dupe-class-members */
import MainAddOption from '../interface/MainAddOption'
import Point from '../interface/Point'
import Manager from '../manager/Manager'
import DrawObject from '../object/DrawObject'

export default abstract class AnimationMain {
  protected animationId : number = 0
  protected canvas : HTMLCanvasElement
  protected ctx : CanvasRenderingContext2D | null = null
  protected manager : Manager
  protected correction : Point = { x: 0, y: 0 }
  protected abstract randomColor: Array<string> | null

  constructor (canvas : HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.manager = new Manager()
  }

  public action () : void
  public action (params : Point) : void
  public action (event: string | number) : void
  public action (event: string | number, params : Point) : void
  public action (value1?: string | number | Point, params? : Point) : void {
    let event : string | number | undefined
    const pm : Point | undefined = typeof value1 === 'object' ? value1 : params || undefined
    if (typeof value1 !== 'object') {
      event = value1
    }
    this.eventAciton(event, pm)
  }

  public abstract eventAciton (event?: number | string, params?: Point) : void

  public abstract paint (ctx : CanvasRenderingContext2D) : void

  protected getCanvas () : HTMLCanvasElement {
    return this.canvas
  }

  public getCtx () : CanvasRenderingContext2D | null {
    return this.ctx
  }

  protected add (obj : DrawObject) :void
  protected add (obj : DrawObject, move :(x: number, y :number) => Point) :void
  protected add (obj : DrawObject, option : MainAddOption) :void
  protected add (obj : DrawObject, option : MainAddOption, move :(x: number, y :number) => Point) :void
  protected add (obj : DrawObject, value? : MainAddOption | ((x: number, y :number) => Point), move? :(x: number, y :number) => Point) :void {
    const op : MainAddOption = typeof value === 'object' ? value : {}
    const mv : ((x: number, y :number) => Point) | undefined = typeof value !== 'object' ? value : move
    if (this.randomColor && !op.color) {
      op.color = this.randomColor[this.random(this.randomColor)]
    }
    this.manager.add(obj, op, mv)
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

  public setCorrection (correctX: number, correctY: number) : void {
    this.correction.x = correctX
    this.correction.y = correctY
  }

  public getCorrection () : Point {
    return this.correction
  }

  public setAnimationId (id : number) : void {
    this.animationId = id
  }

  public setCanvasSizeReactive () : void {
    window.addEventListener('resize', () => {
      this.canvas.width = document.body.clientWidth + this.getCorrection().x
      this.canvas.height = window.innerHeight + this.getCorrection().y
    })
  }

  public run () : void {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.paint(this.ctx)
      if (this.manager.objectExists()) {
        this.manager.action(this.ctx, this.correction.x, this.correction.y)
      }
    }
  }

  public start () : void {
    const loop = () => {
      this.run()
      this.setAnimationId(window.requestAnimationFrame(loop))
    }
    window.requestAnimationFrame(loop)
  }

  public stop () : void {
    window.cancelAnimationFrame(this.animationId)
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
  }
}
