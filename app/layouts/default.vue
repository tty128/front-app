<template>
  <div id="Page" class="cl-base--r flex--s-s flex--dc">
    <header id="Header">
      <OrganismsDefaultHeader
        class="cl-primary flex--c-s"
        :app-name="getAppName"
      />
    </header>
    <main id="Main" class="cl-base--r">
      <aside id="MainNav">
        <OrganismsNavigationUL />
      </aside>
      <Nuxt id="Content" />
      <canvas id="Canvas" width="1500" height="1200" />
    </main>
    <footer id="Footer">
      <OrganismsDefaultFooter
        class="cl-base flex--s-s flex--dc"
        :app-name="getAppName"
      />
    </footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Canvas from '../types/animation/Main'

@Component
export default class DefaultLayoutComponent extends Vue {
  appName : string = 'Portfolio'
  protected get getAppName () : string { return this.appName }
  private mouseX :number = 0
  private mouseY :number = 0
  private counter :number = 0

  mounted () {
    const canvas : HTMLCanvasElement = document.getElementById('Canvas') as HTMLCanvasElement
    if (canvas) {
      const cvs = new Canvas(canvas)
      document.body.addEventListener('mousemove', (e) => {
        const speed : number = 10
        const x : number = e.clientX
        const y : number = e.clientY

        if ((Math.abs(this.mouseX - x) > speed || Math.abs(this.mouseY - y) > speed)) {
          this.counter++
          if ((this.counter % 3) === 0) {
            cvs.moveEvent(x, y)
            this.counter = 0
          }
        }
        this.mouseX = x
        this.mouseY = y
      })
      document.body.addEventListener('click', () => {
        cvs.clickEvent(this.mouseX, this.mouseY)
      })
      cvs.start()
    }
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
}
#Footer {
  margin-top: auto;
}
#Main{
  position: relative;
  z-index: 50;
  display: flex;
  width: 100%;
  // overflow: hidden;
}
#MainNav {
  position: relative;
  z-index: 10;
  max-width: 150px;
  flex-grow: 1;
  @media screen and (max-width:1024px)  {
    display: none;
  }
}
#Content {
  position: relative;
  z-index: 9;
  opacity: 0.78;
  @media screen and (min-width:780px)  {
    flex-grow: 1;
    margin: 2rem;
  }
  @media screen and (max-width:780px)  {
    width: 90%;
    margin: 2rem auto;
    // > div {
    //   width: 100%;
    //   margin-right: 0 !important;
    // }
  }
}
#Canvas {
  position: fixed;
  z-index: 1;
  top:0;
  left: 0;
}
</style>
