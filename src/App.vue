<script setup>
import { Button } from '@/components/ui/button';
import { ref, onMounted } from 'vue';
import { isLoggedIn, login, logout } from './utils/useAuth';
import UsersList from './components/UsersList.vue';
import ChatsList from './components/ChatsList.vue';
import SidebarFooter from './components/SidebarFooter.vue';
import LoginRegister from './components/LoginRegister.vue'

const currUser = ref({ userId: '', userName: '' })

const openTab = ref('Users');


onMounted(() => {
    if (isLoggedIn) {
        const profile = JSON.parse(localStorage.getItem('profile'));
        currUser.value.userId = profile.id;
        currUser.value.userName = profile.profile.fullName
    }
})

const users = [
    {
        id: 1,
        nome: "Mario Rossi",
        isOnline: true
    },
    {
        id: 2,
        nome: "Luigi Bianchi",
        isOnline: false
    },
    {
        id: 3,
        nome: "Anna Verdi",
        isOnline: true
    },
    {
        id: 4,
        nome: "Carlo Neri",
        isOnline: false
    },
    {
        id: 5,
        nome: "Maria Gialli",
        isOnline: true
    }
];

const chats = [
    {
        id: 1,
        type: 'direct',
        name: null, // Direct chat doesn't need a name
        participants: [
            { userId: 1, userName: "Mario Rossi" },
            { userId: 2, userName: "Luigi Bianchi" }
        ],
        lastMessage: {
            text: "Ciao, come stai?",
            sentAt: new Date("2023-09-01T09:30:00"),
            senderId: 1
        }
    },
    {
        id: 2,
        type: 'group',
        name: "Amici del Calcio",
        participants: [
            { userId: 1, userName: "Mario Rossi" },
            { userId: 3, userName: "Anna Verdi" },
            { userId: 4, userName: "Carlo Neri" }
        ],
        lastMessage: {
            text: "A che ora ci troviamo domani?",
            sentAt: new Date("2023-09-02T14:45:00"),
            senderId: 3
        }
    },
    {
        id: 3,
        type: 'group',
        name: "Lavoro",
        participants: [
            { userId: 1, userName: "Mario Rossi" },
            { userId: 4, userName: "Carlo Neri" },
            { userId: 5, userName: "Maria Gialli" }
        ],
        lastMessage: {
            text: "Il meeting è stato spostato alle 15:00.",
            sentAt: new Date("2023-09-03T10:20:00"),
            senderId: 5
        }
    }
];

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
        
        <div v-else class="flex flex-col justify-between lg:w-1/5">
            <div class="flex justify-center my-1">
                <Button @click="toggleSidebar('Users')"
                    class="flex-1 mx-1 border border-black text-current font-semibold bg-white hover:bg-teal-300">Users</Button>
                <Button @click="toggleSidebar('Chats')"
                    class="flex-1 mx-1 border border-black text-current font-semibold bg-white hover:bg-teal-300">Chats</Button>
            </div>
            <div class="flex flex-col mx-1 rounded-md border border-black flex-1 overflow-scroll">

                <div v-if="openTab === 'Users'" v-for="user in users" :key="user.id"
                    class="hover:bg-teal-300 cursor-pointer">
                    <UsersList :user="user" :currUser="currUser"></UsersList>
                </div>
                <div v-else v-for="chat in chats" :key="chat.id" class="hover:bg-teal-300 cursor-pointer">
                    <ChatsList :chat></ChatsList>
                </div>
            </div>
            <SidebarFooter :currUser="currUser"></SidebarFooter>
        </div>
        <div v-if="isLoggedIn" class="flex-1 border border-black rounded-md mr-1 my-1">

        </div>
    </div>
</template>
