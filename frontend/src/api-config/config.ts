import axios from "axios";
import { AuthReg } from "../types/interfaces/AuthReg"
const URL_API = 'http://localhost:3000/api/'
// const TOKEN : string | null = localStorage.getItem('token')
class HTTPService {
    private static token : string = ''
    // get tokenKey() {
    //     return this.token
    // }
    // set tokenKey(token: string) {
    //     this.token = token
    // }
    static getToken() : string {
            return this.token 
    }
    static authRegister(body: AuthReg) {
        const response = axios(`${URL_API}auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json'
            },
            data: JSON.stringify(body)
            
        }).then(response => {
            console.log(response);
            if (response.status === 201 && response.data && response.data.access_token) {
                localStorage.setItem('token', response.data.access_token)
                this.token = response.data.access_token
            }
            
        }).catch(error => {
            console.log(error);
        })
        // if (response) {
        //     console.log(response);
            
        // }
        // this.token = 
        console.log(response);
    }
    static getPlaylists() {
        const response = axios(`${URL_API}users/playlists`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFsZXhiYmRiIiwiaWQiOjMsImlhdCI6MTcyNTk2NTcxNCwiZXhwIjoxNzI2NTcwNTE0fQ.cCeHlFz7oVjmpo205WM1C3GbdGGOzMyMOKtKxayRvCI'
            }
        })
        console.log(response);
        
    }
    
}
export {HTTPService}