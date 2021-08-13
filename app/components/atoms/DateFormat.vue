<template>
  <p class="date-format">
    <span class="date-format__created">
      created : {{ getDate }}
    </span>
    <span
      v-if="getUpdate !== '' && getDate !== getUpdate"
      class="date-format__updated"
    >
      (updated : {{ getUpdate }})
    </span>
  </p>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class DataFormatComponent extends Vue {
  @Prop({ type: String }) readonly date ! :string
  @Prop({ type: String }) readonly update ? :string
  @Prop({ type: String, default: '-' }) readonly separator ! : string

  protected get getDate () : string {
    return this.dateFormat(this.date)
  }

  protected get getUpdate () : string {
    return this.update ? this.dateFormat(this.update) : ''
  }

  private dateFormat (date : string) : string {
    const d : RegExpMatchArray | null = date.match(/^([0-9]{4})[-/]?([0-9]{2})[-/]?([0-9]{2})/)
    return d ? d[1] + this.separator + d[2] + this.separator + d[3] : ''
  }
}
</script>

<style lang="scss">
.date-format{
  &__created, &__updated {
    display: inline-block;
  }
}
</style>
