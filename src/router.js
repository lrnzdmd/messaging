import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import NewChat from './views/NewChat.vue'
import Chat from './views/Chat.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/chat/:chatId',
    name: 'Chat',
    component: Chat,
    props: true
  },
  {
    path: '/new/chat/:userid-:username',
    name: 'NewChat',
    component: NewChat,
    props: route => ({
      userId: route.params.userid,
      username: decodeURIComponent(route.params.username.replace(/\+/g, ' '))
    }),
  },
  {
    path: '/new/groupchat/:id',
    name: 'NewGroupChat',
    component: Chat,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
