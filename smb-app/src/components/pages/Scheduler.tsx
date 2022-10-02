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
import * as Constants from "../Constants"

import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Facebook from '../icons/Facebook.svg'
import { InstagramCard } from "../InstagramCard"
import { FacebookCard } from "../FacebookCard"


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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(6),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export const Scheduler = () => {
    const classes = useStyles();
    const [type, setType] = React.useState("");
    const [facebook, setFacebook] = React.useState(false);
    const [instagram, setInstagram] = React.useState(false);
    const [dateTime, setDateTime] = React.useState("");
    const [textData, setTextData] = React.useState("")
    const [urlPic, setUrlPic] = React.useState("")
    const [open, setOpen] = React.useState(false);


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
        var linkToApi: string[] = []
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
                let urlToAppend = Constants.URL_TEXT_FB + "?msj=" + textData + "&day=" + day + "&month=" + month + "&year=" + year + "&hour=" + hour + "&minuts=" + min
                linkToApi.push(urlToAppend)
            }
            else if (type === "2") {
                if (instagram) {
                    let urlToAppend = Constants.URL_MEDIA_IG + "?url_pic=" + urlPic + "&text_pic=" + textData + "&day=" + day + "&month=" + month + "&year=" + year + "&hour=" + hour + "&minuts=" + min
                    linkToApi.push(urlToAppend)
                }
                if (facebook) {
                    let urlToAppend = Constants.URL_MEDIA_FB + "?url_pic=" + urlPic + "&text_pic=" + textData + "&day=" + day + "&month=" + month + "&year=" + year + "&hour=" + hour + "&minuts=" + min
                    linkToApi.push(urlToAppend)
                }
            }
            else if (type === "3") {
                let urlToAppend = Constants.URL_PROFILE_FB + "?image_url=" + urlPic + "&msj=" + textData + "&day=" + day + "&month=" + month + "&year=" + year + "&hour=" + hour + "&minuts=" + min
                linkToApi.push(urlToAppend)
            }
        }

        async function fetchMyAPI() {
            linkToApi.forEach((link) => {
                fetch(Constants.URL_BASE + link)
            })
        }
        fetchMyAPI()
    }

    function disabledButtonBoolean() {
        let disabled = true
        if ((type === "1") && (facebook) && (dateTime !== "") && (textData !== "")) {
            disabled = false
        }
        if ((type === "2") && (facebook || instagram) && (dateTime !== "") && (textData !== "") && (urlPic !== "")) {
            disabled = false
        }
        if ((type === "3") && (facebook) && (dateTime !== "") && (textData !== "") && (urlPic !== "")) {
            disabled = false
        }

        return (disabled)
    }

    return (
        <div>
            <Stack
            // direction="row" spacing={2}
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            justifyContent="center"
            >
                <Item>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="select-small">Option</InputLabel>
                        <Select
                            labelId="select-small"
                            id="select-small"
                            value={type}
                            label="Option"
                            onChange={handleChange}
                        >
                            <MenuItem value={"1"}>Publish a Text</MenuItem>
                            <MenuItem value={"2"}>Publish a Photo</MenuItem>
                            <MenuItem value={"3"}>Change Profile Photo</MenuItem>
                        </Select>

                        <FormGroup>
                            <FormControlLabel disabled={type === '' ? true : false} control={<Checkbox onChange={handleChangeFacebook} />} label="Facebook" />
                            <FormControlLabel disabled={type === '2' ? false : true} control={<Checkbox onChange={handleChangeInstagram} />} label="Instagram" />
                        </FormGroup>


                        <TextField
                            id="datetime-local"
                            label="Date and Time"
                            type="datetime-local"
                            disabled={type === '' ? true : false}
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
                        <Input disabled={type === '' ? true : false} placeholder="Text" inputProps={ariaLabel} multiline rows={4} value={textData} onChange={handleChangeText} />
                        <Input disabled={type === '2' || type === '3' ? false : true} multiline rows={4} placeholder="URL PIC" inputProps={ariaLabel} value={urlPic} onChange={handleChangeUrl} />
                    </Box>
                    <Button variant="contained" endIcon={<SendIcon />}
                        onClick={() => {
                            fetchAPIEffect()
                            setOpen(true)
                            setTimeout(function () {
                                window.location.replace('');
                            }, 600);
                            //setFlagUpdate(!flagUpdate)
                        }}
                        disabled={disabledButtonBoolean()}
                    >
                        Send
                    </Button>

                    <Collapse in={open}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            Send Request
                        </Alert>
                    </Collapse>
                </Item>
                {facebook || instagram ? <Item>
                    {/* <FacebookCard text={textData} link={urlPic}/> */}
                    {facebook ? <FacebookCard text={textData} link={urlPic} /> : null}
                    <br />
                    <br />

                    {instagram ? <InstagramCard text={textData} link={urlPic} /> : null}

                </Item> : null}
            </Stack>
        </div>
    )
}