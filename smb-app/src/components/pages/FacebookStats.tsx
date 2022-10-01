import * as React from "react"
import { Typography } from "@material-ui/core"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FetchUrl, IDataReactions } from "../utils"
import * as Constants from "../Constants"
import anger from '../icons/anger.svg'
import haha from '../icons/haha.svg'
import like from '../icons/like.svg'
import love from '../icons/love.svg'
import sorry from '../icons/sorry.svg'
import wow from '../icons/wow.svg'

const useStyles = makeStyles({
    logo: {
        width: "8%",
    },
    gridContainer: {
        paddingLeft: "40px",
        paddingRight: "40px",
        marginTop: "100px"
    }
});

export const FacebookStats= () => {

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
    // ejemplo de data que espera 
    data = [
        {
          "Id": "111644344858029_139836395453874",
          "Message": "muestra",
          "Reaction": [
            {
              "value": {
                "like": 1
              }
            }
          ],
          "created_time": "2022-10-01T15:57:00+0000"
        },
        {
          "Id": "111644344858029_139728378798009",
          "Message": "cuarenta",
          "Reaction": [
            {
              "value": {}
            }
          ],
          "created_time": "2022-10-01T08:40:00+0000"
        },
        {
          "Id": "111644344858029_139728285464685",
          "Message": "half time",
          "Reaction": [
            {
              "value": {
                "like": 1
              }
            }
          ],
          "created_time": "2022-10-01T08:39:00+0000"
        },
        {
          "Id": "111644344858029_139728165464697",
          "Message": "five seconds",
          "Reaction": [
            {
              "value": {}
            }
          ],
          "created_time": "2022-10-01T08:38:00+0000"
        },
        {
          "Id": "111644344858029_139728168798030",
          "Message": "prueba dos",
          "Reaction": [
            {
              "value": {}
            }
          ],
          "created_time": "2022-10-01T08:38:00+0000"
        }
      ]

    return (
        <>
            <Grid
                container
                spacing={4}
                className={classes.gridContainer}
                justifyContent="center"
            >
                {
                    fbReaction.map((item: IDataReactions) =>
                        // item.name === 'Dashboard' ? null : <Grid item key={item.name} xs={12} sm={6} md={4}>
                        <Grid item key={item.Id} xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">
                                        {item.Message}
                                        <br />
                                        <br />
                                    </Typography>
                                    <Typography component="div" gutterBottom>
                                    <img src={like} alt= "reaction like"className={classes.logo}/>{item.Reaction[0].value.like ? item.Reaction[0].value.like : 0}

                                    <img src={love} alt= "reaction love"className={classes.logo}/>{item.Reaction[0].value.love ? item.Reaction[0].value.love : 0}

                                    <img src={anger} alt= "reaction .anger"className={classes.logo}/> {item.Reaction[0].value.anger ? item.Reaction[0].value.anger : 0}

                                    <img src={sorry} alt= "reaction sorry"className={classes.logo}/>{item.Reaction[0].value.sorry ? item.Reaction[0].value.sorry : 0}

                                    <img src={wow} alt= "reaction wow"className={classes.logo}/>{item.Reaction[0].value.wow ? item.Reaction[0].value.wow : 0}

                                    <img src={haha} alt= "reaction haha"className={classes.logo}/>{item.Reaction[0].value.haha ? item.Reaction[0].value.haha : 0}
                                    </Typography>

                                </CardContent>
                                <CardActions>
                                    <Button href={"https://www.facebook.com/" + item.Id}
                                        onClick={funcionn}
                                        target="_blank" size="small" >Open Post</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                }

            </Grid>
        </>)
}