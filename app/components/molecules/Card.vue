<template>
  <NuxtLink
    :to="getPrefix + getId"
    :class="['card-design' , '--' + getDesign]"
  >
    <AtomsImage :src="getImgUrl" />
    <div class="card-design__info">
      <!-- eslint-disable-next-line vue/singleline-html-element-content-newline -->
      <h2 class="card-design__info--title">
        <slot />
      </h2>
      <p v-if="getDesc" class="card-design__info--desc">
        {{ getDesc }}
      </p>
      <div v-if="getDate" class="card-design__info--date">
        <p>{{ getDate[0] }}</p>
        <!-- eslint-disable-next-line vue/singleline-html-element-content-newline -->
        <p v-if="getDate[1]">{{ getDate[1] }}</p>
      </div>
      <AtomsTermButton class="card-design__info--category" :prefix="'/taxonomy/category/' + getCategory.toLowerCase()">
        {{ getCategory }}
      </AtomsTermButton>
    </div>
  </NuxtLink>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class CardComponent extends Vue {
  @Prop({ type: String, default: 'column' }) readonly design ! :string
  @Prop({ type: String, default: './post/' }) readonly prefix ! :string
  @Prop({ type: String, default: 'uncategorized' }) readonly category ! :string
  @Prop({ type: [String, Number], default: '' }) readonly id ! :string | number
  @Prop() readonly imgUrl? :string
  @Prop() readonly desc? : string | [string, number] | [string, number, string]
  @Prop() readonly date? : string | [string, string]

  protected get getDesign () : string {
    return this.design
  }

  protected get getPrefix () : string {
    return this.prefix
  }

  protected get getId () : string {
    if (typeof this.id === 'number') {
      return this.id.toString()
    }
    return this.id
  }

  protected get getImgUrl () : string | null {
    if (typeof this.imgUrl !== 'string') {
      return null
    }
    return this.imgUrl
  }

  protected get getDesc () : string | null {
    if (!this.desc) { return null }
    let text: string
    let len = 100
    let ellipsis = '...'
    if (typeof this.desc !== 'string') {
      text = this.desc[0]
      len = this.desc[1]
      if (this.desc.length === 3) {
        ellipsis = this.desc[2]
      }
    } else {
      text = this.desc
    }
    return text.length >= len ? text.slice(0, len - ellipsis.length) + ellipsis : text
  }

  protected get getDate () : [string, string | null] | null {
    if (!this.date) {
      return null
    } else if (typeof this.date === 'string') {
      return [this.date, null]
    } else {
      return [this.date[0], this.date[1]]
    }
  }

  protected get getCategory () : string {
    return this.category
  }
}
</script>

<style lang="scss" scoped>
.card-design{
  background: #FFF;
  &__img{
    stroke: none;
    fill: #FFF;
    background: #CCC;
  }
}

.card-design {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  text-decoration: none;

  &.--column {
    flex-direction: column;
    .card-design__info {
      flex-direction: column;
      flex-grow: 2;
    }
  }

  &__img {
    flex-grow: 1;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    overflow: hidden;
    object-fit: cover;

    img {object-fit: inherit;object-position: center;}
    svg {
      fill:inherit;
      stroke: inherit;
    }
  }

  &__info {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    &--title{
      font-size: 1em;
      padding: 0 1em;
      word-break: break-all;
    }
  }

}
</style>
