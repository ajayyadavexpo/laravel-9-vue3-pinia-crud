import './bootstrap';

import { createApp } from 'vue'

import { createPinia } from 'pinia'

import post from './components/Post.vue'

createApp(post)
    .use(createPinia())
    .mount("#app")
