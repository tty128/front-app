<template>
  <article>
    <h1>{{ data.post_title }}</h1>
    <div>
      <p>ここはポートフォリオの記事のページ</p>
      <div>
        <textarea v-model="data.post_title" placeholder="edit me" />
        {{ data.post_title }}
        <MoleculesCreateAnchorMain v-model="data.post_title" class="cl-secoundary"></MoleculesCreateAnchorMain>
        <MoleculesMarkedHTML v-model="data.post_title" />
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class BlogPageComponent extends Vue {
  async asyncData ({ params, $axios }:{ params: any, $axios: any }) {
    const data = await $axios.$get('/api/page2/index2.php?id=' + params.id)
    return { data }
  }

  value :string = ''
}
</script>
