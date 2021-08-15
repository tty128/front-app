import Rain from '../object/Rain'
import AnimationMain from '../src/AnimationMain'
import EventParams from '../src/interface/EventParams'

export default class Rainy extends AnimationMain {
  protected randomColor: string[] | null = [
    '210, 210, 210',
    '255, 255, 255',
    '156, 204, 101',
    '170, 242, 196'
  ]

  private frequency : number = 15

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

  public paint (_ctx : CanvasRenderingContext2D) : void {
    const accuracy = 1000
    const rand : number = this.random(accuracy)
    if (rand > accuracy * (1 - (this.frequency / 100))) {
      const randX : number = this.random(this.getCanvas().width)
      const randY : number = this.random(this.getCanvas().height)
      this.add(new Rain([randX, randY]))
    }
  }
}
