import { ref } from 'vue';

const isLoggedIn = ref(localStorage.getItem('jwtToken') ? true : false);


    function login(token, profile) {
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('profile', profile);
        isLoggedIn.value = true;
    }

    function logout() {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('profile');
        isLoggedIn.value = false;
    }
    

    export {
        isLoggedIn,
        login,
        logout
    };
