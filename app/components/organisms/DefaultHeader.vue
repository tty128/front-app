<template>
  <div class="header">
    <div class="header__app-name flex">
      <NuxtLink to="/">
        {{ getAppName }}
      </NuxtLink>
    </div>
    <nav class="header__navigation">
      <OrganismsNavigationUL class="header__navigation--nav-list flex--e" li-class="flex" />
    </nav>
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
.header {
  padding: 1rem 2rem;

  &__app-name {
    a{ text-decoration: none; }
  }

  &__navigation {
    margin-left: auto;

    &--nav-list {
      margin: 0;
      padding: 0;

      li {
        min-width: 7rem;
        margin-left: 1rem;
      }
    }
  }
}

</style>
