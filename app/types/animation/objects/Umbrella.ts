import Point from '../src/interface/Point'
import DrawObject from '../src/object/DrawObject'

interface UmbrellaOption {
  size? : number,
  speed? : number,
  color? : string,
  alpha? : number,
  reactive?: Point
}

export default class Umbrella extends DrawObject {
  private alpha : number = 0.9

  private size : number = 5
  private speed : number = 2
  private radian : number = 0
  private reactive? : Point

  constructor (point: Array<number>)
  constructor (point: Array<number>, op : UmbrellaOption)
  constructor (point: Array<number>, op? : UmbrellaOption) {
    super(point)
    const init :UmbrellaOption = op || {}

    this.reactive = init.reactive

    this.speed = init.speed || this.random(this.speed) + 0.5
    this.size = init.size || this.random(this.size) + 10
    this.color = init.color || this.color
    this.alpha = init.alpha || this.alpha
  }

  public created (): void {}

  public paint (ctx: CanvasRenderingContext2D): void {
    let x = this.x || 0
    let y = this.y || 0
    if (this.reactive) {
      x = document.body.clientWidth * (this.reactive.x || 50) * 2 / 100
      y = document.body.clientHeight * (this.reactive.y || 50) * 2 / 100
    }

    for (let i = 0; i < 6; i++) {
      ctx.save()
      ctx.translate(x / 2, y / 2)
      ctx.rotate((i * 60 + this.radian) * Math.PI / 180)
      ctx.beginPath()
      ctx.scale(this.size / 10, this.size / 10)
      ctx.arc(0, 300, 300 * Math.cos(30 * Math.PI / 180), 265.3 * Math.PI / 180, 274.7 * Math.PI / 180, false)
      ctx.fillStyle = 'rgba(' + this.color + ',' + this.alpha + ')'
      ctx.lineTo(0, 4)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }
    this.radian += this.speed
  }

  public move (): void {}

  public destroy (): boolean {
    if (this.alpha < 0) {
      return true
    }
    return false
  }

  public event () : void {}
}
