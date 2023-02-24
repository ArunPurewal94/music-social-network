import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "./assets/tailwind.css";
import "./assets/global.css";
import "animate.css";
import "tw-elements";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
    faBars,
    faXmark,
    faGuitar,
    faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "./axios.js";

library.add(faBars, faXmark, faGuitar, faRightToBracket);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(pinia);
app.mount("#app");
