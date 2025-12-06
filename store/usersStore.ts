import { create } from 'zustand';
import { usersAPI } from '@/lib/api';
import { User } from '@/types';

interface UsersState {
    users: User[];
    total: number;
    loading: boolean;
    error: string | null;
    cache: Map<string, any>;

    fetchUsers: (limit: number, skip: number) => Promise<void>;
    searchUsers: (query: string) => Promise<void>;
    getUserById: (id: string) => Promise<User | null>;
    clearCache: () => void;
}

export const useUsersStore = create<UsersState>((set, get) => (
    {
        users: [],
    total: 0,
    loading: false,
    error: null,
    cache: new Map(),

    fetchUsers: async (limit: number, skip: number) => {
        const cacheKey = `users-${limit}-${skip}`;
        const cached = get().cache.get(cacheKey);

        if(cached){
            set({users: cached.users, total: cached.total});
            return;
        }

        set({loading: true, error: null});

        try {
            const response = await usersAPI.getUsers(limit, skip);
            const {users, total} = response.data;

            get().cache.set(cacheKey, {users, total});

            set({users, total, loading: false});
        }catch(error: any){
            set({error: error.message, loading: false});
        }
    },

    searchUsers: async(query: string) => {
        const cacheKey = `search-${query}`;
        const cached = get().cache.get(cacheKey);

        if(cached){
            set({users: cached.users, total: cached.total});
            return;
        }

        set({loading: true, error: null});
        try{
            const response = await usersAPI.searchUsers(query);
            const {users, total} = response.data;

            get().cache.set(cacheKey, {users, total});
            set({users, total, loading: false});
        }catch(error: any){
            set({error: error.message, loading: false});
        }
    },

    getUserById: async (id: string) => {
        const cacheKey = `user-${id}`;
        const cached = get().cache.get(cacheKey);

        if(cached){
            return cached;
        }

        try{
            const response = await usersAPI.getUserById(id);
            const user = response.data;

            get().cache.set(cacheKey, user);
            return user;
        }catch(error){
            console.log(`Failed to fetch user:`, error);
            return null;
        }
    },


    clearCache: () => {
        set({cache: new Map()});
    },

    }
));
