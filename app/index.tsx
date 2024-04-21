import React from "react";
import { Redirect } from "expo-router"
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

const StartPage = () =>{
    // return <Redirect href="./(tabs)" />;
    return <Redirect href="./Auth" />;
    // this will take me to the tabs file and reference its stack layout
};

export default StartPage