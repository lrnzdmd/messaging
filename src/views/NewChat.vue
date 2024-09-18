<script setup>
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input'
import { ArrowLeftIcon,  ImageIcon, PaperPlaneIcon } from '@radix-icons/vue';
import axios from 'axios';
import { ref, defineProps, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();



const props = defineProps({
  userId: {
    type: String,
    required: true,
    validator: (value) => value.length > 0
  },
  username: {
    type: String,
    required: true,
    default: 'Utente Sconosciuto'
  }
});

async function submitNewChat() {
  if (message !== ''){
  try {
    const response = await axios.post(`https://messagingapi-5u1z.onrender.com/new/chat/${props.userId}`, { message: message.value } , {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}`},
        });
        const chatId = response.data.newMessage.chatId;
        router.push(`/chat/${chatId}`);
  } catch (error) {
    console.error('Error creating chat', error)
  }
}
}

const message = ref('');
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
        <AvatarFallback>M</AvatarFallback>
      </Avatar>
      <h1 class="font-semibold text-xl">{{props.username}}</h1>
    </div>
  </div>
  <div class="h-full">

  </div>
  <div class="border-t border-black h-16">
    <form @submit.prevent="submitNewChat()" class="flex items-center justify-center gap-1 h-full px-1 py-1">
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