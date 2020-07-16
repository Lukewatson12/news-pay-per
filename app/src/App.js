import React from "react";
import {DrizzleContext} from "@drizzle/react-plugin";
import {Drizzle} from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import "./App.css";
import News from "./News";

const drizzle = new Drizzle(drizzleOptions);

const App = () => {
    return (
        <DrizzleContext.Provider drizzle={drizzle}>
            <DrizzleContext.Consumer>
                {drizzleContext => {
                    const {drizzle, drizzleState, initialized} = drizzleContext;

                    if (!initialized) {
                        return "Loading..."
                    }

                    return (
                        <News drizzle={drizzle} drizzleState={drizzleState}/>
                    )
                }}
            </DrizzleContext.Consumer>
        </DrizzleContext.Provider>
    );
}

export default App;
