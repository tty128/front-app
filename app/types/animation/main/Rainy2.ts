import Rain from '../object/Rain'
import Test from '../object/Test'
import EventParams from '../src/interface/EventParams'
import AnimationLayerMain from '../src/main/AnimationLayerMain'

export default class Rainy extends AnimationLayerMain {
  protected randomColor: string[] | null = [
    '210, 210, 210',
    '255, 255, 255',
    '156, 204, 101',
    '170, 242, 196'
  ]

  private probability : number = 15

  public clickEvent (params : EventParams) : void {
    const x = params.x || 0
    const y = params.y || 0
    this.add(new Rain([x, y]))
    this.add(new Rain([x, y]), { delay: 5 })
    this.add(new Rain([x, y]), { delay: 10 })
  }

  public moveEvent (params : EventParams) : void {
    const x = params.x || 0
    const y = params.y || 0
    const absX : number = 60
    const absY : number = 60

    const px = x + absX / 2 - this.random(absX)
    const py = y + absY / 2 - this.random(absY)
    this.add(new Rain([px, py], { speed: 3 }))
    this.add(new Rain([px, py], { speed: 3 }), { delay: 10 })
  }

  public init (): void {
    this.addLayer(1)
  }

  private test :boolean = true

  public paint (_ctx : CanvasRenderingContext2D) : void {
    const accuracy = 1000
    const rand : number = this.random(accuracy)
    if (rand > accuracy * (1 - (this.probability / 100))) {
      const randX : number = this.random(this.getCanvas().width)
      const randY : number = this.random(this.getCanvas().height)
      this.add(new Rain([randX, randY]))
    }

    this.changeFocusLayer(1)
    if (this.test) {
      this.add(new Test())
      this.test = false
    }
  }
}
