
/* eslint-disable no-dupe-class-members */
import Config from '../../Config'
import EventParams from '../interface/EventParams'
import MainAddOption from '../interface/MainAddOption'
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

  public abstract clickEvent (params : EventParams) : void

  public abstract moveEvent (params : EventParams) : void

  public abstract paint (ctx : CanvasRenderingContext2D) : void

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
    const layerId = id || this.layers[this.layers.length - 1].id
    const changeLayer : Layer | undefined = this.layers.find((layer: Layer) => layer.id === layerId)
    if (changeLayer) {
      this.focusLayer = changeLayer
    }
  }

  protected add (obj : DrawObject) : void
  protected add (obj : DrawObject, option : MainAddOption) : void
  protected add (obj : DrawObject, layerId : number) : void
  protected add (obj : DrawObject, layerId : number, option : MainAddOption) :void
  protected add (obj : DrawObject, value? : MainAddOption | number, option? : MainAddOption) : void {
    let id : number = -1
    let op : MainAddOption
    if (typeof value === 'number') {
      id = value
      op = option || {}
    } else {
      op = value || {}
    }
    if (this.randomColor && !op.color) {
      op.color = this.randomColor[this.random(this.randomColor)]
    }
    if (id === -1) {
      this.focusLayer.manager.add(obj, op)
    } else {
      this.layers[id].manager.add(obj, op)
    }
  }

  public start () : void {
    const ctx = this.ctx
    if (ctx) {
      this.changeFocusLayer(this.layers[0].id)
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
