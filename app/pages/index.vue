<template>
  <div class="top-page flex--c flex--dc">
    <transition name="home" appear>
      <AtomsLogo id="Logo" class="top-page__logo">
        {{ getAppName }}
      </AtomsLogo>
    </transition>
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

  &__logo{
    font-weight: bold;
    margin-bottom: 5rem;
    @media screen and (max-width:480px)  {
      height: 4rem ;
      font-size: 4rem ;
    }
    @media screen and (min-width:480px)  {
      height: 5rem;
      font-size: 5rem;
    }
  }
  // .home-enter-active, .home-leave-active { transition: opacity .5s; }
  // .home-enter, .home-leave-active { opacity: 0; }
}
</style>
