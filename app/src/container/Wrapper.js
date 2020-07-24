import React, {Component} from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Drawer from "@material-ui/core/Drawer";
import WriteArticle from "../component/Article/WriteArticle";
import News from "../component/Article/News";
import Grid from "@material-ui/core/Grid";

class Routing extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Grid container spacing={2}>
                    <Grid item lg={1}>
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
                                <Link to="/articles">
                                    <List>
                                        <ListItem button key={"Articles"}>
                                            <ListItemText primary={"Articles"}/>
                                        </ListItem>
                                    </List>
                                </Link>
                            </Drawer>
                        </div>
                    </Grid>

                    <Grid item lg={11}>
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
                                <Route
                                    key={"ind2ex"}
                                    path={"/articles"}
                                    exact={true}
                                    children={
                                        <News
                                            drizzle={this.props.drizzle}
                                            drizzleState={this.props.drizzleState}
                                        />
                                    }
                                />
                            </Switch>
                        </div>
                    </Grid>
                </Grid>
            </Router>
        )
    }
}

export default Routing;