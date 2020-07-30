import React, {useCallback, useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import {drizzleReactHooks} from "@drizzle/react-plugin";

const WriteArticle = () => {
    const {useCacheSend} = drizzleReactHooks.useDrizzle()

    const {defaultAccount} = drizzleReactHooks.useDrizzleState(drizzleState => ({
        defaultAccount: drizzleState.accounts[0]
    }))

    const [description, setDescription] = useState("asdas");
    const [price, setPrice] = useState(0);

    const {send} = useCacheSend(
        'NewsPayPer',
        'addArticle'
    );

    const payload = {
        "from": defaultAccount,
        "gas": 300000
    }

    return (
        <form onSubmit={(event => event.preventDefault())}>
            <Grid container spacing={2}>
                <Grid item lg={12}>
                    <h3>Write a new article</h3>
                </Grid>
                <Grid item lg={12}>
                    <TextField
                        label="Description"
                        onChange={event => setDescription(event.target.value)}
                        value={description}
                        fullWidth={true}
                    />
                </Grid>
                <Grid item lg={12}>
                    <TextField
                        label="Price"
                        type="number"
                        onChange={event => setPrice(event.target.value)}
                        value={price}
                        fullWidth={true}
                    />
                </Grid>
                <hr/>
                <Grid item lg={12}>
                    <Button
                        type="submit"
                        variant="outlined"
                        color="primary"
                        onClick={
                            useCallback(
                                () => send(description, price, payload),
                                [description, price, payload]
                            )
                        }
                    >
                        Add article
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default WriteArticle;