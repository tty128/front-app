<template>
  <div id="Page" class="cl-base--r flex--s-b flex--dc">
    <header id="Header">
      <OrganismsDefaultHeader
        class="cl-primary flex--c-s"
        :app-name="getAppName"
      />
    </header>
    <main id="Main" class="main cl-base--r">
      <nav id="MainNav">
        <OrganismsNavigationUL id="Canvas-mouse-on" :is-current="true" class="nav flex--s-s flex--dc" />
      </nav>
      <Nuxt id="Content" />
      <canvas id="Canvas" width="1500" height="1200" />
      <AtomsLogo v-if="modeNum === 1" class="main__logo" logo="Snowy" />
    </main>
    <footer id="Footer">
      <OrganismsDefaultFooter
        class="footer cl-base flex--s-s flex--dc"
        :app-name="getAppName"
        :mode="mode[modeNum]"
      />
      <div id="Back-ground"><img src="/background0.png" width="100" height="100"/></div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, ProvideReactive } from 'vue-property-decorator'
import Snowy from '../types/animation/main/Snowy'
import Rainy from '../types/animation/main/Rainy'
import AnimationLayerMain from '../types/animation/src/main/AnimationLayerMain'
import AnimationMain from '../types/animation/src/main/AnimationMain'

@Component
export default class DefaultLayoutComponent extends Vue {
  @ProvideReactive() cvs? : AnimationLayerMain | AnimationMain

  appName : string = 'Portfolio'
  protected get getAppName () : string { return this.appName }

  protected animationId :number = 0
  protected mode : Array<string> = ['Rainy', 'Snowy']
  protected modeNum : number = 0

  mounted () {
    const canvas = document.getElementById('Canvas') as HTMLCanvasElement
    const weighting : number = 250
    canvas.width = document.body.clientWidth + weighting
    canvas.height = window.innerHeight + weighting

    const randomMode : number = Math.floor(Math.random() * this.mode.length)
    this.modeNum = randomMode
    let cvs : AnimationLayerMain
    if (randomMode === 0) {
      cvs = new Rainy(canvas)
    } else {
      cvs = new Snowy(canvas)
    }
    this.cvs = cvs
    document.body.addEventListener('mousemove', (e) => {
      cvs.action('move', { x: e.clientX, y: e.clientY })
    })
    document.body.addEventListener('click', (e) => {
      cvs.action('click', { x: e.clientX, y: e.clientY })
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
    cvs.setCorrection(weighting, weighting)
    cvs.setCanvasSizeReactive()
    cvs.start()
  }
}
</script>

<style lang="scss">
body {
  background: #454f45;
}

#Page {
  min-height: 100vh;
  .main__logo {
    position: absolute;
    bottom:-5px;
    right: 20px;
    z-index: 10;
    margin-top: auto;
    margin-left:auto;
    @media screen and (min-width:480px)  {
      width: 15%;
    }
    @media screen and (max-width:480px)  {
      width: 30%;
    }
    height: auto;
  }
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

  padding-bottom: auto;
  flex-grow: 1;
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

  > article {
    padding-bottom: 10rem;
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
