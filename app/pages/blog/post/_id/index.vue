<template>
  <article class="blog-page-id article flex--s-s">
    <div class="article__content">
      <div class="article__content--header cl-white">
        <AtomsSkillLogo class="eyecatch flex--dc" :logo-name="data.eyecatch">
          <h1 class="flex">
            {{ data.title }}
          </h1>
        </AtomsSkillLogo>
        <div
          v-if="data.desc"
          class="description"
        >
          {{ data.desc }}
        </div>
        <div v-if="data.taxonomy" class="taxonomy">
          <MoleculesTaxonomyList :terms="data.category" taxonomy="category" />
          <MoleculesTaxonomyList v-for="key in Object.keys(data.taxonomy)" :key="key" :terms="toStringArray(data.taxonomy[key])" :taxonomy="key" />
        </div>
        <div class="post-meta flex--s-b">
          <AtomsDateFormat
            class="post-meta--date"
            :date="data.created_at"
            :update="data.updated_at"
          />
          <p class="post-meta--author">
            作成者 : {{ data.author }} <span v-if="data.update_author && data.author !== data.update_author"> ( 更新者 : {{ data.update_author }} ) </span>
          </p>
        </div>
      </div>
      <MoleculesCreateAnchorMain :content="body" class="anchor__phone cl-secoundary">
        INDEX
      </MoleculesCreateAnchorMain>
      <div class="article__content--body cl-white">
        <MoleculesMarkedHTML :content="data.body" />
      </div>
    </div>
    <div id="Anchor">
      <MoleculesCreateAnchorMain :content="body" class="anchor__container cl-secoundary">
        INDEX
      </MoleculesCreateAnchorMain>
    </div>
  </article>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import marked from 'marked'

interface IdName {
  id:number,
  name:string
}

@Component
export default class BlogPageIDComponent extends Vue {
  async asyncData ({ params, $axios }:{ params: any, $axios: any, payload:any }) {
    const data = await $axios.$get('/api/post/' + params.id)
    const body = marked(data.body)
    return { data, body }
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
      overflow:hidden;
      max-width: 800px;
      flex-grow: 1;
      margin-bottom: 2rem;
      @media screen and (min-width:1270px)  {
        margin-right: 2rem;
      }

      &--header {
        margin:0;
        margin-bottom: 2rem;
        padding: 2rem;
        p{margin: 0;padding: 0;}

        .eyecatch {
          width: 100%;
          height: 500px;
        }
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
    @media screen and (min-width:1270px)  {
      margin-right: 2rem;
      position: sticky;
      top: 2rem;
    }
  }

  // .anchor__container {

  // }

  .anchor__phone {
    margin-bottom: 2rem;
    @media screen and (min-width:1270px)  {
      display: none;
    }
  }
}
</style>
