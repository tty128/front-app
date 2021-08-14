<template>
  <ul class="card-sort__list">
    <li
      v-for="item in getDatas"
      :key="item.id"
      :class="['card-sort__item', liClass]"
    >
      <MoleculesCard
        :id="item.id"
        :prefix="prefix + '/'"
        :category="item.category"
        :eyecatch="item.eyecatch"
        :card-class="cardClass"
        :class="aClass"
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
  @Prop({ type: String, default: '' }) readonly liClass ! : string
  @Prop({ type: String, default: '' }) readonly aClass ! : string
  @Prop({ type: String, default: '' }) readonly cardClass ! : string

  protected get getDatas () : Array<object> {
    return this.data
  }
}
</script>

<style lang="scss">
  .card-sort__list {
    width: auto;
    margin: 0 auto;
    margin-bottom: 60px;
    padding: 0;
  }
  .card-sort__item {
    margin: 1rem;
    list-style: none;
    width: 195px;
    height: 195px;
    &:last-child{
      float: left;
    }
  }
</style>
