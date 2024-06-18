import { connect } from "@/libs/dbConnect";

connect();

class UserService {
    async getAllUsers() {
        try {
            const response = await fetch('/api/dashboard/users/all');
            if (response.ok) {
                const data = response.json();
                return data
            }
        } catch (error) {
            console.error('Error get all users', error);
        }
    }
}

export const userService = new UserService();