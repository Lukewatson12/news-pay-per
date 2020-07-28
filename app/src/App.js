import React, {Component} from "react";
import {Drizzle, generateStore} from "@drizzle/store";
import {DrizzleContext} from "@drizzle/react-plugin";
import store from "./redux/store";
import Wrapper from "./container/Wrapper";
import Container from "@material-ui/core/Container";
import "./App.css";
import drizzleOptions from "./drizzleOptions";
import {Provider} from "react-redux";

const drizzleStore = generateStore({
    drizzleOptions
});

const drizzle = new Drizzle(
    drizzleOptions,
    drizzleStore
);

class App extends Component {
    render() {
        return (
            <DrizzleContext.Provider drizzle={drizzle}>
                <Provider store={store}>
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
                </Provider>
            </DrizzleContext.Provider>
        );
    }
}

export default App;
