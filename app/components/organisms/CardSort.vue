<template>
  <ul class="flex--s ul">
    <li
      v-for="item in getDatas"
      :key="item.id"
      class="list"
    >
      <MoleculesCard
        :id="item.id"
        :prefix="prefix + '/'"
        :category="item.category"
      >
        {{ item.title }}
      </MoleculesCard>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class CardSortComponent extends Vue {
  @Prop({ type: Array, required: true }) readonly data ! : Array<object>
  @Prop({ type: String, default: '/blog/post' }) readonly prefix ! : string

  protected get getDatas () : Array<object> {
    return this.data
  }
}
</script>

<style lang="scss">
  .ul {
    width: auto;
    margin: 0 auto;
    padding: 0;
  }
  .list {
    margin: 1rem;
    list-style: none;
    width: 200px;
    height: 200px;
  }
  .list:last-child{
    float: left;
  }
</style>
