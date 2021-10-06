<template>
  <header>
    <h1>Inköpslista</h1>
    <hr :class="lineClass" noshade />
  </header>
  <main class="container">
    <div class="theme-menu">
      <p>Ändra tema:</p>
      <button
        @click="onClickDefault"
        :class="{ 'theme-btn tb1': true, 'default-selected': defaultButton }"
      ></button>
      <button
        @click="onClickBlue"
        :class="{ 'theme-btn tb2': true, 'blue-selected': blueButton }"
      ></button>
      <button
        @click="onClickPink"
        :class="{ 'theme-btn tb3': true, 'pink-selected': pinkButton }"
      ></button>
      <button
        @click="onClickOrange"
        :class="{ 'theme-btn tb4': true, 'orange-selected': orangeButton }"
      ></button>
    </div>
    <form @submit="addItem" class="item-form">
      <label>Vara</label>
      <div class="input-div">
        <input
          v-model="itemText"
          :class="textInputClass"
          type="text"
          placeholder="Lägg till en vara"
          maxlength="25"
        />
        <input :class="buttonInputClass" type="submit" value="Lägg till" />
      </div>
    </form>
    <article>
      <ItemList
        @delete-item="removeItem"
        :items="items"
        :listItemClass="listItemClass"
        :iconPath="iconPath"
      />
    </article>
  </main>
</template>

<script>
import ItemList from './components/ItemList.vue'

export default {
  name: 'App',
  components: {
    ItemList,
  },
  data() {
    return {
      itemText: '',
      items: [],
      textInputClass: 'item-form-input input_default',
      buttonInputClass: 'btn btn_default',
      listItemClass: 'list_default',
      lineClass: 'line_default',
      iconPath: 'icond.svg',
      defaultButton: true,
      blueButton: false,
      pinkButton: false,
      orangeButton: false,
    }
  },
  mounted() {
    this.getItems()
  },
  methods: {
    addItem(e) {
      e.preventDefault()
      if (this.itemText) {
        const newItem = {
          itemId: this.getNewId(),
          itemName: this.itemText,
        }

        this.postItem(newItem)

        this.items.push(newItem)
        this.itemText = ''
      } else {
        alert('Du måste skriva in en vara')
      }
    },
    removeItem(id) {
      this.items = this.items.filter((item) => item.itemId !== id)
      this.deleteItem(id)
    },
    onClickDefault() {
      this.textInputClass = 'item-form-input input_default'
      this.buttonInputClass = 'btn btn_default'
      this.listItemClass = 'list_default'
      this.iconPath = 'icond.svg'
      this.lineClass = 'line_default'
      this.setSelected('default')
    },
    onClickBlue() {
      this.textInputClass = 'item-form-input input_blue'
      this.buttonInputClass = 'btn btn_blue'
      this.listItemClass = 'list_blue'
      this.iconPath = 'iconb.svg'
      this.lineClass = 'line_blue'
      this.setSelected('blue')
    },
    onClickPink() {
      this.textInputClass = 'item-form-input input_pink'
      this.buttonInputClass = 'btn btn_pink'
      this.listItemClass = 'list_pink'
      this.iconPath = 'iconp.svg'
      this.lineClass = 'line_pink'
      this.setSelected('pink')
    },
    onClickOrange() {
      this.textInputClass = 'item-form-input input_orange'
      this.buttonInputClass = 'btn btn_orange'
      this.listItemClass = 'list_orange'
      this.iconPath = 'icono.svg'
      this.lineClass = 'line_orange'
      this.setSelected('orange')
    },
    setSelected(color) {
      if (color === 'default') {
        this.defaultButton = true
        this.blueButton = false
        this.pinkButton = false
        this.orangeButton = false
      } else if (color === 'blue') {
        this.defaultButton = false
        this.blueButton = true
        this.pinkButton = false
        this.orangeButton = false
      } else if (color === 'pink') {
        this.defaultButton = false
        this.blueButton = false
        this.pinkButton = true
        this.orangeButton = false
      } else if (color === 'orange') {
        this.defaultButton = false
        this.blueButton = false
        this.pinkButton = false
        this.orangeButton = true
      }
    },
    async postItem(item) {
      const response = await fetch('http://192.168.0.5:3000/api/item', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(item),
      })
      return response.json()
    },
    async getItems() {
      await fetch('http://192.168.0.5:3000/api/item')
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          this.items = data.items
        })
    },
    async deleteItem(itemId) {
      await fetch('http://192.168.0.5:3000/api/item/' + itemId, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      })
    },
    getNewId() {
      let highestId = 0
      this.items.forEach((item) => {
        if (item.itemId > highestId) {
          highestId = item.itemId
        }
      })
      return highestId + 1
    },
  },
}
</script>

<style src="./css/style.css"></style>
