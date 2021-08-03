<template>
  <div class="top-page flex--c flex--dc">
    <AtomsLogo class="top-page__logo">
      {{ getAppName }}
    </AtomsLogo>
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
    height: 5rem;
    font-size: 5rem;
    font-weight: bold;
    margin-bottom: 5rem;
  }
}
</style>
