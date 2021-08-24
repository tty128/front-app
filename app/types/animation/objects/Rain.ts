import DrawObject from '../src/object/DrawObject'

interface RainOption {
  speed? : number,
  speedDown? : number,
  lineWidth? : number,
  alphaSubtraction? : number,
  random? :boolean
}

export default class Rain extends DrawObject {
  private radius : number = 0
  private alphaSubtraction: number = 12

  private speed : number = 5
  private speedDown : number = 5
  private lineWidth : number = 10
  private randomOn :boolean = true

  constructor (point: Array<number>)
  constructor (point: Array<number>, op : RainOption)
  constructor (point: Array<number>, op? : RainOption) {
    super(point)
    const init :RainOption = op || {}
    const rand : boolean = typeof init.random === 'undefined' ? this.randomOn : init.random
    if (rand) {
      this.speed = Math.floor(Math.random() * (init.speed || this.speed)) + 1
      this.speedDown = Math.floor(Math.random() * (init.speedDown || this.speedDown)) + 2
      this.lineWidth = Math.floor((Math.random() * (init.lineWidth || this.lineWidth))) + 1
      this.alphaSubtraction = init.alphaSubtraction ? Math.floor((Math.random() * (init.alphaSubtraction))) + 10 : this.alphaSubtraction
    } else {
      this.speed = init.speed || this.speed
      this.speedDown = init.speedDown || this.speedDown
      this.lineWidth = init.lineWidth || this.lineWidth
      this.alphaSubtraction = init.alphaSubtraction || this.alphaSubtraction
    }
  }

  public created (): void {}

  public paint (ctx: CanvasRenderingContext2D, positionX :number, positionY:number): void {
    const x = positionX
    const y = positionY
    const alpha : number = this.getAlpha()
    ctx.beginPath()
    ctx.arc(x, y, this.radius, 0, 2 * Math.PI, false)
    ctx.lineWidth = this.lineWidth
    ctx.strokeStyle = 'rgba(' + this.color + ',' + alpha + ')'
    ctx.stroke()
    this.radius += this.speed
    this.lineWidth = this.lineWidth - (this.lineWidth / 80)
    this.setAlpha(alpha - this.alphaSubtraction / 1000)
    this.speed = this.speed / ((100 + this.speedDown) / 100)
  }

  public move (): void {}

  public destroy (): boolean {
    if (this.getAlpha() < 0) {
      return true
    }
    return false
  }

  public event () : void {}
}
