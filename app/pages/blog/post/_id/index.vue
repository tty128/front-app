<template>
  <article class="blog-page-id article flex--s-s">
    <div class="article__content">
      <div class="article__content--header cl-white">
        <h1>{{ data.title }}</h1>
        <div
          v-if="data.desc"
          class="description"
        >
          {{ data.desc }}
        </div>
        <div v-if="data.taxonomy" class="taxonomy">
          <MoleculesTaxonomyList v-for="key in Object.keys(data.taxonomy)" :key="key" :terms="toStringArray(data.taxonomy[key])" :taxonomy="key" />
        </div>
        <div class="post-meta flex--s-b">
          <p class="post-meta--date">
            created : {{ data.created_at }} <span v-if="data.updated_at"> ( updated : {{ data.updated_at }} ) </span>
          </p>
          <p class="post-meta--author">
            作成者 : {{ data.author }} <span v-if="data.update_author"> ( updated : {{ data.update_author }} ) </span>
          </p>
        </div>
      </div>
      <div class="article__content--body cl-white">
        <MoleculesMarkedHTML :content="data.body" />
      </div>
    </div>
    <div id="Anchor">
      <MoleculesCreateAnchorMain :content="data.body" class="cl-secoundary">
        INDEX
      </MoleculesCreateAnchorMain>
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
export default class BlogPageIDComponent extends Vue {
  async asyncData ({ params, $axios }:{ params: any, $axios: any }) {
    const data = await $axios.$get('/api/post/' + params.id)
    return { data }
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

<style lang="scss" scope>
.blog-page-id{
  .article {
    &__content{
      max-width: 800px;
      flex-grow: 1;
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
    @media screen and (min-width:1024px){
      position: sticky;
    }
    flex-grow: 1;
    width: 300px;
    max-width: 800px;
    margin-right: 2rem;
  }
}
</style>
