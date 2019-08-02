import { USER_LOGGED_IN, USER_LOGGED_OUT, LOADING_USER, USER_LOADED } from './actionTypes'
import axios from 'axios';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
    apiKey: "AIzaSyAlP1upCd8_Gl6FPu8qsrAZ5QHlnDc6438",
    authDomain: "reactnative-chat-3d7f7.firebaseapp.com",
    databaseURL: "https://reactnative-chat-3d7f7.firebaseio.com",
    projectId: "reactnative-chat-3d7f7"
  };

//const authBaseURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
//const API_KEY = 'AIzaSyAlP1upCd8_Gl6FPu8qsrAZ5QHlnDc6438'

export const userLogged = user => {
    return {
        type: USER_LOGGED_IN,
        payload: user
    }
}

export const logout = () => {
    return {
        type: USER_LOGGED_OUT
    }
}

export const createUser = user => {
    return dispatch => {
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(function(firebaseUser) {
            //console.warn(firebaseUser);
            var defaultDatabase = firebase.database();
            defaultDatabase.ref("users/" + firebaseUser.user.uid).set({
                name: user.name
              });
            console.log('Usuário criado com sucesso')
        })
        .catch(function(error) {
            console.error(error)
          });
        // axios.post(`${authBaseURL}/signupNewUser?key=${API_KEY}`, {
        //     email: user.email,
        //     password: user.password,
        //     returnSecureToken: true
        // })
        //     .catch(err => console.log(err))
        //     .then(res => {
        //         if (res.data.localId) {
        //             axios.put(`/users/${res.data.localId}.json`, {
        //                 name: user.name                          
        //             })
        //             .catch(err => console.log(err))
        //             .then(res => {
        //                 console.log('Usuário criado com sucesso!')
        //             })
        //         }
        //     })
    }
}

export const loadingUser = () => {
    return {
        type: LOADING_USER
    }
}

export const  userLoaded = () => {
    return {
        type: USER_LOADED
    }
}

export const login = user => {
    return dispatch => {
        dispatch(loadingUser());
        if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
        }
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(function(firebaseUser) {
                var defaultDatabase = firebase.database();
                defaultDatabase.ref("users/" + firebaseUser.user.uid).once("value", function(data) {
                    // do some stuff once
                    user.password = null;
                    user.name = data.val().name;
                    dispatch(userLogged(user));
                    dispatch(userLoaded());
                  })
            }).catch(function(error) {
                console.error(error);
            })
    }
}