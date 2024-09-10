<script setup>
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { ref } from 'vue';
import { isLoggedIn, login, logout } from '../utils/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const errorMsg = ref({error: true, message: ''});

const loginReg = ref('Login');
const regUsername = ref('');
const regFullName = ref('');
const regPwd = ref('');
const regPwdConf = ref('');

const loginUsername = ref('');
const loginPwd = ref('');

function handleLoginRouting(value) {
    loginReg.value = value;
}

async function submitLogin() {
    try {
        const response = await axios.post('https://messagingapi-5u1z.onrender.com/login', {
            username: loginUsername.value,
            password: loginPwd.value,
        });

        login(response.data.token, response.data.profile);
        window.location.reload();

    } catch (error) {
        errorMsg.value.error = true;
        errorMsg.value.message = 'Incorrect username or password.'
    }
}

async function submitRegistration() {
    if (regPwd.value !== regPwdConf.value) {
        errorMsg.value.error = true;
        return errorMsg.value.message = 'Password does not match.'
    }

    try {
        const response = await axios.post('https://messagingapi-5u1z.onrender.com/register', {
            username: regUsername.value,
            password: regPwd.value,
            fullName: regFullName.value,
        });

        errorMsg.value.error = false;
        return errorMsg.value.message = 'Account created successfully.'
    } catch (error) {
        errorMsg.value = 'Error creating account.'
    }


}
</script>

<template>
    <div v-if="loginReg !== 'Login'">
        <Card class="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle class="text-xl">
                    Sign Up
                </CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form @submit.prevent="submitRegistration()" class="grid gap-4">
                    <div class="grid gap-2">
                        <Label for="fullName">Display name</Label>
                        <Input id="fullName" v-model="regFullName" placeholder="Max" required />
                    </div>
                    <div class="grid gap-2">
                        <Label for="email">Email</Label>
                        <Input id="email" v-model="regUsername" type="email" placeholder="any@email.works" required />
                    </div>
                    <div class="grid gap-2">
                        <Label for="password">Password</Label>
                        <Input id="password" v-model="regPwd" type="password" required />
                    </div>
                    <div class="grid gap-2">
                        <Label for="passwordConfirmation">Confirm Password</Label>
                        <Input id="passwordConfirmation" v-model="regPwdConf" type="password" required />
                    </div>
                    <p :class="errorMsg.error ? 'text-red-600 text-sm' : 'text-emerald-600 text-sm'">{{ errorMsg.message }}</p>
                    <Button type="submit"
                        class="w-full bg-teal-500 hover:bg-teal-300 transition duration-300 ease-in-out">
                        Create an account
                    </Button>

                </form>
                <div class="mt-4 text-center text-sm">
                    Already have an account?
                    <a @click="handleLoginRouting('Login')" class="underline cursor-pointer">
                        Login
                    </a>
                </div>
            </CardContent>
        </Card>
    </div>
    <div v-else>
        <Card class="w-full max-w-sm">
            <CardHeader>
                <CardTitle class="text-2xl">
                    Login
                </CardTitle>
                <CardDescription>
                    Enter your email below to login to your account.
                </CardDescription>
            </CardHeader>
            <form @submit.prevent="submitLogin()">
                <CardContent class="grid gap-4">

                    <div class="grid gap-2">
                        <Label for="email">Email</Label>
                        <Input id="email" v-model="loginUsername" type="email" placeholder="your@email.here" required />
                    </div>
                    <div class="grid gap-2">
                        <Label for="password">Password</Label>
                        <Input id="password" v-model="loginPwd" type="password" required />
                    </div>
                    <p class="text-red-600 text-sm">{{ errorMsg.message }}</p>
                </CardContent>

                <CardFooter class="flex flex-col">
                    <Button type="submit"
                        class="w-full bg-teal-500 hover:bg-teal-300 transition duration-300 ease-in-out">
                        Login
                    </Button>

                    <div class="mt-4 text-center text-sm">
                        Not a member yet?
                        <a @click="handleLoginRouting('Register')" class="underline cursor-pointer">
                            Register
                        </a>
                    </div>

                </CardFooter>
            </form>
        </Card>
    </div>

</template>