import React, {Component} from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Drawer from "@material-ui/core/Drawer";
import WriteArticle from "../component/Article/WriteArticle";
import ListArticles from "../component/Article/ListArticles";
import Grid from "@material-ui/core/Grid";
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import ImportContactsTwoToneIcon from '@material-ui/icons/ImportContactsTwoTone';
import ArticlePage from "../page/ArticlePage";

const Wrapper = (props) => {

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
                                        <ListItemText>
                                            Write article <CreateTwoToneIcon/>
                                        </ListItemText>
                                    </ListItem>
                                </List>
                            </Link>
                            <Link to="/articles">
                                <List>
                                    <ListItem button key={"Articles"}>
                                        <ListItemText>
                                            View articles <ImportContactsTwoToneIcon/>
                                        </ListItemText>
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
                                key={"write-article"}
                                path={"/"}
                                exact={true}
                                children={
                                    <WriteArticle/>
                                }
                            />
                            <Route
                                key={"article"}
                                path="/articles/:id"
                                exact={true}
                                children={
                                    <ArticlePage/>
                                }
                            />
                            <Route
                                key={"list-articles"}
                                path={"/articles"}
                                exact={true}
                                children={
                                    <ListArticles/>
                                }
                            />
                        </Switch>
                    </div>
                </Grid>
            </Grid>
        </Router>
    )
}

export default Wrapper;