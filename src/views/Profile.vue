<script setup>
import { ArrowLeftIcon } from '@radix-icons/vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ref } from 'vue';
import axios from 'axios';
const profile = JSON.parse(localStorage.getItem('profile'));

async function editProfile() {
    const payload = { fullName: '', aboutMe: '' };
    fullName.value === '' ? payload.fullName = profile.profile.fullName : payload.fullName = fullName.value;
    aboutMe.value === '' ? payload.aboutMe = profile.profile.aboutMe : payload.aboutMe = aboutMe.value;
    try {
        const response = await axios.post('https://messagingapi-5u1z.onrender.com/editprofile', payload ,{
            headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}`},
        })
        // todo route sul server e prendere il nuovo profile token dalla route e sbatterlo in localstorage.
    } catch (error) {
        console.error('error editing profile: ', error);
    }
    
}

const fullName = ref('');
const aboutMe = ref('');
</script>

<template>
    <div class="flex border-b items-center border-black h-16">
    <RouterLink :to="{name: 'Home'}">
      <ArrowLeftIcon class="scale-125 mx-6 hover:scale-150 cursor-pointer"></ArrowLeftIcon>
    </RouterLink>
    <div class="h-full border-l border-black"></div>
    <div class="flex items-center gap-4 mx-4">
      <h1 class="font-semibold text-xl">Edit Profile</h1>
    </div>
  </div>
    
    <form @submit.prevent="editProfile()" class="self-center grid gap-2 my-auto">
     <div class="grid gap-2">
        <Label for="fullName">Display Name</Label>
        <Input id="fullName" :placeholder="profile.profile.fullName" v-model="fullName"></Input>
     </div>
     <div class="grid gap-2">
        <Label for="aboutMe">About Me</Label>
        <Input id="aboutMe" :placeholder="profile.profile.aboutMe" v-model="aboutMe"></Input>
     </div>
     <Button>Edit Profile</Button>
    </form>
</template>