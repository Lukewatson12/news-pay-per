import React, {Component} from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Drawer from "@material-ui/core/Drawer";
import WriteArticle from "../component/Article/WriteArticle";

class Routing extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <Drawer
                        variant="permanent"
                        anchor="left"
                    >
                        <Link to="/">
                            <List>
                                <ListItem button key={"Add article"}>
                                    <ListItemText primary={"Add article"}/>
                                </ListItem>
                            </List>
                        </Link>
                    </Drawer>
                </div>

                <div style={{flex: 1, padding: "10px"}}>
                    <Switch>
                        <Route
                            key={"index"}
                            path={"/"}
                            exact={true}
                            children={
                                <WriteArticle
                                    drizzle={this.props.drizzle}
                                    drizzleState={this.props.drizzleState}
                                />
                            }
                        />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default Routing;