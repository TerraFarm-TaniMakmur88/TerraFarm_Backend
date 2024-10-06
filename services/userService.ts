import supabase from "../supabaseClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface User {
    id?: bigint;
    created_at?: string;
    email: string;
    name: string;
    password: string;
    location?: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "";

export class UserService {
    async getUserById(id: bigint) {
        const { data, error } = await supabase
            .from('User')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    async createUser(user: User) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const { data, error } = await supabase
            .from('User')
            .insert([{ ...user, password: hashedPassword }])
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    async login(email: string, password: string) {
        const { data, error } = await supabase
            .from('User')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !data) {
            throw new Error('Invalid email or password');
        }

        const passwordMatch = await bcrypt.compare(password, data.password);
        if (!passwordMatch) {
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign({ id: data.id, name: data.name }, JWT_SECRET, {
            expiresIn: '1h',
        });

        return { user: data, token };
    }

    async updateLocation(id: bigint, location: string) {
        const { data, error } = await supabase
            .from('User')
            .update({ location: location })
            .eq('id', id)
            .select();

        if (error) {
            throw new Error(error.message);
        }
        return data[0].location;
    }
}

// import supabase from "../supabaseClient";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// interface User {
//   id?: bigint;
//   created_at?: string;
//   email: string;
//   name: string;
//   password: string;
//   location?: string;
// }

// const JWT_SECRET = process.env.JWT_SECRET || "";

// export const getUserById = async (id: bigint) => {
//   const { data, error } = await supabase
//     .from('User')
//     .select('*')
//     .eq('id', id)
//     .single();

//   if (error) {
//     throw new Error(error.message);
//   }
//   return data;
// };

// export const createUser = async (user: User) => {
//   const hashedPassword = await bcrypt.hash(user.password, 10);
//   const { data, error } = await supabase
//     .from('User')
//     .insert([{ ...user, password: hashedPassword }])
//     .select()
//     .single();

//   if (error) {
//     throw new Error(error.message);
//   }
//   return data;
// };

// export const login = async (email: string, password: string) => {
//   const { data, error } = await supabase
//     .from('User')
//     .select('*')
//     .eq('email', email)
//     .single();

//   if (error || !data) {
//     throw new Error('Invalid email or password');
//   }

//   const passwordMatch = await bcrypt.compare(password, data.password);
//   if (!passwordMatch) {
//     throw new Error('Invalid email or password');
//   }

//   const token = jwt.sign({ id: data.id, name: data.name }, JWT_SECRET, {
//     expiresIn: '1h',
//   });

//   return { user: data, token };
// };

// export const updateLocation = async (id: bigint, location: string) => {
  
//   const { data, error } = await supabase
//   .from('User')
//   .update({ location: location })
//   .eq('id', id)
//   .select();
        
//   if (error) {
//     throw new Error(error.message);
//   }
//   return data[0].location;
// };