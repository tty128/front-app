<template>
  <article class="blog-list">
    <MoleculesPagination :pages="data" button-class="cl-secoundary" />
    <OrganismsCardSort class="blog-list__items flex--s" li-class="cl-white" a-class="cl-primary" card-class="cl-white" :data="dataSlice(data,parseInt($route.query.page || 1))" />
    <MoleculesPagination :pages="data" button-class="cl-secoundary" />
  </article>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class BlogListComponent extends Vue {
  async asyncData ({ $axios, payload }: {$axios : any, payload: any}) {
    let data
    if (payload) {
      data = payload
    } else {
      data = await $axios.$get('/api/post')
    }
    return { data }
  }

  protected dataSlice (data:any, query:number) : Array<any> {
    return data.slice((query - 1) * 12, query * 12)
  }
}
</script>

<style lang="scss">
.blog-list {
  &__items {
    @media screen and (max-width:480px)  {
      justify-content: space-between !important;

      > li {
        margin: 0 0 2rem!important;
        width: 42.5vw !important;
        height: 60vw !important;
        font-size: 0.8em !important;
      }
    }
  }
}
</style>
