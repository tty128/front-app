<template>
  <article class="blog-list">
    <MoleculesPagination :pages="data" button-class="cl-secoundary" />
    <OrganismsCardSort :data="dataSlice(data,parseInt($route.query.page || 1))" />
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
</style>
