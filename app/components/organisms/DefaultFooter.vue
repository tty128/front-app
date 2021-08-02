<template>
  <div class="footer">
    <div class="footer__app-name">
      <NuxtLink to="/">
        {{ getAppName }}
      </NuxtLink>
    </div>
    <div class="footer__navigation">
      <OrganismsNavigationUL />
    </div>
    <p class="footer__copyright">
      ©2021 Portfolio. All rights reserved.
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class DefaultHeaderComponent extends Vue {
  @Prop({ type: String, default: 'App' }) readonly appName ! : string

  protected get getAppName () : string { return this.appName }
}
</script>

<style lang="scss">
.footer{
  padding: 2rem;

  &__app-name {
    & > a {
      font-size: 3rem;
      text-decoration: none;
    }
  }
  &__copyright {
    font-size: 1rem;
    margin-left: auto;
  }
}
</style>
