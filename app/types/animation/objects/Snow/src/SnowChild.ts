import DrawObject from '../../../src/object/DrawObject'
import Point from '../../../src/interface/Point'
import SnowOption from './SnowOption'

interface SnowChildOption {
  turnCounter : {
      x: number,
      y: number
  },
  turnLeftRight : number,
}

export default class SnowChild extends DrawObject {
  private childTurnCounter : { x: number, y: number } = { x: 0, y: 0 }
  private parentTurnCounter : { x: number, y: number } = { x: 0, y: 0 }
  private parentTurnLeftRight : number = 1

  private size : number = 5
  private speed : number = 2
  private style : number = 0
  private radian : number = 0
  private fallSpeed : number = 2
  private reactive? : Point

  constructor (point: Array<number>, op : SnowOption, childOption: SnowChildOption) {
    super(point)
    const init: SnowOption = op || {}

    this.speed = init.speed || this.random(this.speed) + 0.5
    this.size = init.size || this.random(this.size) + 10
    this.style = init.style || this.style
    this.reactive = init.reactive
    this.fallSpeed = init.fallSpeed || this.fallSpeed

    this.parentTurnCounter.x = childOption.turnCounter.x
    this.parentTurnCounter.y = childOption.turnCounter.y
    this.parentTurnLeftRight = childOption.turnLeftRight
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
      const height :number = 15 * Math.sqrt(3)
      const width : number = 15
      ctx.save()
      ctx.translate(x / 2, y / 2)
      ctx.rotate((i * 60 + this.radian) * Math.PI / 180)
      ctx.scale(this.size / 10, this.size / 10)
      this.crystal(this.style, ctx, width, height)
      ctx.restore()
    }
    this.radian += this.speed
  }

  public move (_x: number, _y: number): void {
    if (this.childTurnCounter.y >= this.parentTurnCounter.y && this.childTurnCounter.x < this.parentTurnCounter.x) {
      this.x += this.parentTurnLeftRight
      this.childTurnCounter.x += this.fallSpeed
    } else {
      this.y += this.fallSpeed
      this.childTurnCounter.y += this.fallSpeed
    }
  }

  public destroy (): boolean {
    if (this.alpha < 0) {
      return true
    }
    return false
  }

  public event () : void {}

  private crystal (id: number, ctx: CanvasRenderingContext2D, width: number, height: number) :void {
    ctx.fillStyle = 'rgba(' + this.color + ',' + this.alpha + ')'
    ctx.strokeStyle = 'rgba(' + this.color + ',' + this.alpha + ')'
    ctx.lineWidth = 5
    switch (id) {
      case 0:
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(width, height)
        ctx.lineTo(-width, height)
        ctx.closePath()
        ctx.fill()
        ctx.beginPath()
        height = height + 10
        ctx.moveTo(width + 10 / Math.sqrt(3), height)
        ctx.lineTo(0, height)
        ctx.lineTo(-width - 10 / Math.sqrt(3), height)
        ctx.lineWidth = 3
        ctx.stroke()
        break
      default:
        ctx.beginPath()
        ctx.moveTo(0, 0)
        width = width * 0.75
        height = height * 0.75
        ctx.lineTo(width, height)
        ctx.lineTo(-width, height)
        ctx.closePath()
        ctx.fill()
        break
    }
  }
}
