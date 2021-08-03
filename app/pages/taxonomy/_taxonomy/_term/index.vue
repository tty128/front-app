<template>
  <article class="taxonomy-term">
    <h2 class="flex--c">
      {{ taxonomy }} : {{ term }}
    </h2>
    <div v-if="data.length > 0" class="wrapper">
      <MoleculesPagination :pages="data" button-class="cl-secoundary" />
      <OrganismsCardSort :data="dataSlice(data,parseInt($route.query.page || 1))" />
      <MoleculesPagination :pages="data" button-class="cl-secoundary" />
    </div>
    <p v-else class="flex--c">
      アイテムがありません。
    </p>
  </article>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class TaxonomyTermComponent extends Vue {
  async asyncData ({ params, $axios }: { params: any, $axios: any}) {
    const data = await $axios.$get(`/api/term-taxonomy/${params.taxonomy}/${params.term}`)
    const { taxonomy, term } = params
    return { data, taxonomy, term }
  }

  dataSlice (data:any, query:number) : Array<any> {
    return data.slice((query - 1) * 12, query * 12)
  }
}
</script>

<style lang="scss">
</style>
