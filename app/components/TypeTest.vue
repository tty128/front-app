<template>
  <div class="typetest">
    <div class="typetest__name" > Name: {{ fullName }} </div>
    Message: {{ message }} <br>
    Date: {{ date }}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Post from '~/types/post'

@Component
export default class YourComponent extends Vue {
  @Prop({
    type: Object,
    default: () => {
      return new Post(1, 'title', 'body', 'category', ['item', 'item'], 'human', '2011-11-11', '2011-11-11')
    }
  }) readonly post!: Post;

  protected get fullName (): string { return `${this.post.getTitle} ${this.post.getCategory}` }
  // protected get fullName (): string { return `${this.user.firstName} ${this.user.lastName}` }
  protected get message (): string { return this.post.getBody }
  protected get date (): string { return this.post.getCreatedAt }
}
</script>

<style lang="scss">
.typetest {
  background: red;
  &__name{
    background: blue;
  }
}
</style>
