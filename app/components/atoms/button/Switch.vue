<template>
  <div :class="'button-switch button-switch--' + fontSize" @click="chengeSwitch">
    <div :class="['button-switch__circle', '--' + getSwitchOnOff]" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, VModel, Prop } from 'vue-property-decorator'

@Component
export default class ButtonSwitchComponent extends Vue {
  @Prop({ type: Number, default: 14 }) readonly fontSize! : number
  @VModel({ type: Boolean }) switch!: boolean
  protected get getSwitchOnOff () : string {
    return this.switch ? 'on' : 'off'
  }

  protected chengeSwitch () : void {
    this.switch = !this.switch
  }
}
</script>

<style lang="scss">
// color
.button-switch {
  background: #8BC34A;
  &__circle {
    background: rgb(240,240,240);
  }
}
// block
.button-switch {
  $padding: 2px;
  padding: $padding;

  @for $i from 8 through 20 {
    &--#{$i} {
      height: $i * 1px;
      width: $i * 1.75px;
      border-radius: $i * 0.5px + $padding * 2;
      .button-switch__circle {
        height: $i * 1px;
        width: $i * 1px;
      }
    }
  }

  &__circle {
    border-radius: 50%;
    margin: 0;
    transition: transform 0.5s ease;
    &.--off {
      transform: translateX(75%);
    }
  }
}
</style>
