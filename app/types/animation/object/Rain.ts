import DrawObject from '../src/object/DrawObject'

interface RainOption {
  speed? : number,
  speedDown? : number,
  lineWidth? : number,
  color? : string
}

export default class Rain extends DrawObject {
  private radius : number = 0
  private alpha : number = 1

  private speed : number = 5
  private speedDown : number = 5
  private lineWidth : number = 10

  constructor (point: Array<number>)
  constructor (point: Array<number>, op : RainOption)
  constructor (point: Array<number>, op? : RainOption) {
    super(point)
    const init :RainOption = op || {}

    this.speed = Math.floor(Math.random() * (init.speed || this.speed)) + 1
    this.speedDown = Math.floor(Math.random() * (init.speedDown || this.speedDown)) + 2
    this.lineWidth = Math.floor((Math.random() * (init.lineWidth || this.lineWidth))) + 1
    this.color = init.color || this.color
  }

  public created (): void {}

  public action (ctx : CanvasRenderingContext2D): boolean {
    const x = this.x || 0
    const y = this.y || 0
    ctx.beginPath()
    ctx.arc(x, y, this.radius, 0, 2 * Math.PI, false)
    ctx.lineWidth = this.lineWidth
    ctx.strokeStyle = 'rgba(' + this.color + ',' + this.alpha + ')'
    ctx.stroke()
    this.radius += this.speed
    this.lineWidth = this.lineWidth - (this.lineWidth / 80)
    this.alpha -= 0.012
    this.speed = this.speed / ((100 + this.speedDown) / 100)

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
