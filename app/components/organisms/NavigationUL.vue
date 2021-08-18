<template>
  <ul class="navigationUL">
    <li
      v-for="path in paths"
      :key="path"
      :class="['navigationUL__item',getLiClass]"
    >
      <NuxtLink
        :to="'/' + path"
        :class="'/' + path === $route.path && isCurrent ? 'current' : ''"
      >
        {{ path.toUpperCase() }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class NavigationULComponent extends Vue {
  @Prop({ type: String, default: '' }) readonly liClass ! : string
  @Prop({ type: Boolean, default: false }) readonly isCurrent ! : boolean
  public paths : object = [
    'about',
    'blog',
    'taxonomy'
  ]

  protected get getLiClass () : string { return this.liClass }
}
</script>

<style lang="scss">
.navigationUL {
  user-select: none;
}
</style>
