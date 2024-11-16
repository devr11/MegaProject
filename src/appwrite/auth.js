import { nanoid } from '@reduxjs/toolkit';
import conf from '../conf/conf.js';
import { Client, Account } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userId = nanoid(24); // Replace this if needed
            console.log("Generated userId:", userId);
            await this.account.create(userId, email, password, name);
            return this.login({ email, password });
        } catch (error) {
            console.error("AuthService :: createAccount :: error", error.message);
            console.error("Error details:", error.response); // Log additional details
            throw error;
        }
    }
    
    
    

    async login({ email, password }) {
        try {
            return await this.account.createSession(email, password);
        } catch (error) {
            console.error("AuthService :: login :: error", error);
            throw error;
        }
    }
    

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("AuthService :: getCurrentUser :: error", error);
            throw error;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("AuthService :: logout :: error", error);
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;
