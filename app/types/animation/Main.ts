import Manager from './Manager'
import Rain from './object/Rain'

export default class MainCanvas {
  private canvas : HTMLCanvasElement
  private ctx : CanvasRenderingContext2D | null = null
  private manager : Manager
  private frequency : number = 25

  constructor (canvas : HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.manager = new Manager()
  }

  public clickEvent (x : number, y : number) : void {
    if (this.ctx) {
      this.manager.add(new Rain(this.canvas, this.ctx, x, y))
      this.manager.add(new Rain(this.canvas, this.ctx, x, y), 5)
      this.manager.add(new Rain(this.canvas, this.ctx, x, y), 10)
    }
  }

  public moveEvent (x : number, y : number) : void {
    if (this.ctx) {
      this.manager.add(new Rain(this.canvas, this.ctx, x, y))
      this.manager.add(new Rain(this.canvas, this.ctx, x, y), 10)
    }
  }

  public view () : void {
    const rand : number = Math.floor(Math.random() * 1000)
    if (this.ctx) {
      if (rand > 1000 * (1 - (this.frequency / 100))) {
        this.manager.add(new Rain(this.canvas, this.ctx))
      }
      if (this.manager.objectExists()) {
        this.manager.action()
      }
      if (this.manager.getActiveLength() > 50) {
        this.manager.destroy(0)
      }
    }
  }

  public start () : void {
    setInterval(() => {
      if (this.ctx) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      }
      this.view()
    }, 30)
  }
}
