/* eslint-disable no-dupe-class-members */
import Config from '../../Config'
import MainAddOption from '../interface/MainAddOption'
import Point from '../interface/Point'
import Manager from '../Manager'
import DrawObject from '../object/DrawObject'
import AnimationMain from './AnimationMain'

interface Layer {
  id: number,
  manager: Manager
}

export default abstract class AnimationLayerMain extends AnimationMain {
  protected layerConflict : boolean = Config.MAIN_MANAGER_LAYER_CONFLICT_REPLACE
  protected layers : Array<Layer> = []
  protected focusLayer : Layer
  protected abstract randomColor: Array<string> | null

  constructor (canvas : HTMLCanvasElement) {
    super(canvas)
    const newLayer = {
      id: 0,
      manager: this.manager
    }
    this.layers.push(newLayer)
    this.focusLayer = newLayer
    this.init()
  }

  public abstract init () : void

  protected addLayer () : void
  protected addLayer (manager : Manager) : void
  protected addLayer (index : number) : void
  protected addLayer (manager : Manager, index : number) : void
  protected addLayer (manager : Manager, index : number, replace : boolean) : void
  protected addLayer (value? : Manager | number, index? : number, replace? : boolean) : void {
    const rep : boolean = replace || this.layerConflict
    const addLayer : Layer = {
      id: typeof value === 'number' ? value : (index || this.layers[this.layers.length - 1].id + 1),
      manager: value instanceof Manager ? value : new Manager()
    }

    const layers : Array<Layer> = []

    if (index) {
      let counter = 0
      let prevId = 0
      this.layers.forEach((layer: Layer) => {
        if (prevId < addLayer.id && addLayer.id <= layer.id) {
          layers.push(addLayer)
          counter++
        }
        if (layer.id !== addLayer.id || !rep) {
          layers.push({
            id: layer.id + (rep ? 0 : counter),
            manager: layer.manager
          })
        }
        prevId = layer.id
      })
      this.layers = layers
    } else {
      this.layers.push(addLayer)
    }
  }

  protected copyLayer () : void
  protected copyLayer (to: number) : void
  protected copyLayer (id:number, to: number) : void
  protected copyLayer (value?: number, to?:number) : void {
    let toIndex : number | undefined = to
    let manager : Manager
    if (value) {
      toIndex = to || value
      manager = to ? this.layers[value].manager : this.focusLayer.manager

      this.addLayer(manager, toIndex)
    } else {
      this.addLayer(this.focusLayer.manager)
    }
  }

  protected changeFocusLayer (id?: number) : void {
    const layerId = id || this.layers[0].id
    const changeLayer : Layer | undefined = this.layers.find((layer: Layer) => layer.id === layerId)
    if (changeLayer) {
      this.focusLayer = changeLayer
    }
  }

  protected getForcusLayerId () : any {
    return this.layers
  }

  protected add (obj : DrawObject) : void

  protected add (obj : DrawObject, move : (x: number, y :number) => Point) : void
  protected add (obj : DrawObject, option : MainAddOption) : void
  protected add (obj : DrawObject, option : MainAddOption, move : (x: number, y :number) => Point) : void

  protected add (obj : DrawObject, layerId : number) : void
  protected add (obj : DrawObject, layerId : number, move : (x: number, y :number) => Point) : void
  protected add (obj : DrawObject, layerId : number, option : MainAddOption) :void

  protected add (obj : DrawObject, layerId : number, option : MainAddOption, move : (x: number, y :number) => Point) :void
  protected add (obj : DrawObject, value1? :((x: number, y :number) => Point) | MainAddOption | number, value2? : ((x: number, y :number) => Point) | MainAddOption, move? : (x: number, y :number) => Point) : void {
    const id : number = typeof value1 === 'number' ? value1 : -1
    const op : MainAddOption = typeof value1 === 'object' ? value1 : typeof value2 === 'object' ? value2 : {}
    const mv : ((x: number, y :number) => Point) | undefined = typeof value1 === 'function' ? value1 : typeof value2 === 'function' ? value2 : move

    if (this.randomColor && !op.color) {
      op.color = this.randomColor[this.random(this.randomColor)]
    }
    if (id === -1) {
      this.focusLayer.manager.add(obj, op, mv)
    } else {
      this.layers[id].manager.add(obj, op, mv)
    }
  }

  public start () : void {
    const ctx = this.ctx
    if (ctx) {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.paint(ctx)
      this.layers.forEach((layer : Layer) => {
        if (layer.manager.objectExists()) {
          layer.manager.action(ctx)
        }
      })
    }
  }
}
