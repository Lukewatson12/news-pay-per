import React, {Component} from "react";
import News from "../News";
import Grid from "@material-ui/core/Grid";

class Wrapper extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid container spacing={3}>
                <News
                    drizzle={this.props.drizzle}
                    drizzleState={this.props.drizzleState}
                />
                {/*<Article id={1} drizzle={drizzle} drizzleState={drizzleState}/>*/}
            </Grid>
        )
    }
}

export default Wrapper;