import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import NewChat from './views/NewChat.vue'
import Chat from './views/Chat.vue'
import Profile from './views/Profile.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/chat/:chatid',
    name: 'Chat',
    component: Chat,
    props: route => ({
      chatId: route.params.chatid,
    })
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
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
