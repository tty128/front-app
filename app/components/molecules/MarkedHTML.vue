
<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="contents-preview">
    <div
      v-if="getContent && getContent !== ''"
      class="contents-preview--body"
      v-html="getContent"
    />
    <div
      v-if="getTest"
      class="contents-preview--body"
      v-html="getTest"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from 'vue-property-decorator'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css'

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight (code: any, lang: string) {
    const language: string = hljs.getLanguage(lang) ? lang : 'plaintext'
    return hljs.highlight(code, { language }).value
  },
  pedantic: false,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

@Component
export default class MarkedHTMLComponent extends Vue {
  @Prop() readonly content ! :string
  protected get getContent () : string {
    return typeof (this.content) !== 'string' || this.content === '' ? '' : marked(this.content)
  }

  @VModel({ type: String }) test!: string
  protected get getTest () : string {
    return typeof (this.test) !== 'string' || this.test === '' ? '' : marked(this.test)
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap');

.contents-preview{
    width: 100%;
    height: auto;
    margin: 0 auto;

  &--body {
    word-break: break-all;
  }
}

.contents-preview--body::v-deep {
  // *******
  //  color
  // *******

  pre {
    color:#EEE;
    background: #2f495e ;
  }

  p code{
    color:#2f495e;
    background: rgb(240, 236, 236);
  }

  blockquote{
    border-left: 4px solid #DDD;
    color: #777;
  }

  // *******
  //  font (基本的なサイズは@assetのグローバルCSSを適用する)
  // *******
  h1 {
      // font-size: 4.8rem;
  }

  h2 {
      // font-size: 3.6rem;
      border-bottom: solid 1px;
  }

  h3 {
      // font-size: 2.4rem;
  }

  * {
      // font-size: 1.6rem;
  }

  ul, ol, dl {
      padding-left: 2.4rem;
      margin: 0.75rem 0;
  }

  pre {
    padding: 1rem 3.6rem;
  }

  p code{
    padding: 0.25rem 1rem;
  }

  blockquote{
    margin: 0.75rem 0;
    padding: 0 1.6rem;
  }

  code{
    font-family: 'Source Code Pro', monospace;
  }
}
</style>
