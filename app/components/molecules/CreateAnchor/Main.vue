<template>
  <div
    v-if="getAnchorList"
    class="anchor-list"
  >
    <p class="anchor-list__title">
      <slot />
    </p>
    <ul class="anchor-list__parent anchor-level__1">
      <List
        v-for="item in getAnchorList"
        :key="item.id"
        :item="item"
        :is-button="isButton"
        class="anchor-list__child"
        keep-alive
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from 'vue-property-decorator'
import List from './List.vue'
import AnchorList from './AnchorList/AnchorList'

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

  protected get getAnchorList () : object | null {
    const domStr : string = this.domStr()
    if (domStr === '') { return null }
    const anchor = new AnchorList(domStr)
    return anchor.getTree(this.querySelect)
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
      margin-bottom: 0.75rem;
    }
  }

  .anchor-level {
    &__1 {
      margin: 0;
      font-size: 1.8rem ;

      > li {
        margin-top: 0;
        margin-bottom: 0.75rem;
        &:first-child{margin-top: 0.75rem;}
        > span.wrapper {
          display: inline-block;
          width: 100%;
          a{
            margin-left: 1rem;
          }
        }
      }
    }

    &__2 {
      list-style: disc;
      margin-left: 3.6rem;
      font-size: 1.6re ;

      > li {margin-bottom: 0.75rem;}
    }

    &__3 {
      list-style: circle;
      margin-left:1.8rem;
      font-size:1.4rem;

      > li {margin-bottom: 0.75rem;}
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
