import axios from 'axios';

const setAuthToken = token => {
    if(token) { 
      axios.defaults.headers.common['x-auth-token'] = token;  //set the token to the headers if there is a token
    }
    else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;