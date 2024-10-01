#!/bin/sh
cd android/
./gradlew clean
./gradlew assembleRelease
# ./gradlew bundleRelease
cd ..
mkdir -p releases
cp android/app/build/outputs/apk/release/app-release.apk releases/TransportBill.apk
# cp android/app/build/outputs/bundle/release/app-release.aab releases/TransportBill.aab
echo "Android release builds created in AnimalKingdom/releases/"