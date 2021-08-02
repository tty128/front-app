<template>
  <article class="blog-page-id article flex--s-s">
    <div class="article__content">
      <div class="article__content--header cl-white">
        <h1>{{ post.post_title }}</h1>
        <div
          v-if="post.post_desc"
          class="description"
        >
          {{ post.post_desc }}
        </div>
        <div v-if="taxonomy" class="taxonomy">
          <MoleculesTaxonomyList v-for="key in taxoKeys" :key="key" :terms="taxonomy[key]" :taxonomy="key" />
        </div>
        <div class="post-meta flex--s-b">
          <p class="post-meta--date">
            created : {{ post.created_at }} <span v-if="post.updated_at"> ( updated : {{ post.updated_at }} ) </span>
          </p>
          <p class="post-meta--author">
            作成者 : {{ post.post_author }} <span v-if="post.post_update_author"> ( updated : {{ post.post_update_author }} ) </span>
          </p>
        </div>
      </div>
      <div class="article__content--body cl-white">
        <MoleculesMarkedHTML :content="post.post_content" />
      </div>
    </div>
    <div id="Anchor">
      <MoleculesCreateAnchorMain :content="post.post_content" class="cl-secoundary">
        INDEX
      </MoleculesCreateAnchorMain>
    </div>
  </article>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class BlogPageIDComponent extends Vue {
  async asyncData ({ params, $axios }:{ params: any, $axios: any }) {
    const data = await $axios.$get('/api/page2/index2.php?id=' + params.id)
    const { post, taxonomy } = data
    const taxoKeys = Object.keys(taxonomy)
    return { post, taxonomy, taxoKeys }
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
