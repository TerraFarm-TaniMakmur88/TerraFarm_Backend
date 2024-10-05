import supabase from "../supabaseClient";

interface User {
  id?: bigint;
  created_at?: string;
  email: string;
  name: string;
  password: string;
  location: string;
}

export const getUserById = async (id: bigint) => {
  const { data, error } = await supabase
    .from('User')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const createUser = async (user: User) => {
  const { data, error } = await supabase
    .from('User')
    .insert([user])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};