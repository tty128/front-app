<template>
  <div class="footer">
    <div class="footer__app-name">
      <NuxtLink to="/">
        {{ getAppName }}
      </NuxtLink>
      <span v-if="mode" class="footer__app-name__mode">
        animation : {{ mode }}
        <AtomsButtonSwitch v-model="isAnimate" class="footer__app-name__mode--switch" />
      </span>
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
import { Vue, Component, Prop, Watch, InjectReactive } from 'vue-property-decorator'
import AnimationMain from '~/app/types/animation/src/main/AnimationMain'

@Component
export default class DefaultHeaderComponent extends Vue {
  @InjectReactive() cvs? : AnimationMain
  @Prop({ type: String, default: 'App' }) readonly appName ! : string
  @Prop({ type: String }) readonly mode? : string

  protected get getAppName () : string { return this.appName }
  protected isAnimate : boolean = true
  @Watch('isAnimate')
  protected onChangeAnimate (val: boolean) : void {
    if (val && this.cvs) {
      console.log('true')
      this.cvs.start()
    } else if (!val && this.cvs) {
      this.cvs.stop()
    }
  }
}
</script>

<style lang="scss">
.footer{
  user-select: none;
  padding: 2rem;

  &__app-name {
    & > a {
      font-size: 3rem;
      text-decoration: none;
    }

    &__mode {
      display: inline-block;
      margin-left: 2rem;

      &--switch {
        margin-left: 1rem;
        display: inline-block;
        vertical-align: sub;
      }
    }
  }

  &__copyright {
    font-size: 1rem;
    margin-left: auto;
  }
}
</style>
