#!/bin/sh

echo "start bundle react native source"
react-native bundle --entry-file index.js --platform ios --dev false --bundle-output xhy-app/bundle/ios.jsbundle --assets-dest xhy-app/bundle

echo "successfully."
