<template>
  <article class="taxonomy-term">
    <h2 class="flex--c">
      {{ taxonomy }} : {{ term }}
    </h2>
    <div v-if="data.length > 0" class="wrapper">
      <MoleculesPagination :pages="data" button-class="cl-secoundary" current-color="cl-accent" />
      <OrganismsCardSort class="blog-list__items flex--s"  li-class="cl-white" a-class="cl-primary" card-class="cl-white" :data="dataSlice(data,parseInt($route.query.page || 1))" />
      <MoleculesPagination :pages="data" button-class="cl-secoundary" current-color="cl-accent" />
    </div>
    <p v-else class="flex--c">
      アイテムがありません。
    </p>
  </article>
</template>

<script lang="ts">
import { Vue, Component, InjectReactive } from 'nuxt-property-decorator'
import AnimationLayerMain from '~/app/types/animation/src/main/AnimationLayerMain'
import AnimationMain from '~/app/types/animation/src/main/AnimationMain'

@Component
export default class TaxonomyTermComponent extends Vue {
  @InjectReactive() cvs? : AnimationLayerMain | AnimationMain
  async asyncData ({ params, $axios }: { params: any, $axios: any}) {
    const data = await $axios.$get(`/api/term-taxonomy/${params.taxonomy}/${params.term}`)
    const { taxonomy, term } = params
    return { data, taxonomy, term }
  }

  dataSlice (data:any, query:number) : Array<any> {
    return data.slice((query - 1) * 12, query * 12)
  }

  transition (to: { path: string }) {
    if (to.path === '/') {
      return 'anime--slide-up'
    } else {
      return 'anime--slide-down'
    }
  }

  mounted () {
    const mouseOnElements : NodeListOf<HTMLElement> = document.body.querySelectorAll('.pagination__button') as NodeListOf<HTMLElement>
    mouseOnElements.forEach((el : HTMLElement) => {
      el.addEventListener('mouseover', () => {
        const ind = el.className.split(' ').indexOf('--current')
        const cr = el.getBoundingClientRect()
        const border :number = 2
        if (this.cvs) {
          this.cvs.action('pagination' + (ind >= 0 ? '--current' : ''), { x: el.clientWidth / 2 + cr.left + border, y: el.clientHeight / 2 + cr.top + border })
        }
      })
      el.addEventListener('mouseout', () => {
        if (this.cvs) {
          this.cvs.action('mouseout')
        }
      })
    })
  }
}
</script>

<style lang="scss">
.blog-list {
  &__items {
    @media screen and (max-width:480px)  {
      justify-content: space-between !important;

      > li {
        margin: 0 0 2rem!important;
        width: 42.5vw !important;
        height: 60vw !important;
        font-size: 0.8em !important;
      }
    }
  }
}
</style>
