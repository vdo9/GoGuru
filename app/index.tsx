import React from "react";
import { Redirect } from "expo-router"

const StartPage = () =>{
    return <Redirect href="./(tabs)" />;
    // this will take me to the tabs file and reference its stack layout
};

export default StartPage