<script setup>
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input'
import { ArrowLeftIcon,  ImageIcon, PaperPlaneIcon } from '@radix-icons/vue';
import axios from 'axios';
import { ref, defineProps, onMounted } from 'vue';
import { isLoggedIn, login, logout } from '../utils/useAuth';


onMounted(async () => {
  if (isLoggedIn) {
        const profile = JSON.parse(localStorage.getItem('profile'));
        currUser.value.userId = profile.id;
        currUser.value.userName = profile.profile.fullName
  }
  const response = await axios.get(`https://messagingapi-5u1z.onrender.com/chat/${props.chatId}`,  { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}`} });
      if (response.data.chat) {
      chat.value = response.data.chat;
      }
      console.log(chat.value)
      console.log('Current User ID:', currUser.value.userId);

const partecip = chat.value.participants.find(user => user.userId !== currUser.value.userId);

if (partecip) {
  receiverName.value = partecip.user.profile.fullName;
}
    
})

const props = defineProps({
  chatId: {
    type: String,
    required: true,
    validator: (value) => value.length > 0
  }
});

async function submitNewMessage() {
  if (message !== ''){
  try {
    const response = axios.post(`https://messagingapi-5u1z.onrender.com/new/message/${props.chatId}`, { message: message } , {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}`},
        });
        // TODO
       
  } catch (error) {
    console.error('Error creating chat', error)
  }
}
}
const currUser = ref({ userId: '', userName: '' })
const chat = ref('');
const message = ref('');
const receiverName = ref('');
</script>

<template>
  <div class="flex border-b items-center border-black h-16">
    <RouterLink :to="{name: 'Home'}">
      <ArrowLeftIcon class="scale-125 mx-6 hover:scale-150 cursor-pointer"></ArrowLeftIcon>
    </RouterLink>
    <div class="h-full border-l border-black"></div>
    <div class="flex items-center gap-4 mx-4">

      <Avatar class="border border-black">
        <AvatarImage src="" alt="@radix-vue"></AvatarImage>
        <AvatarFallback>{{ receiverName.substring(0,1) }}</AvatarFallback>
      </Avatar>
      <h1 class="font-semibold text-xl">{{receiverName}}</h1>
    </div>
  </div>
  <div class="h-full">
    <div v-for="message in chat.messages" :key="message.id" class="flex flex-col">
      <div :class="message.senderId === currUser.userId ? 'self-end' : 'self-start'" class="mx-2 my-1">
        <p class="rounded-md border border-black p-2"> {{ message.text }}</p>
        <p class="text-sm">{{ message.sentAt.substring(11,16) }}</p>
      </div>
    </div>
  </div>
  <div class="border-t border-black h-16">
    <form @submit.prevent="submitNewMessage()" class="flex items-center justify-center gap-1 h-full px-1 py-1">
      <div class="h-4/5 rounded-md border border-black aspect-square flex justify-center items-center">
        <ImageIcon class="scale-150"></ImageIcon>
      </div>
      <Input v-model="message" class="my-auto w-full h-4/5 border-black"></Input>
      <button class="h-4/5 rounded-md border border-black aspect-square flex justify-center items-center">
        <PaperPlaneIcon class="scale-150"></PaperPlaneIcon>
      </button>
    </form>
  </div>
</template>