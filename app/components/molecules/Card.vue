<template>
  <NuxtLink :to="getPrefix + getId" class="card-design">
    <div class="card-design__logo"><AtomsLogo class="logo" /></div>
    <div :class="['card-design--wrapper', cardClass]">
      <!-- <AtomsImage :src="getImgUrl" /> -->
      <AtomsSkillLogo :logo-name="getEyecatch" />
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
    </div>
  </NuxtLink>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class CardComponent extends Vue {
  @Prop({ type: String, default: '' }) readonly cardClass ! :string
  @Prop({ type: String, default: './post/' }) readonly prefix ! :string
  @Prop({ type: String, default: 'uncategorized' }) readonly category ! :string
  @Prop({ type: String, default: '' }) readonly eyecatch ! :string
  @Prop({ type: [String, Number], default: '' }) readonly id ! :string | number
  @Prop() readonly imgUrl? :string
  @Prop() readonly desc? : string | [string, number] | [string, number, string]
  @Prop() readonly date? : string | [string, string]

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

  protected get getEyecatch () : string {
    return this.eyecatch
  }
}
</script>

<style lang="scss" scoped>
.card-design{
  background: none !important;
  position: relative;
  z-index: 1;
  display: block;
  width: inherit;
  height: inherit;

  transition: all 0.3s;

  text-decoration: none;
  &__img{
    stroke: none;
    fill: inherit;
    background: inherit;
  }

  &:hover {
    z-index: 10;
    padding-top:60px;
    padding-left:10px;
    .card-design--wrapper{
      // background-color: lighten(rgb(69, 79, 69),20%)!important;
      // background-color: lighten(#FF8A65,20%)!important;
      // color:rgb(50, 39, 39);
      // stroke: rgb(50, 39, 39);
      // fill:rgb(50, 39, 39);
      box-shadow: 5px 5px 0px 0 #8BC34A;
      transition: all 0.5s ease-in-out;
    }
  }

  .logo{
    position: absolute;
    top: -70px;
    left: 15px;
    height: 320px;
    width: 320px;
    transform: scaleX(-1);
  }
}

.card-design {
  &--wrapper{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    flex-direction: column;
    &::before{
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      content: ' ';
      transition: all 0.3s;
    }
  }

  &__logo {
    position: absolute;
    top: 0;
    left: 0;
    
    width: inherit;
    height: inherit;
    //  width: 195px;
    //  height: 195px;

    overflow: hidden;

    background: #8BC34A;
    color: #322727;
    fill: #322727;
    stroke: #322727;
  }

  .card-design__info {
    flex-direction: column;
    flex-grow: 2;
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
      margin-bottom: auto;
    }
  }
}
</style>
