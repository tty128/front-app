<template>
  <div class="top-page flex--c">
    <AtomsLogo id="Logo" class="top-page__logo" />
    <span class="top-page__app-name">{{ getAppName }}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class RootPageComponent extends Vue {
  @Prop({ type: String, default: 'Portfolio' }) readonly appName ! : string;
  protected get getAppName (): string { return this.appName }

  transition () {
    return 'anime--slide-up'
  }
}
</script>

<style lang="scss">
.top-page {
  user-select: none;
  width: 100%;
  height: 100%;
  min-height: 500px;
  font-family: 'Righteous', cursive;

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
}

</style>
