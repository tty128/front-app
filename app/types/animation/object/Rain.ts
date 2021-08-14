import AnimationConfig from '../AnimationConfig'
import DrawObject from './DrawObject'

export default class Rain extends DrawObject {
  private radius : number = 0
  private alpha : number = 1
  private speed : number = 6
  private speedDown : number = 3
  private lineWidth : number = 1
  private color : string = ''

  constructor (canvas : HTMLCanvasElement, ctx : CanvasRenderingContext2D, x? :number, y? :number) {
    super(canvas, ctx, x, y)
    const { color } = new AnimationConfig()
    this.speed = Math.floor(Math.random() * 5) + 1
    this.speedDown = Math.floor(Math.random() * 3) + 1
    this.lineWidth = Math.floor((Math.random() * 10)) + 1
    const c = color
    this.color = c[Math.floor(Math.random() * c.length)]
  }

  public init (): void {
    this.x = Math.floor(Math.random() * this.canvas.width)
    this.y = Math.floor(Math.random() * this.canvas.height)
  }

  public created (): void {}

  public action (): boolean {
    const x = this.x || 0
    const y = this.y || 0
    this.ctx.beginPath()
    this.ctx.arc(x, y, this.radius, 0, 2 * Math.PI, false)
    this.ctx.lineWidth = this.lineWidth
    this.ctx.strokeStyle = 'rgba(' + this.color + ',' + this.alpha + ')'
    this.ctx.stroke()
    this.radius += this.speed
    this.lineWidth = this.lineWidth - (this.lineWidth / 80)
    this.alpha -= 0.012
    this.speed = this.speed / ((101 + this.speedDown) / 100)

    return false
  }

  public destroy (): boolean {
    if (this.alpha < 0) {
      return true
    }
    return false
  }

  public event () : void {}
}
