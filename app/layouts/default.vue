<template>
  <div id="Page" class="cl-base--r flex--s-s flex--dc">
    <header id="Header">
      <OrganismsDefaultHeader
        class="cl-primary flex--c-s"
        :app-name="getAppName"
      />
    </header>
    <main id="Main" class="cl-base--r">
      <nav id="MainNav">
        <OrganismsNavigationUL id="Canvas-mouse-on" :is-current="true" class="nav flex--s-s flex--dc" />
      </nav>
      <Nuxt id="Content" />
      <canvas id="Canvas" :width="window.width" :height="window.height" />
    </main>
    <footer id="Footer">
      <OrganismsDefaultFooter
        class="footer cl-base flex--s-s flex--dc"
        :app-name="getAppName"
      />
      <div id="Back-ground"><img src="/background0.png" width="100" height="100"/></div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, ProvideReactive } from 'vue-property-decorator'
import Rainy from '../types/animation/main/Rainy'
import AnimationLayerMain from '../types/animation/src/main/AnimationLayerMain'
import AnimationMain from '../types/animation/src/main/AnimationMain'

@Component
export default class DefaultLayoutComponent extends Vue {
  @ProvideReactive() cvs? : AnimationLayerMain | AnimationMain

  appName : string = 'Portfolio'
  protected get getAppName () : string { return this.appName }
  protected window = {
    width: 1500,
    height: 1200
  }

  private mouseX :number = 0
  private mouseY :number = 0
  private counter :number = 0
  private animationId :number = 0

  mounted () {
    const canvas = document.getElementById('Canvas') as HTMLCanvasElement
    const cvs = this.cvs = new Rainy(canvas)
    document.body.addEventListener('mousemove', (e) => {
      const speed : number = 10
      const x : number = e.clientX
      const y : number = e.clientY
      if (Math.abs(this.mouseX - x) + Math.abs(this.mouseY - y) > speed) {
        this.counter++
        if ((this.counter % 2) === 0) {
          cvs.action('move', { x, y })
          this.counter = 0
        }
      }
      this.mouseX = x
      this.mouseY = y
    })
    document.body.addEventListener('click', () => {
      cvs.action('click', { x: this.mouseX, y: this.mouseY })
    })
    const mouseOnElements : NodeListOf<HTMLElement> = document.body.querySelectorAll('#Canvas-mouse-on li') as NodeListOf<HTMLElement>
    mouseOnElements.forEach((el : HTMLElement) => {
      el.addEventListener('mouseover', () => {
        const cr = el.getBoundingClientRect()
        const ind = el.className.split(' ').indexOf('--current')
        cvs.action('navigation' + (ind >= 0 ? '--current' : ''), { x: 30 + cr.left, y: el.clientHeight / 2 + cr.top })
      })
      el.addEventListener('mouseout', () => {
        cvs.action('mouseout')
      })
    })
    const run = () => {
      const weighting : number = 250
      this.window.width = document.body.clientWidth + weighting
      this.window.height = window.innerHeight + weighting
      cvs.start(weighting, weighting)
      try {
        this.animationId = window.requestAnimationFrame(run)
      } catch {
        window.cancelAnimationFrame(this.animationId)
      }
    }
    window.requestAnimationFrame(run)
  }
}
</script>

<style lang="scss">
body {
  background: #454f45;
}

#Page {
  min-height: 100vh;
}
#Header, #Footer {
  position: relative;
  z-index: 100;
  width: 100%;
  opacity: 0.9;
  font-family: 'Righteous', cursive;
}
#Footer {
  position: relative;
  margin-top: auto;
  .footer {
    position: relative;
    z-index: 10;
    mix-blend-mode: multiply;
  }
  #Back-ground {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(#FFF,0.75);
      content: "";
    }

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
}
#Main{
  object-fit: cover;

  position: relative;
  z-index: 50;
  display: flex;
  width: 100%;
  // overflow: hidden;

  .nav {
    position: sticky;
    top: 2rem;
    list-style: none;
    padding:0 2rem;
    font-size: 3rem;
    font-family: 'Righteous', cursive;
    a{text-decoration: none;}
    a.--current {
      color:#8BC34A;
    }
  }
}
#MainNav {
  position: relative;
  z-index: 10;
  max-width: 250px;
  flex-grow: 1;
  @media screen and (max-width:1024px)  {
    display: none;
  }
}
#Content {
  position: relative;
  z-index: 9;
  opacity: 0.9;
  @media screen and (min-width:780px)  {
    flex-grow: 1;
    margin: 2rem;
  }
  @media screen and (max-width:780px)  {
    width: 90%;
    margin: 2rem auto;
  }
}
#Canvas {
  position: fixed;
  z-index: 1;
  top:-250px;
  left:-250px;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
