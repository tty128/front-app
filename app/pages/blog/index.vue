<template>
  <article class="blog-list">
    <MoleculesPagination :pages="data" button-class="cl-secoundary" current-color="cl-accent" />
    <transition :name="getTransitionName" mode="out-in">
      <OrganismsCardSort
        :key="$route.query.page || 1"
        class="blog-list__items flex--s"
        li-class="cl-white"
        a-class="cl-primary"
        card-class="cl-white"
        :data="dataSlice(data,parseInt($route.query.page || 1))"
      />
    </transition>
    <MoleculesPagination :pages="data" button-class="cl-secoundary" current-color="cl-accent" />
  </article>
</template>

<script lang="ts">
import { Vue, Component, InjectReactive } from 'nuxt-property-decorator'
import AnimationLayerMain from '~/app/types/animation/src/main/AnimationLayerMain'
import AnimationMain from '~/app/types/animation/src/main/AnimationMain'

@Component
export default class BlogListComponent extends Vue {
  @InjectReactive() cvs? : AnimationLayerMain | AnimationMain

  async asyncData ({ $axios, payload }: {$axios : any, payload: any}) {
    let data
    if (payload) {
      data = payload
    } else {
      data = await $axios.$get('/api/post')
    }
    return { data }
  }

  protected page : number = 1

  protected get getTransitionName () : string {
    const routeQuery : number = +this.$route.query.page || 1
    const name : string = this.page > +this.$route.query.page ? 'list--slide-right' : 'list--slide-left'
    this.page = routeQuery
    return name
  }

  protected dataSlice (data:any, query:number) : Array<any> {
    return data.slice((query - 1) * 12, query * 12)
  }

  transition (to: any, from: any) {
    const paths : Array<string> = ['/about', '/taxonomy']
    if (from) {
      for (const path of paths) {
        if ((to.path === path) || (from.path === path)) {
          if (path === paths[0]) {
            return 'anime--slide-left'
          } else {
            return 'anime--slide-right'
          }
        }
      }
    }
    return 'anime--slide-up'
  }

  mounted () {
    const mouseOnElements : NodeListOf<HTMLElement> = document.body.querySelectorAll('.pagination__button') as NodeListOf<HTMLElement>
    mouseOnElements.forEach((el : HTMLElement) => {
      el.addEventListener('mouseover', () => {
        const ind = el.className.split(' ').indexOf('--current')
        const cr = el.getBoundingClientRect()
        if (this.cvs) {
          this.cvs.action('pagination' + (ind >= 0 ? '--current' : ''), { x: el.clientWidth / 2 + cr.left, y: el.clientHeight / 2 + cr.top })
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

.list--slide {
  &-right, &-left {
    &-enter-active, &-leave-active {
      transition: all .5s;
    }
  }

  &-right {
    &-enter {
      opacity: 0;
      transform: translateX(-60px);
    }

    &-leave-to {
      opacity: 0;
      transform: translateX(60px);
    }
  }

  &-left {
    &-enter {
      opacity: 0;
      transform: translateX(60px);
    }

    &-leave-to {
      opacity: 0;
      transform: translateX(-60px);
    }
  }
}
</style>
