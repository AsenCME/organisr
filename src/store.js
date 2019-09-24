import Vue from "vue";
import Vuex from "vuex";
import Firebase from "firebase";

let config = {
	apiKey: "AIzaSyDG0-C1Mx-A_H2aazyRchcm2K4fb3qWt2s",
	authDomain: "taskr-ab4af.firebaseapp.com",
	databaseURL: "https://taskr-ab4af.firebaseio.com",
	projectId: "taskr-ab4af",
	storageBucket: "taskr-ab4af.appspot.com",
	messagingSenderId: "809242556155",
};

Firebase.initializeApp(config);

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		places: Firebase.firestore().collection("places"),
		placesLocal: [],
		currentPlace: "",
	},
	mutations: {
		getPlaces(state) {
			state.placesLocal = [];
			state.places
				.get()
				.then(snap => {
					snap.forEach(doc => {
						state.placesLocal.push(doc.data());
					});
				})
				.catch(function(error) {
					console.log("BRUH MOMENT", error);
				});
		},
		addCollection(state, collectionName) {
			state.places.doc(collectionName).set({
				name: collectionName,
				items: [],
			});
			state.placesLocal = state.placesLocal.push(collectionName);
		},
		addItem(state, payload) {
			let [collectionName, itemName] = [payload.collectionName, payload.itemName];
			state.places
				.doc(collectionName)
				.update({ items: Firebase.firestore.FieldValue.arrayUnion(itemName) });
		},
		removeItem(state, payload) {
			let [collectionName, itemName] = [payload.collectionName, payload.itemName];
			state.places
				.doc(collectionName)
				.update({ items: Firebase.firestore.FieldValue.arrayRemove(itemName) });
		},
	},
	actions: {
		addCollection(context, collectionName) {
			context.commit("addCollection", collectionName);
			context.commit("getPlaces");
		},
		addItemToCollection(context, payload) {
			context.commit("addItem", payload);
			context.commit("getPlaces");
		},
		removeItemFromCollection(context, payload) {
			context.commit("removeItem", payload);
			context.commit("getPlaces");
		},
		getPlaces(context) {
			context.commit("getPlaces");
		},
	},
});
