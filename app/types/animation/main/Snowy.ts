/* eslint-disable no-dupe-class-members */
import Footprints from '../objects/Footprints'
import Rain from '../objects/Rain'
import Snow from '../objects/Snow/Snow'
import Point from '../src/interface/Point'
import AnimationLayerMain from '../src/main/AnimationLayerMain'

export default class Rainy extends AnimationLayerMain {
  private isMouseover : boolean = false
  private mouseoverColor : string = '156, 204, 101'
  private mousePoint : Point = { x: 0, y: 0 }
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

  private probability : { snow:number, umbrella:number } = {
    snow: 0.75,
    umbrella: 0.75
  }

  public eventAciton (event?: string | number, params?: Point): void {
    let x : number = 0
    let y : number = 0
    if (params) {
      x = params.x || 0
      y = params.y || 0
    }

    if (event) {
      if (event === 'click') {
        const speed = 6
        const diffusion : number = 80
        for (let i = 0; i < 20; i++) {
          const speedX = speed / 2 - this.random(speed)
          const speedY = speed / 2 - this.random(speed)
          const decelerateX = this.random(2)
          const decelerateY = this.random(2)
          const directionX : number = speedX > 0 ? 1 : -1
          const directionY : number = speedY > 0 ? 1 : -1

          this.add(3, new Snow([x * 2 + this.random(diffusion) * directionX, y * 2 + this.random(diffusion) * directionY], { maxSize: 2, speed: 4, alphaSubtraction: 40, childQuantity: 0 }), (x: number, y :number) => {
            const nx = x + speedX * (99 + decelerateX) / 100
            const ny = y + speedY * (99 + decelerateY) / 100
            return { x: nx, y: ny }
          })
        }
      } else if (event === 'move') {
        const speed : number = 50

        if (Math.abs(this.prevMousePoint.x - x) + Math.abs(this.prevMousePoint.y - y) > speed) {
          const isLeft : boolean = this.counter.mouseMove % 2 === 0
          const deg : number = 180 / Math.PI * Math.atan2(this.prevMousePoint.y - y, this.prevMousePoint.x - x)
          this.add(0, new Footprints([x, y], { isLeft, degree: deg }), { alpha: 0.5 })
          this.counter.mouseMove++
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
    this.addLayer(0)
    this.addLayer(1)
    this.addLayer(2)
    this.addLayer(3)
  }

  public paint (_ctx : CanvasRenderingContext2D) : void {
    const accuracy : number = 1000
    const canvasWidth : number = this.getCanvas().width < 700 ? 700 : this.getCanvas().width
    const ratio : number = canvasWidth / 1500
    const snowProbability : number = ratio * this.probability.snow
    if (this.random(accuracy) > accuracy * (1 - (snowProbability / 100))) {
      const randX : number = this.random(window.innerWidth)
      this.add(1, new Snow([randX * 2, 0], { maxSize: 10 * ratio }), { alpha: 0.7 })
    }

    if (this.isMouseover && this.counter.mouseOver++ > 40) {
      const op = { speed: 2, lineWidth: 15, random: false }
      this.add(3, new Rain([this.mousePoint.x!, this.mousePoint.y!], op), { color: this.mouseoverColor })
      this.counter.mouseOver = 0
    }
  }
}
