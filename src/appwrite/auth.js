import conf from "../config/conf";

import { Client, Account, ID } from "appwrite";

export class AuthService{

    client = new Client();

    account ;

    constructor(){
        this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId) ; 
        this.account = new Account(this.client)
    }

    async createAccount ({email , password ,  name }){
        try {
           const userAccount = await this.account.create(ID.unique(),email,password,name) ;
           console.log("ACCOUNT CREATED:", userAccount); 

           if(userAccount) {
                // console.log("SESSION CREATED:", session);
            return this.login({email , password});
            // if user account is being created then , call login 
           }
            
           else {
            return userAccount; 
           }
        } catch (error) {
              console.log("CREATE ACCOUNT ERROR:", error);

            throw error
           
        }
    }

    async login({email,password}){
        
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        // to check , whether currrent user is logged in 
        try {
            return await this.account.get()
        } catch (error) {
            console.log(error)
           return null
        }

        return null;
    }

    async logout(){

        try {
            await this.account.deleteSessions()

            // use deleteSessions to delete all sessions in every browser 
            // and use deleteSession to elete a single session , with a session id 
            
        } catch (error) {
            console.log("Appwrite service :: logout :: error" , error )
        }
    }
}

const authService = new AuthService();

export default authService
