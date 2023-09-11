import AsyncStorage from "@react-native-async-storage/async-storage";


import { AUTH_STORAGE, USER_STORAGE } from './storageConfig';
import { UserDTO } from "@dtos/userDTO";

export async function storageUserSave(user: UserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
}

export async function storageUserGet() {
    const storage = await AsyncStorage.getItem(USER_STORAGE);
  
    const user: UserDTO = storage ? JSON.parse(storage) : {};
  
    return user
  }

  export async function storageUserRemove() {
    await AsyncStorage.removeItem(USER_STORAGE);
  }

  export async function storageAuthTokenGet() {
    const token = await AsyncStorage.getItem(AUTH_STORAGE);
  
    return token;
  }