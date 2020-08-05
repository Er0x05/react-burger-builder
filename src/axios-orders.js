import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://date-for-burger.firebaseio.com/',

});

export default instance;