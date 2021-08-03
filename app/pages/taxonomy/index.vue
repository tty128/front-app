<template>
  <article class="taxonomy-page article flex--s-s">
    <div class="article__content">
      <div class="article__content--header cl-white">
        <div
          v-for="key in keys"
          :key="key"
        >
          <h1 :id="key">
            {{ key }}
          </h1>
          <MoleculesTaxonomyList v-if="data[key]" :terms="toStringArray(data[key])" :taxonomy="key" />
        </div>
      </div>
    </div>
    <div id="Anchor">
      <MoleculesCreateAnchorMain :content="keys" class="cl-secoundary" />
    </div>
  </article>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

interface IdName {
  id:number,
  name:string
}

@Component
export default class TaxonomyComponent extends Vue {
  async asyncData ({ $axios }: {$axios : any}) {
    const data : object = await $axios.$get('/api/term-taxonomy')
    const keys = Object.keys(data)
    return { data, keys }
  }

  protected toStringArray (items : Array<IdName>) : Array<string> {
    const array : Array<string> = []
    items.forEach((item:IdName) => {
      Object.keys(item).forEach((key:string) => {
        if (key === 'name') {
          array.push(item.name)
        }
      })
    })
    return array
  }
}
</script>

<style lang="scss">
.taxonomy-page {
  .article {
    &__content{
      max-width: 800px;
      flex-grow: 3;
      margin-right: 2rem;
      margin-bottom: 2rem;

      &--header {
        margin:0;
        margin-bottom: 2rem;
        padding: 2rem;
        p{margin: 0;padding: 0;}
      }
      &--body {
        margin: 0;
        padding: 2rem;
      }
    }
  }
  #Anchor {
    flex-grow: 1;
    width: 300px;
    max-width: 800px;
    margin-right: 2rem;
  }
}
</style>
