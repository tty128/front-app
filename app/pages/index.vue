<template>
  <div class="top-page flex--c">
    <AtomsLogo id="Logo" class="top-page__logo" />
    <span>{{ getAppName }}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class RootPageComponent extends Vue {
  @Prop({ type: String, default: 'Portfolio' }) readonly appName ! : string;

  protected get getAppName (): string { return this.appName }
}
</script>

<style lang="scss">
.top-page {
  width: 100%;
  height: 100%;
  min-height: 500px;
  font-weight: bold;

  @media screen and (max-width:480px)  {
  font-size: 4rem ;
    &__logo{
      width: 4rem;
      height: 4rem;
      margin-right: 1rem;
    }
  }

  @media screen and (min-width:480px)  {
    font-size: 5rem ;
    &__logo{
      width: 5rem;
      height: 5rem ;
      margin-right: 1rem;
    }
  }
  // .home-enter-active, .home-leave-active { transition: opacity .5s; }
  // .home-enter, .home-leave-active { opacity: 0; }
}
</style>
