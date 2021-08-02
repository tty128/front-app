<template>
  <ul
    v-if="getTerms"
    class="taxonomy-list"
  >
    <li
      v-for="term in getTerms"
      :key="term"
    >
      <AtomsTermButton :class="['taxonomy-list__button', '--' + taxonomy]" :prefix="getPrefix + term.toLowerCase()">
        {{ term }}
      </AtomsTermButton>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class CardComponent extends Vue {
  @Prop({ type: [String, Array] }) readonly terms ! : string | Array<string>
  @Prop({ type: String }) readonly taxonomy ! : string
  @Prop({ type: String, default: '/taxonomy' }) readonly prefix ! :string

  protected get getPrefix () :string {
    const before = this.prefix.slice(-1) === '/' ? this.prefix : this.prefix + '/'
    return before + this.taxonomy + '/'
  }

  protected get getTerms () : Array<string> | null {
    let arr : Array<string> | null = null
    if (typeof this.terms === 'string') {
      arr = [this.terms]
    } else if (Array.isArray(this.terms)) {
      arr = [...new Set<string>(this.terms)]
    }
    return arr
  }
}
</script>

<style lang="scss" scoped>
.taxonomy-list {
    list-style: none;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;

    margin: 0.25rem 0;
    padding: 0;

    font-size: 1.2rem;

    &__button{
      padding: 0.25rem 0.75rem;
      margin-right:0.5rem;

      &.--tag{
        background: #9CCC65;
        border-radius: 2rem;
        text-decoration: none;
      }
    }
}
</style>
