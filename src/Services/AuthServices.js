
import axios from "axios";
import { baseurl } from "../include/Urlinclude";
const API_AUTH_URL = baseurl+ "/user/authenticate";       
                                        

class AuthService
{
    async login(username, password) {

        // localStorage.removeItem("user");
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "email": username,
          "password": password
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        await fetch(API_AUTH_URL, requestOptions)
          .then(response => response.json())
          .then(result => {
            localStorage.removeItem("user");
            console.log("Old User Removed, Inside The Response before saving"+result);
            localStorage.setItem("user", JSON.stringify(result)); 
            console.log("New User added, Inside The Response after saving"+ result);   
            return result;
        }) 
        .catch(error => {        
          localStorage.removeItem("user")
          console.log("Old Error Removed, Inside The Catch before saving");
          localStorage.setItem("user", JSON.stringify(error));    
          console.log("New Error Added, Inside The Catch After saving");
          return error;
        })
    }

    logout() {
        return localStorage.removeItem("user");       
    }

    async getProfile(){
     
    }
    // register
    getCurrentUser() {
        return localStorage.getItem("user");
    }
}

// a new instance of the service will be create 
// kind of a factory pattern
export default new AuthService();