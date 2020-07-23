import React, {Component} from "react";
import {DrizzleContext} from "@drizzle/react-plugin";
import {Drizzle} from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import "./App.css";
import Wrapper from "./container/Wrapper";
import Container from "@material-ui/core/Container";

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
