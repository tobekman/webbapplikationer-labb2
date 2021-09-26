<template>
  <ul :key="item.id" v-for="item in items">
    <Item
      @delete-item="$emit('delete-item', item.id)"
      :item="item"
      :listItemClass="listItemClass"
      :iconPath="iconPath"
    />
  </ul>
</template>

<script>
import Item from './Item.vue'
export default {
  name: 'ItemList',
  props: {
    items: Array,
    listItemClass: String,
    iconPath: String,
  },
  components: {
    Item,
  },
  emits: ['delete-item'],
}
</script>

<style scoped>
ul {
  margin-left: -40px;
}
</style>
