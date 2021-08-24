import DrawObject from '../src/object/DrawObject'

interface FootprintsOption {
  size? : number,
  isLeft? : boolean,
  isDouble? : boolean,
  alphaSubtraction? : number,
  degree?: number
}

export default class Footprints extends DrawObject {
  private size : number = 5
  private isLeft : boolean = true
  private isDouble : boolean = false
  private alphaSubtraction: number = 12
  private degree: number = 0

  constructor (point: Array<number>)
  constructor (point: Array<number>, op : FootprintsOption)
  constructor (point: Array<number>, op? : FootprintsOption) {
    super(point)
    const init :FootprintsOption = op || {}

    this.size = init.size || this.size
    this.isLeft = typeof init.isLeft === 'boolean' ? init.isLeft : this.isLeft
    this.isDouble = typeof init.isDouble === 'boolean' ? init.isDouble : this.isDouble
    this.alphaSubtraction = init.alphaSubtraction || this.alphaSubtraction
    this.degree = init.degree || this.degree
  }

  public created (): void {}

  public paint (ctx: CanvasRenderingContext2D, positionX :number, positionY:number): void {
    const x = positionX
    const y = positionY
    const direction : number = this.isLeft ? -1 : 1
    const alpha : number = this.getAlpha()
    ctx.fillStyle = 'rgba(' + this.getColor() + ',' + alpha + ')'
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate((Math.PI / 180) * (this.degree - 90))
    ctx.scale(this.size / 100 * direction, this.size / 100)
    ctx.fill(new Path2D('M191.4,164.127c29.081-9.964,44.587-41.618,34.622-70.699c-9.952-29.072-41.6-44.592-70.686-34.626c-29.082,9.956-44.588,41.608-34.632,70.69C130.665,158.582,162.314,174.075,191.4,164.127z'))
    ctx.fill(new Path2D('M102.394,250.767v0.01c16.706-25.815,9.316-60.286-16.484-76.986c-25.81-16.691-60.273-9.316-76.978,16.489v0.01c-16.695,25.805-9.306,60.268,16.495,76.958C51.236,283.957,85.694,276.573,102.394,250.767z'))
    ctx.fill(new Path2D('M320.6,164.127c29.086,9.948,60.734-5.545,70.695-34.636c9.956-29.081-5.55-60.734-34.631-70.69c-29.086-9.966-60.734,5.555-70.686,34.626C276.013,122.509,291.519,154.163,320.6,164.127z'))
    ctx.fill(new Path2D('M256,191.489c-87.976,0-185.048,121.816-156.946,208.493c27.132,83.684,111.901,49.195,156.946,49.195c45.045,0,129.813,34.489,156.945-49.195C441.048,313.305,343.976,191.489,256,191.489z'))
    ctx.fill(new Path2D('M503.068,190.289v-0.01c-16.705-25.805-51.166-33.18-76.976-16.489c-25.801,16.7-33.19,51.171-16.486,76.986v-0.01c16.7,25.806,51.158,33.19,76.968,16.481C512.374,250.557,519.764,216.095,503.068,190.289z'))
    ctx.restore()
    this.setAlpha(alpha - this.alphaSubtraction / 1000)
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
