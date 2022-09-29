import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


import Box from '@mui/material/Box';
import Input from '@mui/material/Input';

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import { FetchUrl } from "../utils"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }),
);

const ariaLabel = { 'aria-label': 'description' };

export const Scheduler = () => {
    const classes = useStyles();
    const [type, setType] = React.useState("");
    const [facebook, setFacebook] = React.useState(false);
    const [instagram, setInstagram] = React.useState(false);
    const [dateTime, setDateTime] = React.useState("");
    const [textData, setTextData] = React.useState("")
    const [urlPic, setUrlPic] = React.useState("")


    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
    };
    const handleChangeFacebook = (event: SelectChangeEvent) => {
        setFacebook(!facebook);
    };
    const handleChangeInstagram = (event: SelectChangeEvent) => {
        setInstagram(!instagram);
    };

    const handleChangeDateTime = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setDateTime(event.target.value);
    };
    const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setTextData(event.target.value);
    };
    const handleChangeUrl = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setUrlPic(event.target.value);
    };

    const fetchAPIEffect = () => {
        console.log('tipo: ', type, "facebook: ", facebook, "instagram: ", instagram, "hora: ", dateTime, "text: ", textData, "data: ", urlPic)

        var linkToApi = []
        if (dateTime !== "") {

            var dateAndTimeList = dateTime.split("T")
            var date = dateAndTimeList[0]
            var timestr = dateAndTimeList[1]

            var date_list = date.split("-")
            var time_list = timestr.split(":")
            var year = date_list[0]
            var month = date_list[1]
            var day = date_list[2]
            var hour = time_list[0]
            var min = time_list[1]

            if (type === "1") {
                let urlToAppend = "/post/text/fb?msj=" + textData + "&day=" + day + "&month=" + month + "&year=" + year + "&hour=" + hour + "&min=" + min
                linkToApi.push(urlToAppend)
            }
            else if (type === "2") {
                if (instagram) {
                    let urlToAppend = "/post/media/ig?url_pic=" + urlPic + "msj=" + textData + "&day=" + day + "&month=" + month + "&year=" + year + "&hour=" + hour + "&min=" + min
                    linkToApi.push(urlToAppend)
                }
                if (facebook) {
                    let urlToAppend = "/post/media/fb?url_pic=" + urlPic + "msj=" + textData + "&day=" + day + "&month=" + month + "&year=" + year + "&hour=" + hour + "&min=" + min
                    linkToApi.push(urlToAppend)
                }
            }
            console.log(linkToApi)
        }

        async function fetchMyAPI() {
            const [data, error] = await FetchUrl()

            if (error) {
                console.error('_______________________')
                console.error('something went wrong (status)!!!')
                console.error(error)
                console.error('_______________________')
                return
            }
        }
        fetchMyAPI()
    }
    React.useEffect(fetchAPIEffect, [])


    function disabledButtonBoolean() {
        let disabled = true
        if ((type === "1") && (facebook) && (dateTime !== "") && (textData !== "")) {
            disabled = false
        }
        if ((type === "2") && (facebook || instagram) && (dateTime !== "") && (textData !== "") && (urlPic !== "")) {
            disabled = false
        }

        return (disabled)
    }

    return (
        <>

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="select-small">Option</InputLabel>
                <Select
                    labelId="select-small"
                    id="select-small"
                    value={type}
                    label="Option"
                    onChange={handleChange}
                >
                    <MenuItem value={"1"}>Text</MenuItem>
                    <MenuItem value={"2"}>Photo</MenuItem>
                </Select>

                <FormGroup>
                    <FormControlLabel control={<Checkbox onChange={handleChangeFacebook} />} label="Facebook" />
                    <FormControlLabel disabled={type === '1' ? true : false} control={<Checkbox onChange={handleChangeInstagram} />} label="Instagram" />
                </FormGroup>
                <TextField
                    id="datetime-local"
                    label="Date and Time"
                    type="datetime-local"
                    // defaultValue="2017-05-24T10:30"
                    value={dateTime}
                    onChange={handleChangeDateTime}
                    // onChange={handleChange}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

            </FormControl>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1 },
                }}
                noValidate
                autoComplete="off"
            >
                <Input placeholder="Text" inputProps={ariaLabel} multiline rows={4} value={textData} onChange={handleChangeText} />
                <Input disabled={type === '1' ? true : false} multiline rows={4} placeholder="URL PIC" inputProps={ariaLabel} value={urlPic} onChange={handleChangeUrl} />
            </Box>
            <Button variant="contained" endIcon={<SendIcon />}
                onClick={fetchAPIEffect}
                // disabled={type!==""?false:true}
                disabled={disabledButtonBoolean()}
            >
                Send
            </Button>


        </>
    )
}