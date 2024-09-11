<script setup>
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const props = defineProps({
  user: Object,
});

</script>

<template>
  <div class="flex items-center justify-between my-2 mx-2">
    <Avatar class="bg-indigo-300 border border-black">
      <AvatarImage src="" alt="@radix-vue"></AvatarImage>
      <AvatarFallback>{{ user.profile.fullName.substring(0, 1) }}</AvatarFallback>
    </Avatar>
    <p class="font-semibold">{{ user.profile.fullName }}</p>
    <Badge :class="user.profile.isOnline ? 'bg-emerald-600' : 'bg-gray-600 text-gray-400'">
      {{ user.profile.isOnline ? 'Online' : 'Offline' }}
    </Badge>
  </div>
  
</template>