<template>
  <div @click="isEventOn ? $router.push({query:addQuery($route.query)}) : ''">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class AddQueryComponent extends Vue {
  @Prop() readonly query ! : string | [string, number] | object | Array<string>
  @Prop({ type: Boolean, default: true }) readonly eventOn ! : boolean

  protected get getQuerys () : object {
    let obj : object = {}
    if (typeof this.query === 'string') {
      Object.defineProperty(obj, this.query, { value: this.query, writable: true })
    } else if (Array.isArray(this.query)) {
      if (typeof this.query[1] === 'number') {
        Object.defineProperty(obj, this.query[0], { value: this.query[1], writable: true })
      } else {
        this.query.forEach((str :string | number) => { Object.defineProperty(obj, str.toString(), { value: str, writable: true }) })
      }
    } else {
      obj = this.query
    }
    return obj
  }

  protected get isEventOn () : boolean {
    return this.eventOn
  }

  protected addQuery (oldQuery : object) : object {
    const obj : object = Object.assign({}, oldQuery)
    return Object.assign(obj, this.getQuerys)
  }
}
</script>

<style lang="scss">
</style>
