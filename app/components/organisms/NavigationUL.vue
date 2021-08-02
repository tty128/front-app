<template>
  <ul>
    <li
      v-for="path in paths"
      :key="path"
      :class="getLiClass"
    >
      <NuxtLink
        :to="'/' + path"
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
  public paths : object = [
    'about',
    'blog',
    'taxonomy'
  ]

  protected get getLiClass () : string { return this.liClass }
}
</script>

<style lang="scss">
#Header {
  background: red;
}
</style>
