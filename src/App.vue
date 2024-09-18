<script setup>
import { Button } from '@/components/ui/button';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { isLoggedIn, login, logout } from './utils/useAuth';
import UsersList from './components/UsersList.vue';
import ChatsList from './components/ChatsList.vue';
import SidebarFooter from './components/SidebarFooter.vue';
import LoginRegister from './components/LoginRegister.vue'
import axios from 'axios';

const currUser = ref({ userId: '', userName: '' })
const route = useRoute();

const openTab = ref('Users');

const mobileMenuOpen = computed(() => {
  return route.path === '/';
});

async function refreshChatList() {
    const response = await axios.get(`https://messagingapi-5u1z.onrender.com/chatlist`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}`},
        });
        chats.value = response.data.chats 
        
}

async function refreshUserList() {
    const response = await axios.get(`https://messagingapi-5u1z.onrender.com/userlist`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}`},
        });
        users.value = response.data.users 
}

onMounted(async () => {
    if (isLoggedIn) {
        const profile = JSON.parse(localStorage.getItem('profile'));
        currUser.value.userId = profile.id;
        currUser.value.userName = profile.profile.fullName

        try {
            await refreshUserList();
            await refreshChatList();
            console.log(chats.value)
            console.log(users.value)
        } catch (error) {
            console.error('Error refreshing lists:', error);
        }
    }
})

const users = ref([]);

const chats = ref([]);

const messages = [
    {
        id: 1,
        author: "Mario Rossi",
        text: "Ciao, come stai?",
        sentAt: new Date("2023-01-15T09:30:00"),
        sentToChat: 101
    },
    {
        id: 2,
        author: "Luigi Bianchi",
        text: "Sto bene, grazie! E tu?",
        sentAt: new Date("2023-01-15T09:35:00"),
        sentToChat: 101
    },
    {
        id: 3,
        author: "Anna Verdi",
        text: "Buongiorno a tutti!",
        sentAt: new Date("2023-02-20T11:45:00"),
        sentToChat: 102
    },
    {
        id: 4,
        author: "Carlo Neri",
        text: "Qualcuno ha visto il mio libro?",
        sentAt: new Date("2023-03-01T14:20:00"),
        sentToChat: 103
    },
    {
        id: 5,
        author: "Maria Gialli",
        text: "Sì, l'ho visto sulla scrivania.",
        sentAt: new Date("2023-03-01T14:22:00"),
        sentToChat: 103
    }
];



function toggleSidebar(value) {
    openTab.value = value;
}

</script>

<template>
    <div class="flex w-screen h-screen">
        <div v-if="!isLoggedIn" class="self-center mx-auto">
            <LoginRegister></LoginRegister>
        </div>

        <div v-else class="lg:flex flex-col justify-between lg:w-1/5 w-screen"
            :class="!mobileMenuOpen ? 'hidden' : 'flex'">
            <div class="flex justify-center my-1">
                <Button @click="toggleSidebar('Users')"
                    class="flex-1 mx-1 border border-black text-current font-semibold bg-white hover:bg-teal-300">Users</Button>
                <Button @click="toggleSidebar('Chats')"
                    class="flex-1 mx-1 border border-black text-current font-semibold bg-white hover:bg-teal-300">Chats</Button>
            </div>
            <div class="flex flex-col mx-1 rounded-md border border-black flex-1 overflow-scroll">
                <div v-if="users.length < 1" class="flex flex-col w-full h-full ">
                    <div role="status" class="flex flex-col my-auto justify-center items-center">
                        <svg aria-hidden="true"
                            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600"
                            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill" />
                        </svg>
                        <h2 class="font-semibold">Loading...</h2>
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                
                <div v-else-if="openTab === 'Users'" v-for="user in users" :key="user.id"
                    class="hover:bg-teal-300 cursor-pointer">
                    <RouterLink :to="`/new/chat/${user.id}-${encodeURIComponent(user.profile.fullName.replace(/ /g, '+'))}`">
                        <UsersList :user="user"></UsersList>
                    </RouterLink>
                </div>
                <div v-else v-for="chat in chats" :key="chat.id" class="hover:bg-teal-300 cursor-pointer">
                    <RouterLink :to="`/chat/${chat.id}`">
                    <ChatsList :chat="chat"></ChatsList>
                    </RouterLink>
                </div>
                
            </div>
            <SidebarFooter :currUser="currUser"></SidebarFooter>
        </div>
        <div v-if="isLoggedIn" class="lg:flex lg:flex-col lg:mr-1 flex-1 border border-black rounded-md mr-1 mx-1 my-1"
            :class="mobileMenuOpen ? 'hidden' : 'flex flex-col'">
            <RouterView></RouterView>
        </div>
    </div>
</template>
