<script setup>
import { ref } from 'vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const props = defineProps({
  chat: Object,
});

const currUser = localStorage.getItem('profile');
const username = ref('')

props.chat.participants.forEach(element => {
  if (element.userId !== parseInt(currUser.id)) {
    username.value = element.user.profile.fullName
  }
  console.log('userid: ',element)
})

</script>

<template>
<div class="flex items-center justify-between my-2 mx-2">
    <Avatar class="bg-indigo-300 border-black border">
        <AvatarImage src="" alt="@radix-vue"></AvatarImage>
        <AvatarFallback>{{ chat.name ? chat.name.substring(0, 1) :
            username.substring(0,1) }}</AvatarFallback>
    </Avatar>
    <p class="font-semibold"> {{ chat.name ? chat.name : username }} </p>
    <Badge>{{ chat.type }}</Badge>

</div>
<div class="min-w-full border-black border-t"></div>
</template>