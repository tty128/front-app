<template>
  <div class="top-page flex--c flex--dc">
    <div>ここはポートフォリオのページ</div>
    <p>aaaaaa</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  @Prop({ type: String, default: 'App' }) readonly appName ! : string;

  protected get getAppName (): string { return this.appName }
}
</script>

<style lang="scss">
.top-page {
  width: 100%;
  height: 100%;
}
</style>
