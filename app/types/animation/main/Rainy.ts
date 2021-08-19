/* eslint-disable no-dupe-class-members */
import Rain from '../objects/Rain'
import Point from '../src/interface/Point'
import AnimationLayerMain from '../src/main/AnimationLayerMain'

export default class Rainy extends AnimationLayerMain {
  private isMouseover : boolean = false
  private mouseoverColor : string = '156, 204, 101'
  private mousePoint : Point = { x: 0, y: 0 }
  private counter : number = 0
  protected randomColor: string[] | null = [
    '210, 210, 210',
    '255, 255, 255',
    '156, 204, 101',
    '170, 242, 196'
  ]

  private probability : number = 12

  public eventAciton (event?: string | number, params?: Point): void {
    let x : number = 0
    let y : number = 0
    if (params) {
      x = params.x || 0
      y = params.y || 0
    }

    if (event) {
      if (event === 'click') {
        const d = 1
        const ax = 4
        const ay = 4
        for (let i = 0; i < 20; i++) {
          const rx = ax / 2 - this.random(ax)
          const ry = ay / 2 - this.random(ay)
          const arx = this.random(2)
          const ary = this.random(2)

          this.add(new Rain([x, y], { speed: 2, speedDown: 7, alpha: 20 }), { delay: d * i }, (x: number, y :number) => {
            const nx = x + rx * (99 + arx) / 100
            const ny = y + ry * (99 + ary) / 100
            return { x: nx, y: ny }
          })
        }
      } else if (event === 'move') {
        const absX : number = 60
        const absY : number = 60

        const px = x + absX / 2 - this.random(absX)
        const py = y + absY / 2 - this.random(absY)
        this.add(new Rain([px, py], { speed: 3 }))
        this.add(new Rain([px, py], { speed: 3 }), { delay: 10 })
      } else if (event === 'navigation' || event === 'pagination') {
        this.mousePoint = { x, y }
        this.mouseoverColor = '156, 204, 101'
        this.isMouseover = true
      } else if (event === 'mouseout') {
        this.isMouseover = false
      } else if (event === 'pagination--current') {
        this.mousePoint = { x, y }
        this.mouseoverColor = '255, 138, 101'
        this.isMouseover = true
      } else if (event === 'navigation--current') {
        this.mousePoint = { x, y }
        this.mouseoverColor = '255, 255, 255'
        this.isMouseover = true
      }
    }
  }

  public init (): void {}

  public paint (_ctx : CanvasRenderingContext2D) : void {
    const prob : number = this.getCanvas().width / 1500 * this.probability
    const accuracy = 1000
    const rand : number = this.random(accuracy)
    if (rand > accuracy * (1 - (prob / 100))) {
      const randX : number = this.random(this.getCanvas().width)
      const randY : number = this.random(this.getCanvas().height)
      this.add(new Rain([randX, randY]))
    }

    if (this.isMouseover && this.counter++ > 40) {
      const op = { speed: 2, lineWidth: 15, random: false }
      this.add(new Rain([this.mousePoint.x!, this.mousePoint.y!], op), { color: this.mouseoverColor })
      this.counter = 0
    }
  }
}
