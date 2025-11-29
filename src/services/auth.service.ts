import * as repo from '../services/auth.repo'
import { User } from "../model";

const URL = 'https://6fdd7d547540.ngrok-free.app/auth';

export async function login(username: string, password: string) {

    const response = await fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })

    if (response.ok) {
        const session: User = await response.json();
        await repo.setSession(session);
        return (!!session && !!session.token);
    }
    return false;
}
