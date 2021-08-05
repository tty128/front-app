<template>
  <div id="Page" class="cl-base">
    <header id="Header">
      <OrganismsDefaultHeader
        class="cl-primary flex--c-s"
        :app-name="getAppName"
      />
    </header>
    <main id="Main" class="cl-base--r">
      <aside id="MainNav" class="sm-none">
        <OrganismsNavigationUL />
      </aside>
      <Nuxt id="Content" />
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

@Component
export default class DefaultLayoutComponent extends Vue {
  appName : string = 'Portfolio'
  protected get getAppName () : string { return this.appName }
}
</script>

<style lang="scss">
body {
  background: #454f45;
}
#Main{
  position: relative;
  display: flex;
  width: 100%;
  overflow: hidden;
}
#MainNav {
  max-width: 150px;
  flex-grow: 1;
}
#Content {
  @media screen and (min-width:480px)  {
    flex-grow: 1;
    margin: 2rem;
  }
  @media screen and (max-width:480px)  {
    width: 90%;
    margin: 2rem auto;
    > div {
      width: 100%;
      margin-right: 0 !important;
    }
  }
}
</style>
