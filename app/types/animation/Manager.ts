import DrawObject from './object/DrawObject'

export default class Manager {
  private exec : Array<DrawObject> = []
  private actionIndex : Array<number> = []
  private destroyIndex : Array<number> = []

  public objectExists () : boolean {
    return this.exec.length > 0
  }

  public getActiveLength () : number {
    return this.exec.length
  }

  public action () : void {
    this.destroyIndex = []
    this.actionIndex = []
    this.exec.forEach((obj : DrawObject, index : number) => {
      const delay = obj.getDelay()
      if (delay <= 0) {
        if (obj.action()) {
          this.actionIndex.push(index)
        }
        if (obj.destroy()) {
          this.destroyIndex.push(index)
        }
      } else {
        obj.setDelay(delay - 1)
      }
    })
    this.destroyIndex.forEach((i : number) => {
      this.exec.splice(i, 1)
    })
  }

  public getActionIndex () : Array<number> {
    return this.actionIndex
  }

  public getDestroyIndex () :Array<number> {
    return this.destroyIndex
  }

  public add (obj : DrawObject, delay? : number) : void {
    if (delay) {
      obj.setDelay(delay)
    }
    this.exec.push(obj)
  }

  public destroy (index : number) : void {
    this.exec[index].kill()
  }

  public event (index : number) : void {
    this.exec[index].event()
  }
}
