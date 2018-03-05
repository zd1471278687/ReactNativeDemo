import { AppRegistry } from 'react-native';
//import App from './App';

//AppRegistry.registerComponent('BFReactNative', () => App);

let routes = [
    //common
    require('./js/common/core'),
    //page
    require('./js/modules/bfCity/route'),
    require('./js/modules/bfMessage/route'),
];

routes.forEach((val) => {
    if(val && val.route) {
        for(let route in val.route) {
            AppRegistry.registerComponent(route, () => val.route[route]);
        }
    }
});
