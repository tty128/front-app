<template>
  <ul class="card-sort__list">
    <li
      v-for="item in getDatas"
      :key="item.id"
      class="card-sort__item"
    >
      <MoleculesCard
        :id="item.id"
        :prefix="prefix + '/'"
        :category="item.category"
        :eyecatch="item.eyecatch"
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
  .card-sort__list {
    width: auto;
    margin: 0 auto;
    padding: 0;
  }
  .card-sort__item {
    margin: 1rem;
    list-style: none;
    width: 200px;
    height: 200px;
    &:last-child{
      float: left;
    }
  }
</style>
