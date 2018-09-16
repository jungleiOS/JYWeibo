import { AsyncStorage } from "react-native"

const storeData = async (key,value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log(error);
      // Error saving data
    }
}

const readData = async (key,callback) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // We have data!!
            console.log(value);
            callback(value);
        }
     } catch (error) {
            console.log(error);
            callback(undefined);
            // Error retrieving data
     }
}

export { storeData, readData};