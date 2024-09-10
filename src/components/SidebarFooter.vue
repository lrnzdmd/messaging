<script setup>
import { logout } from '@/utils/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GearIcon } from '@radix-icons/vue';
import { DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger, } from '../components/ui/dropdown-menu';

  const props = defineProps({
  currUser: Object
});


</script>

<template>
    <div class="flex mx-1 gap-4 py-4 my-1 rounded-md items-center justify-evenly border border-black ">
        <Avatar class="border border-black">
          <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue"></AvatarImage>
          <AvatarFallback>{{ currUser.userName.substring(0,1) }}</AvatarFallback>
        </Avatar>
        <p class="text-2xl font-semibold">{{ currUser.userName }}</p>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <GearIcon class="h-6 w-6 hover:scale-105 cursor-pointer"></GearIcon>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem  @click="logout()" class="cursor-pointer">
              <span class="font-semibold text-red-600">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
      </div>
</template>