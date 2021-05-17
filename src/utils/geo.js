import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class Geo {
    static async _getLocationAsync() {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
           throw new Error("权限不足")
        }
        let location = await Location.getCurrentPositionAsync();
        return location
      };
}