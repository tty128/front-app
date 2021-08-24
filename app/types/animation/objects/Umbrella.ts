import DrawObject from '../src/object/DrawObject'

interface UmbrellaOption {
  size? : number,
  speed? : number,
  isRatioPosition?: boolean,
  translatePosition? : { x: number, y: number } | [number, number]
}

export default class Umbrella extends DrawObject {
  private size : number = 5
  private speed : number = 5
  private radian : number = 0
  private isRatioPosition? : boolean = false
  private translatePosition : { x: number, y: number} = { x: 50, y: 50 }

  constructor (point: Array<number>)
  constructor (point: Array<number>, op : UmbrellaOption)
  constructor (point: Array<number>, op? : UmbrellaOption) {
    super(point)
    const init :UmbrellaOption = op || {}

    if (init.translatePosition) {
      if (Array.isArray(init.translatePosition)) {
        this.translatePosition = {
          x: init.translatePosition[0],
          y: init.translatePosition[1]
        }
      } else {
        this.translatePosition = init.translatePosition
      }
    }

    this.isRatioPosition = 'isRatioPosition' in init ? init.isRatioPosition : this.isRatioPosition
    this.speed = init.speed || this.random(this.speed) - 1.5
    this.size = init.size || this.random(this.size) + 10
  }

  public created (): void {}

  public paint (ctx: CanvasRenderingContext2D, positionX :number, positionY:number): void {
    let x = positionX
    let y = positionY
    if (this.isRatioPosition) {
      x = (x - this.x) + window.innerWidth * (this.x || 50) / 100
      y = (y - this.y) + window.innerHeight * (this.y || 50) / 100
    }

    for (let i = 0; i < 6; i++) {
      ctx.save()
      ctx.translate((x - this.x) + this.x / (100 / this.translatePosition.x), (y - this.y) + this.y / (100 / this.translatePosition.y))
      ctx.rotate((i * 60 + this.radian) * Math.PI / 180)
      ctx.beginPath()
      ctx.scale(this.size / 10, this.size / 10)
      ctx.arc(0, 300, 300 * Math.cos(30 * Math.PI / 180), 265.3 * Math.PI / 180, 274.7 * Math.PI / 180, false)
      ctx.fillStyle = 'rgba(' + this.getColor() + ',' + this.getAlpha() + ')'
      ctx.lineTo(0, 4)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }
    this.radian += this.speed
  }

  public move (): void {}

  public destroy (_ctx: CanvasRenderingContext2D): boolean {
    if (this.x <= 1 || this.y <= 1) {
      return true
    }
    return false
  }

  public event () : void {}
}
