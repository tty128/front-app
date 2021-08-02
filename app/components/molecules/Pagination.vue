<template>
  <ul
    v-if="getPages > 1"
    class="pagination"
  >
    <!-- Prev Button -->
    <li>
      <AtomsAddOrPutQuery
        :query="getNextQuery(parseInt($route.query.page || '1') , -1)"
        :class="getClassName(parseInt($route.query.page || '1') >= 2)"
      >
        <slot name="prev">
          <!-- Prev -->
          <!-- eslint-disable-next-line vue/max-attributes-per-line -->
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </slot>
      </AtomsAddOrPutQuery>
    </li>
    <!-- Prev Button End -->

    <!-- FirstPage Button -->
    <li class="pagination__first">
      <AtomsAddOrPutQuery
        :query="{page:1}"
        :class="getClassName(parseInt($route.query.page || '1') > getViewPage + 1)"
      >
        <slot name="first">
          <!-- First -->
          <!-- eslint-disable-next-line vue/max-attributes-per-line -->
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="11 17 6 12 11 7" />
            <polyline points="18 17 13 12 18 7" />
          </svg>
        </slot>
      </AtomsAddOrPutQuery>
    </li>
    <!-- FirstPage Button End -->

    <!-- Page Button -->
    <li>
      <AtomsAddOrPutQuery
        v-for="n in (getViewPage * 2 + 1)"
        :key="parseInt($route.query.page || '1') + n - getViewPage - 1"
        :query="getNextQuery(parseInt($route.query.page || '1') , n - getViewPage - 1)"
        :event-on="isEventOn(parseInt($route.query.page || '1') , n - getViewPage - 1) && n - getViewPage - 1 !== 0"
        :class="getClassName(parseInt($route.query.page || '1') , n - getViewPage - 1)"
      >
        {{ parseInt($route.query.page || '1') + n - getViewPage - 1 }}
      </AtomsAddOrPutQuery>
    </li>
    <!-- Page Button End-->

    <!-- LastPage Button -->
    <li class="pagination__last">
      <AtomsAddOrPutQuery
        :query="{page:getPages}"
        :class="getClassName(parseInt($route.query.page || '1') < getPages - getViewPage )"
      >
        <slot name="last">
          <!-- Last -->
          <!-- eslint-disable-next-line vue/max-attributes-per-line -->
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevrons-right">
            <polyline points="13 17 18 12 13 7" />
            <polyline points="6 17 11 12 6 7" />
          </svg>
        </slot>
      </AtomsAddOrPutQuery>
    </li>
    <!-- LastPage Button End -->

    <!-- Next Button -->
    <li>
      <AtomsAddOrPutQuery
        :query="getNextQuery(parseInt($route.query.page || '1') , 1)"
        :class="getClassName(parseInt($route.query.page || '1') < getPages)"
      >
        <slot name="next">
          <!-- Next -->
          <!-- eslint-disable-next-line vue/max-attributes-per-line -->
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </slot>
      </AtomsAddOrPutQuery>
    </li>
    <!-- Next Button End -->
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync } from 'vue-property-decorator'

@Component
export default class PaginationComponent extends Vue {
  @Prop() readonly pages ! : number | Array<object>
  @Prop({ type: Number, default: 2 }) readonly viewPage ! : number
  @Prop({ type: String, default: 'button--color' }) readonly buttonClass ! :string
  @PropSync('limit', { type: Number, default: 12 }) SyncedLimit ! : number

  protected get getPages () : number {
    let num :number
    if (typeof this.pages === 'number') {
      num = Math.ceil(this.pages / this.SyncedLimit)
    } else {
      num = Math.ceil(this.pages.length / this.SyncedLimit)
    }
    return num
  }

  protected get getViewPage () : number {
    return this.viewPage
  }

  protected getNextQuery (current: number, diff: number) :object {
    let toPage = current + diff
    if (toPage > this.getPages) {
      toPage = this.getPages
    } else if (toPage < 1) {
      toPage = 1
    }
    return { page: toPage }
  }

  protected isEventOn (current: number, diff: number) :boolean {
    const toPage = current + diff
    return !((toPage > this.getPages || toPage < 1))
  }

  protected getClassName (current: number | boolean, diff?: number) : Array<string> {
    const array : Array<string> = ['pagination__button', this.buttonClass]
    if (typeof current === 'number') {
      if (diff === 0) { array.push('--current') }
      if (!this.isEventOn(current, diff || 0)) { array.push('--invisible') }
    } else if (!current) { array.push('--invisible') }

    return array
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  list-style:none;
  display:flex;
  align-items:center;
  justify-content:center;
  width: auto;
  margin:0 auto;
  padding:0;

  font-size: 1rem;

  li {
      display: flex;
      align-items: center;
      justify-content: center;
      width: auto;

      svg{
        width: 1.2rem;
        height: 1.2rem;
      }
  }

  &__first { margin-right: 1rem ;}
  &__last { margin-left: 1rem ;}

  &__button{
    user-select:none;
    cursor:pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    min-width: 1.5rem;
    height: 2.5rem;
    border-radius:1.25rem;
    margin:0 0.2rem;
    padding:0 0.5rem;
    transition: all 0.3s;

    &.--invisible{
      pointer-events: none !important;
      opacity: 0 !important;
    }

    &.button--color {
        color:white;
        background: #367678;
        &:hover { background: red;}

        &.--current {
        background: crimson;
        cursor: default !important;
    }
    }
  }
}

</style>
