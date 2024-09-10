<script setup>
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const props = defineProps({
  user: Object,
  currUser: Object
});

</script>

<template>
  <div v-if="user.nome !== currUser.userName" class="flex items-center justify-between my-2 mx-2">
    <Avatar class="bg-indigo-300 border border-black">
      <AvatarImage src="" alt="@radix-vue"></AvatarImage>
      <AvatarFallback>{{ user.nome.substring(0, 1) }}</AvatarFallback>
    </Avatar>
    <p class="font-semibold">{{ user.nome }}</p>
    <Badge :class="user.isOnline ? 'bg-emerald-600' : 'bg-gray-600 text-gray-400'">
      {{ user.isOnline ? 'Online' : 'Offline' }}
    </Badge>
  </div>
  <div v-if="user.nome !== currUser.userName" class="min-w-full border-black border-t"></div>
</template>