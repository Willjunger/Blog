import app from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

let firebaseConfig = {
	apiKey: "AIzaSyAcmkczf1kRdhof-iZhqpJetacnoEB1UA8",
	authDomain: "reactapp-62dff.firebaseapp.com",
	databaseURL: "https://reactapp-62dff.firebaseio.com",
	projectId: "reactapp-62dff",
	storageBucket: "reactapp-62dff.appspot.com",
	messagingSenderId: "571776279051",
	appId: "1:571776279051:web:6b71f3844eb15da9e49d0e",
};

class Firebase {
	constructor() {
		app.initializeApp(firebaseConfig);

		// Referenciando a database para acessar em outros locais
		this.app = app.database();

		this.storage = app.storage();
	}

	login(email, password) {
		return app.auth().signInWithEmailAndPassword(email, password);
	}

	logout() {
		return app.auth().signOut();
	}

	async register(nome, email, password) {
		await app.auth().createUserWithEmailAndPassword(email, password);

		const uid = app.auth().currentUser.uid;

		return app.database().ref("usuarios").child(uid).set({ nome: nome });
	}

	isInitialized() {
		return new Promise((resolve) => {
			app.auth().onAuthStateChanged(resolve);
		});
	}
	getCurrent() {
		return app.auth().currentUser && app.auth().currentUser.email;
	}

	getCurrentUid() {
		return app.auth().currentUser && app.auth().currentUser.uid;
	}

	async getUserName(callback) {
		if (!app.auth().currentUser) {
			return null;
		}

		const uid = app.auth().currentUser.uid;
		await app.database().ref("usuarios").child(uid).once("value").then(callback);
	}
}

export default new Firebase();
