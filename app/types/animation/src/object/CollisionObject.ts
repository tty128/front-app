/* eslint-disable no-dupe-class-members */

import DrawObject from './DrawObject'

export default abstract class CollisionObject extends DrawObject {
  private defaultCollisionX : number = 0
  private defaultCollisionY : number = 0
  protected collisionX : number = 0
  protected collisionY : number = 0

  constructor (x : number, y : number, collisionX : number, collisionY: number) {
    super(x, y)
    this.defaultCollisionX = collisionX
    this.defaultCollisionY = collisionY
  }

  public abstract created () : void
  public action (ctx : CanvasRenderingContext2D, correctionX: number, correctionY:number) : boolean {
    const relativeX : number = this.x + (this.useCorrection ? correctionX : 0)
    const relativeY : number = this.y + (this.useCorrection ? correctionY : 0)
    this.paint(ctx, relativeX, relativeY)
    const point = this.injectMove(this.x, this.y)
    if (typeof point === 'object') {
      this.x = (point.x || this.x)
      this.y = (point.y || this.y)
    }
    this.collisionX = this.x + (this.useCorrection ? correctionX : 0) + this.defaultCollisionX
    this.collisionY = this.y + (this.useCorrection ? correctionY : 0) + this.defaultCollisionY
    return this.trigger
  }
}
