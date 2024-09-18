<script setup>
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const props = defineProps({
  chat: Object,
});

</script>

<template>
<div class="flex items-center justify-between my-2 mx-2">
    <Avatar class="bg-indigo-300 border-black border">
        <AvatarImage src="" alt="@radix-vue"></AvatarImage>
        <AvatarFallback>{{ chat.name ? chat.name.substring(0, 1) :
            chat.participants[1].user.profile.fullName.substring(0,1) }}</AvatarFallback>
    </Avatar>
    <p class="font-semibold"> {{ chat.name ? chat.name : chat.participants[1].user.profile.fullName }} </p>
    <Badge>{{ chat.type }}</Badge>

</div>
<div class="min-w-full border-black border-t"></div>
</template>