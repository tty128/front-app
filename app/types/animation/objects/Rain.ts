import DrawObject from '../src/object/DrawObject'

interface RainOption {
  speed? : number,
  speedDown? : number,
  lineWidth? : number,
  alpha? : number,
  random? :boolean
}

export default class Rain extends DrawObject {
  private radius : number = 0
  private alphaMax : number = 1
  private alpha : number = 12

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
      this.alpha = init.alpha ? Math.floor((Math.random() * (init.alpha))) + 10 : this.alpha
    } else {
      this.speed = init.speed || this.speed
      this.speedDown = init.speedDown || this.speedDown
      this.lineWidth = init.lineWidth || this.lineWidth
      this.alpha = init.alpha || this.alpha
    }
  }

  public created (): void {}

  public paint (ctx: CanvasRenderingContext2D, positionX :number, positionY:number): void {
    const x = positionX
    const y = positionY
    ctx.beginPath()
    ctx.arc(x, y, this.radius, 0, 2 * Math.PI, false)
    ctx.lineWidth = this.lineWidth
    ctx.strokeStyle = 'rgba(' + this.color + ',' + this.alphaMax + ')'
    ctx.stroke()
    this.radius += this.speed
    this.lineWidth = this.lineWidth - (this.lineWidth / 80)
    this.alphaMax -= this.alpha / 1000
    this.speed = this.speed / ((100 + this.speedDown) / 100)
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
