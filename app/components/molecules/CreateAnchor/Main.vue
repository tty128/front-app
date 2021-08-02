<template>
  <div
    v-if="autoAnchor"
    class="anchor-list"
  >
    <p class="anchor-list__title">
      <slot />
    </p>
    <ul class="anchor-list__parent anchor-level__1">
      <List
        v-for="items in autoAnchor"
        :key="items.id"
        :item="items"
        :is-button="isButton"
        class="anchor-list__child"
        keep-alive
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from 'vue-property-decorator'
import marked from 'marked'
import { parse } from 'node-html-parser'
import List from './List.vue'
import AnchorListObj from './AnchorListObj'

marked.setOptions({
  renderer: new marked.Renderer(),
  pedantic: false,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

@Component({
  components: {
    List
  }
})
export default class CreateAnchorMainComponent extends Vue {
  @VModel({ type: String, default: '' }) test !: string
  @Prop({ type: [String, Array], default: '' }) readonly content !: string | Array<string>
  @Prop({ type: String, default: 'h1,h2,h3' }) readonly querySelect !: string
  @Prop({ type: Boolean, default: true }) readonly isButton ! : boolean

  private domStr () : string {
    let domStr = ''
    if (Array.isArray(this.content)) {
      domStr = '<div>'
      this.content.forEach((str:string) => {
        domStr = domStr + '<' + this.getQuerys[0] + ' id="' + str + '">' + str + '</' + this.getQuerys[0] + '>'
      })
      domStr = domStr + '</div>'
    } else {
      domStr = this.content
    }
    return domStr === '' ? this.test : domStr
  }

  protected get getQuerys () : Array<string> {
    const querysToSet : Array<string> = this.querySelect.split(',')
    const querys: Array<string> = [...new Set(querysToSet)]
    return querys
  }

  protected get autoAnchor () : object | null {
    const domStr : string = this.domStr()
    if (domStr === '') { return null }
    const doc = parse(marked(domStr))
    const nodeList = doc.querySelectorAll(this.querySelect)
    if (nodeList.length <= 0) { return null }

    const querys: Array<string> = this.getQuerys

    const result : Array<AnchorListObj> = []
    // 参照を渡す
    let resultRef = result

    const isCreatedIndex : Array<boolean> = []
    querys.forEach(() => { isCreatedIndex.push(false) })

    // main start
    nodeList.forEach((elem) => {
      if (!elem.id) { return }

      const tag: string = elem.tagName.toLowerCase()
      const index: number = querys.findIndex((elem : string) => elem === tag)

      for (let i = 0; i < querys.length; i++) {
        if (index === i) {
          resultRef.push({
            tag,
            id: elem.id,
            text: elem.innerHTML,
            children: []
          })
          isCreatedIndex[i] = true
          resultRef = result
        } else if (index > i) {
          if (!isCreatedIndex[i]) {
            resultRef.push({ children: [] })
            isCreatedIndex[i] = true
          }
          resultRef = resultRef[resultRef.length - 1].children
        } else {
          isCreatedIndex[i] = false
        }
      }
    })
    return result
    // main end
  }
}
</script>

<style lang="scss" scoped>
  .anchor-list{
    height: auto;

    padding: 1.6rem;

    line-height: 1.2;
    word-break: normal;

    &__title {
      font-size: 2rem;
      font-weight: bold;
      margin: 0;
    }

    &__parent{
      list-style: none;
      user-select: none;

      margin-left: 1.4rem;
    }

    &__child{
      color:inherit;
      stroke: none;
      fill: inherit;
    }
  }

  .anchor-level {
    &__1 {
      margin: 0;
      font-size: 1.8rem ;

      > li {
        margin-top: 0.6rem;
        &:first-child{margin-top: 0;}
        > span.wrapper {
          display: inline-block;
          width: 100%;
          border-bottom: dotted 1px;
          a{ margin-left: 1rem; }
        }
      }
    }

    &__2 {
      list-style: disc;
      margin-left: 3.6rem;
      font-size: 1.6re ;

      > li { margin-top: 0.5rem;}
    }

    &__3 {
      list-style: circle;
      margin-left:1.8rem;
      font-size:1.4rem;

      > li { margin-top: 0.4rem;}
    }
  }

  .anchor-list__parent::v-deep {
    stroke:none !important;

    a{
      cursor: pointer;
      word-break: break-word;
    }

    .anchor-button{
      transition: all 0.3s;
    }
    .anchor-button svg{
      width: 1.5rem;
      height: 1.5rem;

      margin-left: 0.35rem;

      stroke: inherit;
      fill: inherit;

      vertical-align: middle;
    }
    .anchor-button > span{
        color: inherit;
    }

    .anchor-button-enter-active {
    transition: all .3s ease;
    }
    .anchor-button-leave-active {
    transition: all .5s ease;
    }
    .anchor-button-enter , .anchor-button-leave-to
    {
        transform: translateX(1rem);
        opacity: 0;
    }
  }
</style>
