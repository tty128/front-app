import DrawObject from '../../src/object/DrawObject'
import SnowChild from './src/SnowChild'
import SnowOption from './src/SnowOption'

export default class Snow extends DrawObject {
  private SnowChildren : Array<SnowChild> = []
  private turn : {
    hook: boolean,
    save: boolean,
    leftRight: number,
  } = {
    hook: true,
    save: false,
    leftRight: 0
  }

  private turnCounter : {
    hook: { x:number, y:number },
    counter: { x:number, y:number }
  } = {
    hook: { x: 0, y: 0 },
    counter: { x: 0, y: 0 }
  }

  private size : number = 3
  private maxSize : number = 3
  private speed : number = 3
  private style : number = 4
  private radian : number = 0
  private fallSpeed : number = 2
  private childSpan : number = 80
  private childQuantity : number = 3
  private alphaSubtraction : number = 0

  constructor (point: Array<number>)
  constructor (point: Array<number>, op : SnowOption)
  constructor (point: Array<number>, op? : SnowOption) {
    super(point)
    const init: SnowOption = op || {}
    const childInit: SnowOption = {}

    this.speed = childInit.speed = init.speed || this.random(this.speed) + 2
    this.size = childInit.size = init.size || this.random(init.maxSize || this.maxSize) + 2
    this.style = init.style || this.random(this.style)
    this.fallSpeed = childInit.fallSpeed = init.fallSpeed || this.fallSpeed
    this.alphaSubtraction = init.alphaSubtraction ? Math.floor((Math.random() * (init.alphaSubtraction))) + 10 : this.alphaSubtraction

    this.childSpan = (init.childSpan || this.childSpan) * this.size / 2
    this.childQuantity = init.childQuantity || this.childQuantity
    const randChildQuantity : number = this.random(this.childQuantity + 2) - 2

    this.turn.leftRight = this.random(2) === 0 ? -this.fallSpeed : this.fallSpeed
    this.turnCounter.hook.x = randChildQuantity <= 0 ? -1 : this.random(window.innerWidth / 2) + 100
    this.turnCounter.hook.y = randChildQuantity <= 0 ? -1 : this.random(window.innerHeight) + 250

    for (let i = 0; i < randChildQuantity; i++) {
      childInit.style = i
      this.SnowChildren.push(new SnowChild([this.x, this.y], childInit, {
        turnCounter: {
          x: this.turnCounter.hook.x,
          y: this.turnCounter.hook.y
        },
        turnLeftRight: this.turn.leftRight
      }))
    }
  }

  public created (): void {
    this.SnowChildren.forEach((child: SnowChild) => {
      child.setColor(this.getColor())
      child.setAlpha(this.getAlpha())
    })
  }

  public paint (ctx: CanvasRenderingContext2D, positionX :number, positionY:number): void {
    const x = positionX
    const y = positionY

    const alpha = this.getAlpha()

    for (let i = 0; i < 6; i++) {
      const height :number = 15 * Math.sqrt(3)
      const width : number = 15
      ctx.save()
      ctx.translate((x - this.x) + this.x / 2, (y - this.y) + this.y / 2)
      ctx.rotate((i * 60 + this.radian) * Math.PI / 180)
      ctx.scale(this.size / 10, this.size / 10)
      ctx.fillStyle = 'rgba(' + this.getColor() + ',' + this.getAlpha() + ')'
      ctx.strokeStyle = 'rgba(' + this.getColor() + ',' + this.getAlpha() + ')'
      ctx.lineWidth = 5
      this.crystal(this.style, ctx, width, height)
      ctx.restore()
    }
    this.radian += this.speed

    this.SnowChildren.forEach((child: SnowChild, index: number) => {
      if (Math.abs(this.turnCounter.counter.x) + Math.abs(this.turnCounter.counter.y) > this.childSpan * (index + 1)) {
        child.paint(ctx, x - this.x, y - this.y)
      }
    })

    this.setAlpha(alpha - this.alphaSubtraction / 1000)
  }

  public move (x: number, y: number): void {
    if (this.turnCounter.counter.y >= this.turnCounter.hook.y && this.turnCounter.counter.x < this.turnCounter.hook.x) {
      this.x += this.turn.leftRight
      this.turnCounter.counter.x += this.fallSpeed
    } else {
      this.y += this.fallSpeed
      this.turnCounter.counter.y += this.fallSpeed
    }

    this.SnowChildren.forEach((child: SnowChild, index: number) => {
      if (Math.abs(this.turnCounter.counter.x) + Math.abs(this.turnCounter.counter.y) > this.childSpan * (index + 1)) {
        child.move(x, y)
      }
    })
  }

  public destroy (_ctx: CanvasRenderingContext2D): boolean {
    if (this.y > window.innerHeight * 2 + 200 || this.getAlpha() < 0) {
      return true
    }
    return false
  }

  public event () : void {}

  private crystal (id: number, ctx: CanvasRenderingContext2D, width: number, height: number) :void {
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
        ctx.rotate(30 * Math.PI / 180)
        ctx.beginPath()
        ctx.moveTo(0, height + 5)
        ctx.lineTo(12, height + 15)
        ctx.lineTo(12, height + 30)
        ctx.lineTo(0, height + 45)
        ctx.lineTo(-12, height + 30)
        ctx.lineTo(-12, height + 15)
        ctx.closePath()
        ctx.fill()
        break
      case 1:
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(width, height)
        ctx.lineTo(-width, height)
        ctx.closePath()
        ctx.fill()
        ctx.rotate(30 * Math.PI / 180)
        ctx.beginPath()
        width = width + 10
        ctx.moveTo(0, height)
        ctx.lineTo(width, height + 15)
        ctx.lineTo(width, height + 30)
        ctx.lineTo(0, height + 45)
        ctx.lineTo(-width, height + 30)
        ctx.lineTo(-width, height + 15)
        ctx.closePath()
        ctx.fill()
        break
      case 2:
        ctx.beginPath()
        ctx.moveTo(width, height)
        ctx.lineTo(-width, height)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(width / 2, height / 2)
        ctx.lineTo(-width / 2, height / 2)
        ctx.stroke()
        ctx.rotate(30 * Math.PI / 180)
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, height + 45)
        ctx.stroke()
        width = width + 10
        ctx.beginPath()
        ctx.moveTo(width / 2, height + 17.5)
        ctx.lineTo(0, height + 10)
        ctx.lineTo(-width / 2, height + 17.5)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(width / 2, height + 32.5)
        ctx.lineTo(0, height + 25)
        ctx.lineTo(-width / 2, height + 32.5)
        ctx.stroke()
        break
      case 3:
        ctx.lineWidth = 8
        ctx.beginPath()
        ctx.rotate(30 * Math.PI / 180)
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, height + 45)
        ctx.stroke()
        width = width + 10
        ctx.beginPath()
        ctx.moveTo(width * 0.75, height + 17.5)
        ctx.lineTo(0, height + 10)
        ctx.lineTo(-width * 0.75, height + 17.5)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(width / 2, height + 32.5)
        ctx.lineTo(0, height + 25)
        ctx.lineTo(-width / 2, height + 32.5)
        ctx.stroke()
        break
    }
  }
}
