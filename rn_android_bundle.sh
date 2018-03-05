#!/bin/sh

# 对变量赋值：
if [ $# -eq 0 ];
then
echo "input project name"
else
echo "start ......"

echo "start bundle react native source"
react-native bundle --platform android --dev false --entry-file index.js --bundle-output ${1}/app/src/main/assets/index.android.bundle --assets-dest ${1}/app/src/main/res/
fi

echo "successfully."
