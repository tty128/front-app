/* eslint-disable no-dupe-class-members */
import Rain from '../objects/Rain'
import Umbrella from '../objects/Umbrella'
import Point from '../src/interface/Point'
import AnimationLayerMain from '../src/main/AnimationLayerMain'

export default class Rainy extends AnimationLayerMain {
  private isMouseover: boolean = false
  private mouseoverColor: string = '156, 204, 101'
  private mousePoint: Point = { x: 0, y: 0 }
  private prevMousePoint: Point = { x: 0, y: 0 }
  private counter : {
    mouseOver: number,
    mouseMove: number
  } = {
    mouseOver: 0,
    mouseMove: 0
  }

  protected randomColor: string[] | null = [
    '210, 210, 210',
    '255, 255, 255',
    '156, 204, 101',
    '170, 242, 196',
    '139, 195, 74'
  ]

  private probability : { rain:number, umbrella:number } = {
    rain: 12,
    umbrella: 0.75
  }

  public eventAciton (event?: string | number, params?: Point): void {
    let x: number = 0
    let y: number = 0
    if (params) {
      x = params.x || 0
      y = params.y || 0
    }

    if (event) {
      if (event === 'click') {
        const delay = 1
        const speed = 4
        for (let i = 0; i < 20; i++) {
          const speedX = speed / 2 - this.random(speed)
          const speedY = speed / 2 - this.random(speed)
          const decelerateX = this.random(2)
          const decelerateY = this.random(2)

          this.add(3, new Rain([x, y], { speed: 2, speedDown: 7, alphaSubtraction: 20 }), { delay: delay * i }, (x: number, y :number) => {
            const nx = x + speedX * (99 + decelerateX) / 100
            const ny = y + speedY * (99 + decelerateY) / 100
            return { x: nx, y: ny }
          })
        }
      } else if (event === 'move') {
        this.counter.mouseMove++
        const speed : number = 20
        const absX : number = 60
        const absY : number = 60

        const px = x + absX / 2 - this.random(absX)
        const py = y + absY / 2 - this.random(absY)
        if (Math.abs(this.prevMousePoint.x - x) + Math.abs(this.prevMousePoint.y - y) > speed && this.counter.mouseMove % 2 === 0) {
          this.add(new Rain([px, py], { speed: 3 }))
          this.add(new Rain([px, py], { speed: 3 }), { delay: 10 })
          this.prevMousePoint = { x, y }
        }
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

  public init (): void {
    this.addLayer(1)
    this.addLayer(2)
    this.addLayer(3)
    this.add(1, new Umbrella([95, 80], { size: 66, speed: 0.1, isRatioPosition: true }), { color: '195, 217, 171', alpha: 0.8 })
  }

  public paint (_ctx : CanvasRenderingContext2D) : void {
    const accuracy = 1000

    const rainProbability : number = this.getCanvas().width / 1500 * this.probability.rain
    if (this.random(accuracy) > accuracy * (1 - (rainProbability / 100))) {
      const randX : number = this.random(this.getCanvas().width)
      const randY : number = this.random(this.getCanvas().height)
      this.add(new Rain([randX, randY]))
    }

    const umbrellaProbability : number = this.probability.umbrella
    if (this.random(accuracy) > accuracy * (1 - (umbrellaProbability / 100))) {
      const coefficient = this.random(2) !== 0 ? 1 : -1
      let randX : number
      let randY : number
      if (coefficient === -1) {
        randX = this.random(this.getCanvas().width * 1.5) + 2
        randY = this.random(500) + 2
      } else {
        randX = this.random(500) + 2
        randY = this.random(this.getCanvas().height * 1.5) + 2
      }
      const randomSpeed = this.random(3) / 2 + 1
      this.add(3, new Umbrella([randX, randY]), { useCorrection: false }, (x:number, y:number) => {
        const nx = x + randomSpeed * coefficient
        const ny = y + randomSpeed * coefficient * -1
        return { x: nx, y: ny }
      })
    }

    if (this.isMouseover && this.counter.mouseOver++ > 40) {
      const op = { speed: 2, lineWidth: 15, random: false }
      this.add(3, new Rain([this.mousePoint.x!, this.mousePoint.y!], op), { color: this.mouseoverColor })
      this.counter.mouseOver = 0
    }
  }
}
