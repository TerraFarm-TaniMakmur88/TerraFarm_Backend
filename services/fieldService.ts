import supabase from "../supabaseClient";

interface Field {
  id?: bigint;
  created_at?: string;
  userId?: bigint;
  cropName: string;
  area: string;
  soilType: string;
}

export const getFieldByUserId = async (userId: bigint) => {
    let { data: Field, error } = await supabase
    .from('Field')
    .select('*').eq('userId', userId);

  if (error) {
    throw new Error(error.message);
  }
  return Field;
};

export const getFieldById = async (id: bigint) => {
    let { data: Field, error } = await supabase
    .from('Field')
    .select('*').eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
  return Field;
};

export const createField = async (field: Field) => {
    const { data, error } = await supabase
    .from('Field')
    .insert([
        { userId: field.userId, cropName: field.cropName, area: field.area, soilType: field.soilType },
    ])
    .select();
    
    if (error) {
        throw new Error(error.message);
    }
    return data;
}

export const updateField = async (field: Field) => {
    const { data, error } = await supabase
    .from('Field')
    .update({ cropName: field.cropName, area: field.area, soilType: field.soilType })
    .eq('id', field.id)
    .select();
    
    if (error) {
        throw new Error(error.message);
    }
    return data;
}

export const deleteField = async (id: bigint) => {
    const { error } = await supabase
    .from('Field')
    .delete()
    .eq('id', id);
    
    if (error) {
        throw new Error(error.message);
    }
    return true;
}