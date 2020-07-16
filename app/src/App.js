import React, {Component} from "react";
import {DrizzleContext} from "@drizzle/react-plugin";
import {Drizzle} from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import "./App.css";
import News from "./News";
import Article from "./component/Article/Article";

const drizzle = new Drizzle(drizzleOptions);

class App extends Component {
    render() {
        return (
            <DrizzleContext.Provider drizzle={drizzle}>
                <DrizzleContext.Consumer>
                    {drizzleContext => {
                        const {drizzle, drizzleState, initialized} = drizzleContext;

                        if (!initialized) {
                            return "Loading..."
                        }

                        return (
                            <div>
                                {/*<News drizzle={drizzle} drizzleState={drizzleState}/>*/}
                                <Article id={1} drizzle={drizzle} drizzleState={drizzleState}/>
                            </div>
                        )
                    }}
                </DrizzleContext.Consumer>
            </DrizzleContext.Provider>
        );
    }
}

export default App;
