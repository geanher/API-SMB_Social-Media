import * as React from "react"
import { Typography } from "@material-ui/core"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Grid } from "@material-ui/core";
import { FetchUrl, IDataReactions } from "../utils"
import * as Constants from "../Constants"
import anger from '../icons/anger.svg'
import haha from '../icons/haha.svg'
import like from '../icons/like.svg'
import love from '../icons/love.svg'
import sorry from '../icons/sorry.svg'
import wow from '../icons/wow.svg'
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { styled } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        logo: {
            width: "8%",
        },
        gridContainer: {
            paddingLeft: "40px",
            paddingRight: "40px",
            marginTop: "100px"
        },
        imagecontainer: {
            width: "350px",
        },
        status: {
            margin: "11px 0"
        }


    }),
);

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(6),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const FacebookStats = () => {

    const classes = useStyles();
    const [flagUpdate, setFlagUpdate] = React.useState(true)
    const [fbReaction, setFbReaction] = React.useState<IDataReactions[]>([]);
    const fetchAPIEffect = () => {
        async function fetchMyAPI() {
            const [data, error] = await FetchUrl(Constants.URL_BASE + Constants.URL_STATS_FACEBOOK)

            if (error) {
                console.error('_______________________')
                console.error('something went wrong (status)!!!')
                console.error(error)
                console.error('_______________________')
                alert("Problem with Facebook Token");
                return
            }

            setFbReaction(data)
        }
        fetchMyAPI()
    }
    React.useEffect(fetchAPIEffect, [flagUpdate])

    const funcionn = () => {
        setFlagUpdate(!flagUpdate);
    };
    return (
        <>
            <Grid
                container
                spacing={4}
                className={classes.gridContainer}
                justifyContent="center"
            >
                {
                    fbReaction.map((itemValue: IDataReactions) =>
                        // item.name === 'Dashboard' ? null : <Grid item key={item.name} xs={12} sm={6} md={4}>
                        <Grid item key={itemValue.Id} xs={12} sm={6} md={4}>
                            {/* <Card>
                                <CardContent>
                                    <Typography variant="h5">
                                        {item.url ? <img src={item.url} alt="image" className={classes.imagecontainer} /> : null}
                                        <Typography component="div"  variant="h5" gutterBottom className="status">

                                            POST: {item.Message}
                                        </Typography>
                                        <br />
                                        <br />
                                    </Typography>
                                    <Typography component="div" gutterBottom>
                                        <img src={like} alt="reaction like" className={classes.logo} /> {item.Reaction[0].value.like ? item.Reaction[0].value.like : 0}

                                        <img src={love} alt="reaction love" className={classes.logo} /> {item.Reaction[0].value.love ? item.Reaction[0].value.love : 0}

                                        <img src={anger} alt="reaction .anger" className={classes.logo} /> {item.Reaction[0].value.anger ? item.Reaction[0].value.anger : 0}

                                        <img src={sorry} alt="reaction sorry" className={classes.logo} /> {item.Reaction[0].value.sorry ? item.Reaction[0].value.sorry : 0}

                                        <img src={wow} alt="reaction wow" className={classes.logo} /> {item.Reaction[0].value.wow ? item.Reaction[0].value.wow : 0}

                                        <img src={haha} alt="reaction haha" className={classes.logo} /> {item.Reaction[0].value.haha ? item.Reaction[0].value.haha : 0}
                                    </Typography>

                                </CardContent>
                                <CardActions>
                                    <Button href={"https://www.facebook.com/" + item.Id}
                                        onClick={funcionn}
                                        target="_blank" size="small" >Open Post</Button>
                                </CardActions>
                            </Card> */}
                            <div id="wrapper">

                                <header className='cf'>
                                    <img src="http://2016.igem.org/wiki/images/e/e0/Uclascrolldown.png" className="arrow" alt="" />
                                    <img className='profile-pic' src={Constants.URL_PROFILE_CARD_IGNIS} alt="" />
                                    <h1 className="name">
                                        <a href="/#">Ignis Gravitas</a>
                                    </h1>
                                    {/* <p className="date">2 hr ago</p> */}
                                </header>

                                <p className="status">{itemValue.Message}</p>
                                <img className="img-content" src={itemValue.url} alt="" />
                                <Typography component="div" gutterBottom>
                                    <img src={like} alt="reaction like" className={classes.logo} /> {itemValue.Reaction[0].value.like ? itemValue.Reaction[0].value.like : 0}

                                    <img src={love} alt="reaction love" className={classes.logo} /> {itemValue.Reaction[0].value.love ? itemValue.Reaction[0].value.love : 0}

                                    <img src={anger} alt="reaction .anger" className={classes.logo} /> {itemValue.Reaction[0].value.anger ? itemValue.Reaction[0].value.anger : 0}

                                    <img src={sorry} alt="reaction sorry" className={classes.logo} /> {itemValue.Reaction[0].value.sorry ? itemValue.Reaction[0].value.sorry : 0}

                                    <img src={wow} alt="reaction wow" className={classes.logo} /> {itemValue.Reaction[0].value.wow ? itemValue.Reaction[0].value.wow : 0}

                                    <img src={haha} alt="reaction haha" className={classes.logo} /> {itemValue.Reaction[0].value.haha ? itemValue.Reaction[0].value.haha : 0}

                                    {/* {itemValue.Reaction[0].value.like ? <><img src={like} alt="reaction like" className={classes.logo} />{itemValue.Reaction[0].value.like}</>: null}
                                        {itemValue.Reaction[0].value.love ? <><img src={love} alt="reaction love" className={classes.logo} /> {itemValue.Reaction[0].value.love}</> : null}
                                        {itemValue.Reaction[0].value.anger ? <><img src={anger} alt="reaction .anger" className={classes.logo} /> {itemValue.Reaction[0].value.anger}</> : null}
                                        {itemValue.Reaction[0].value.sorry ? <><img src={sorry} alt="reaction sorry" className={classes.logo} /> {itemValue.Reaction[0].value.sorry}</> : null}
                                        {itemValue.Reaction[0].value.wow ? <><img src={wow} alt="reaction wow" className={classes.logo} /> {itemValue.Reaction[0].value.wow}</> : null}
                                        {itemValue.Reaction[0].value.haha ? <><img src={haha} alt="reaction haha" className={classes.logo} /> {itemValue.Reaction[0].value.haha}</> : null} */}

                                </Typography>

                            </div>

                        </Grid>
                    )
                }

            </Grid>
        </>)
}