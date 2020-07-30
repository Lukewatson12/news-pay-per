import React, {Component} from "react";
import {Drizzle} from "@drizzle/store";
import {drizzleReactHooks} from '@drizzle/react-plugin'
import store from "./redux/store";
import Wrapper from "./container/Wrapper";
import Container from "@material-ui/core/Container";
import "./App.css";
import drizzleOptions from "./drizzleOptions";

const drizzle = new Drizzle(
    drizzleOptions,
    store
);

class App extends Component {
    render() {
        return (
            <drizzleReactHooks.DrizzleProvider drizzle={drizzle}>
                {/*<Provider store={store}>*/}
                    <drizzleReactHooks.Initializer
                        error="There was an error."
                        loadingContractsAndAccounts="Also still loading."
                        loadingWeb3="Still loading."
                    >
                        <Container>
                            <Wrapper/>
                        </Container>

                    </drizzleReactHooks.Initializer>
                {/*</Provider>*/}
            </drizzleReactHooks.DrizzleProvider>
        );
    }
}

export default App;
