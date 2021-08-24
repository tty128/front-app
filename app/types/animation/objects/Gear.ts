// import DrawObject from '../src/object/DrawObject'

// interface GearOption {
//   speed? : number,
//   size? : number,
//   color? : string,
//   alpha? : number,
//   random?: boolean
// }

// export default class Gear extends DrawObject {
//   private radius : number = 0
//   private alphaMax : number = 1
//   private alpha : number = 12

//   private speed : number = 5
//   private size : number = 5
//   private randomOn : boolean = false

//   constructor (point: Array<number>)
//   constructor (point: Array<number>, op : GearOption)
//   constructor (point: Array<number>, op? : GearOption) {
//     super(point)
//     const init :GearOption = op || {}
//     const rand = op?.random ? op.random : this.randomOn
//     if (rand) {
//       this.speed = Math.floor(Math.random() * (init.speed || this.speed)) + 1
//       this.size = Math.floor((Math.random() * (init.size || this.size))) + 1
//       this.alpha = init.alpha ? Math.floor((Math.random() * (init.alpha))) + 10 : this.alpha
//     } else {
//       this.speed = (init.speed || this.speed) + 1
//       this.size = (init.size || this.size) + 1
//       this.alpha = (init.alpha || this.alpha)
//     }
//     this.color = init.color || this.color
//   }

//   public created (): void {}

//   public paint (ctx: CanvasRenderingContext2D): void {
//     const x = this.x || 0
//     const y = this.y || 0
//     ctx.beginPath()
//     ctx.arc(x, y, this.radius, 0, 2 * Math.PI, false)
//     ctx.lineWidth = 20
//     ctx.strokeStyle = 'rgba(' + this.color + ',' + this.alphaMax + ')'
//     ctx.stroke()
//     this.radius += this.speed
//     this.alphaMax -= this.alpha / 1000
//   }

//   public move (): void {}

//   public destroy (): boolean {
//     if (this.alpha < 0) {
//       return true
//     }
//     return false
//   }

//   public event () : void {}
// }
