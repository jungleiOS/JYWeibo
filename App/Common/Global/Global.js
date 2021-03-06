import { Dimensions, Platform, Alert, PixelRatio} from 'react-native';
import { AsyncStorage } from "react-native"
// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
const Token = 'token'

const isIphoneX = () => {
    let screenW = Dimensions.get('window').width;
    let screenH = Dimensions.get('window').height;
    return (
        Platform.OS === 'ios' && ((screenH === X_HEIGHT && screenW === X_WIDTH) || (screenH === X_WIDTH && screenW === X_HEIGHT))
    )
}

const getToken = async () =>{
    let token = await AsyncStorage.getItem(Token);
    return token;
}

const headerHeight = () => {
    let iPhoneX = isIphoneX(); 
    if (Platform.OS === 'ios') {
        if (iPhoneX) {
            return 88;
        } else {
            return 64;
        }
    }
    else {
        return 56;
    }
}
// 导航栏高度
global.HEADER_HEIGHT = headerHeight();
// 屏幕高度
global.SCREEN_HEIGHT = Height;
// 屏幕宽度
global.SCREEN_WIDTH = Width;
// 判断iPhoneX
global.iPhoneX = isIphoneX();
// 系统是iOS
global.iOS = (Platform.OS === 'ios');
// 系统是安卓
global.Android = (Platform.OS === 'android');
// 弹出框
global.Alert = Alert;
// 获取屏幕分辨率
global.PixelRatio = PixelRatio.get();
// 最小线宽
global.pixel = 1 / PixelRatio;
global.Token = getToken();