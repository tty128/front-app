import DrawObject from '../src/object/DrawObject'

export default class Test extends DrawObject {
  public created (): void {}

  public paint (ctx: CanvasRenderingContext2D): void {
    ctx.beginPath()
    ctx.arc(50, 50, 200, 0, 2 * Math.PI, false)
    ctx.fill()
  }

  public move (): void {
    this.x++
    this.y++
  }

  public destroy (): boolean {
    return false
  }

  public event () : void {}
}
