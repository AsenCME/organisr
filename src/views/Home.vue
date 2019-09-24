<template>
  <div class="home">

    <div class="header">
      <div class="header-title">
        Органайзер
      </div>
      <div class="current">
        <div v-if="$store.state.currentPlace">{{$store.state.currentPlace}}
          <span
            @click="toggleAddCollection"
            class="toggleAddCollection"
          >+</span>
        </div>
        <div v-else>Не е избрано място
          <span
            @click="toggleAddCollection"
            class="toggleAddCollection"
          >+</span></div>

      </div>
    </div>

    <div class="places">
      <div
        class="place-wrapper"
        v-for="collection in $store.state.placesLocal"
        :key="collection.name"
      >

        <div
          class="place"
          @click="selectCollection(collection.name, $event)"
          :ref="collection.name"
          :class="{selected: $store.state.currentPlace === collection.name}"
        >
          {{collection.name}}
          <span
            @click.stop="toggleAddItem"
            class="toggleAddItem"
          >+</span>
        </div>

        <div
          class="place-items"
          v-if="$store.state.currentPlace === collection.name"
        >
          <div v-if="collection.items.length === 0">
            Няма артикули все още
          </div>
          <div v-else>
            <div
              class="item"
              v-for="item in collection.items"
              :key="item"
            >
              {{item}}
              <span
                @click.stop="removeItem(collection.name, item)"
                class="removeItem"
              >+</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="addCollection hidden"
      ref="addCollection"
    >
      Добавяне на колекция
      <form @submit.prevent="addCollection">
        <input
          type="text"
          v-model="collectionName"
        >
        <button type="submit">Add</button>
      </form>
    </div>

    <div
      class="addItem hidden"
      ref="addItem"
    >
      Добавяне на артикул
      <form @submit.prevent="addItem">
        <input
          type="text"
          v-model="itemName"
        >
        <button type="submit">Add</button>
      </form>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      collectionName: "",
      itemName: "",
      collections: [],
      addCollectionIsHidden: true,
      addItemIsHidden: true
    };
  },
  name: "home",
  methods: {
    removeItem(collectionName, itemName) {
      if (this.$store.state.currentPlace === "") {
        console.log("BRUHHHHHH");
      } else {
        this.$store.dispatch("removeItemFromCollection", {
          collectionName: collectionName,
          itemName: itemName
        });
      }
    },
    toggleAddItem() {
      if (this.addItemIsHidden) {
        this.$refs.addItem.classList.remove("hidden");
        this.addItemIsHidden = false;
      } else {
        this.$refs.addItem.classList.add("hidden");
        this.addItemIsHidden = true;
      }
    },
    toggleAddCollection() {
      if (this.addCollectionIsHidden) {
        this.$refs.addCollection.classList.remove("hidden");
        this.addCollectionIsHidden = false;
      } else {
        this.$refs.addCollection.classList.add("hidden");
        this.addCollectionIsHidden = true;
      }
    },
    selectCollection(collectionName, $event) {
      if (collectionName === this.$store.state.currentPlace) {
        this.$store.state.currentPlace = "";
        $event.target.classList.remove("selected");
      } else {
        if (this.$store.state.currentPlace)
          this.$refs[this.$store.state.currentPlace][0].classList.remove(
            "selected"
          );
        this.$store.state.currentPlace = collectionName;
        $event.target.classList.add("selected");
      }
    },
    addCollection() {
      if (this.collectionName === "") {
        console.log("BRUUUUUHHHH");
      } else {
        this.$store.dispatch("addCollection", this.collectionName);
        this.collectionName = "";
        this.toggleAddCollection();
      }
    },
    addItem() {
      if (this.$store.state.currentPlace === "") {
        console.log("BRUHHHHHH");
      } else {
        this.$store.dispatch("addItemToCollection", {
          collectionName: this.$store.state.currentPlace,
          itemName: this.itemName
        });
        this.itemName = "";
        this.toggleAddItem();
      }
    }
  },
  mounted() {
    this.$store.dispatch("getPlaces");
  }
};
</script>
