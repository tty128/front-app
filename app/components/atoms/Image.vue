<template>
  <div
    v-if="getImg.path"
    class="__img"
  >
    <img :src="getImg.path" :width="getImg.width + 'px'" :height="getImg.height + 'px'" :alt="getAlt">
  </div>
  <div
    v-else
    class="__img"
  >
    <svg :width="getImg.width" :height="getImg.height" :viewBox="'0 0 ' + getImg.width + ' ' + getImg.height" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 7C5.34315 7 4 8.34315 4 10C4 11.6569 5.34315 13 7 13C8.65685 13 10 11.6569 10 10C10 8.34315 8.65685 7 7 7ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10Z" /><path fill-rule="evenodd" clip-rule="evenodd" d="M3 3C1.34315 3 0 4.34315 0 6V18C0 19.6569 1.34315 21 3 21H21C22.6569 21 24 19.6569 24 18V6C24 4.34315 22.6569 3 21 3H3ZM21 5H3C2.44772 5 2 5.44772 2 6V18C2 18.5523 2.44772 19 3 19H7.31374L14.1924 12.1214C15.364 10.9498 17.2635 10.9498 18.435 12.1214L22 15.6863V6C22 5.44772 21.5523 5 21 5ZM21 19H10.1422L15.6066 13.5356C15.9971 13.145 16.6303 13.145 17.0208 13.5356L21.907 18.4217C21.7479 18.7633 21.4016 19 21 19Z" /></svg>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class CardComponent extends Vue {
  @Prop() readonly src? :string | number | [number | string, number, number?]
  @Prop() readonly alt? :string | null | undefined

  protected get getImg () : { path: string | null, width: string, height: string } {
    let path = null
    let width = 24
    let height = 24
    if (this.src) {
      if (typeof this.src === 'string') {
        path = this.src
      } else if (typeof this.src === 'number') {
        width = height = this.src
      } else if (typeof this.src[0] === 'string') {
        path = this.src[0]
        width = this.src[1]
        height = this.src[2] ? this.src[2] : width
      } else {
        width = this.src[0]
        height = this.src[1]
      }
    }

    return { path, width: width.toString(), height: height.toString() }
  }

  protected get getAlt () : string {
    if (this.alt) {
      return this.alt
    } else {
      return ''
    }
  }
}
</script>

<style lang="scss">
  .__img {
    stroke: none;
    fill: #FFF;
    background: #CCC;

    flex-grow: 1;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    overflow: hidden;
    object-fit: cover;

    img {object-fit: inherit;object-position: center;}
    svg {
      fill:inherit;
      stroke: inherit;
    }
  }

</style>
