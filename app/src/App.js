import React, {Component} from "react";
import {Drizzle, generateStore} from "@drizzle/store";
import {DrizzleContext} from "@drizzle/react-plugin";
import Wrapper from "./container/Wrapper";
import Container from "@material-ui/core/Container";
import "./App.css";
import drizzleOptions from "./drizzleOptions";

const drizzleStore = generateStore({drizzleOptions});

const drizzle = new Drizzle(drizzleOptions, drizzleStore);

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
                            <Container>
                                <Wrapper
                                    drizzle={drizzle}
                                    drizzleState={drizzleState}
                                >
                                </Wrapper>
                            </Container>
                        )
                    }}
                </DrizzleContext.Consumer>
            </DrizzleContext.Provider>
        );
    }
}

export default App;
