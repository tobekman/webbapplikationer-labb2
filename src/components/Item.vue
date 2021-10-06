<template>
  <li :class="listItemClass">
    <h3>{{ item.itemName }}</h3>
    <img
      @click="$emit('delete-item', item.itemId)"
      :src="require('../assets/icons/' + iconPath)"
      alt="remove icon"
    />
  </li>
</template>

<script>
export default {
  name: 'Activity',
  props: {
    item: {},
    listItemClass: String,
    iconPath: String,
  },
}
</script>

<style scoped>
li {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  border-radius: 4px;
  padding: 5px;
}
h3 {
  margin-left: 10px;
}
img {
  max-width: 25px;
  margin-right: 10px;
}
</style>
