import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";
import 'dayjs/locale/hr';

import { Typography, Grid, Card, Slide, Box, Button, Snackbar, Alert } from "@mui/material";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar, LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';

import HairCut1 from '../../Assets/Images/cut1.jpg';
import HairCut2 from '../../Assets/Images/cut2.jpg';
import HairCut3 from '../../Assets/Images/cut3.jpg';
import { postAppointment, fetchAppointmentByFilter } from "../../Utility/appointment";

function Homepage() {

    const [picture, setPicture] = useState({ id: 0, img: HairCut1 });
    const [prevPicture, setPrevPicture] = useState({ id: 0, img: HairCut1 });
    const [loggedIn, setLoggedIn] = useState(false);
    const [hasAppointment, setHasAppointment] = useState(false);
    const [dateValue, setDateValue] = useState(dayjs(new Date().setHours(12)));
    const [defaultDate, setDefaultDate] = useState(dayjs(new Date().setHours(12)));

    const [toast, setToast] = useState({ message: '', state: false, mode: 'success' });

    const pictureArr = [{ id: 0, img: HairCut1 }, { id: 1, img: HairCut2 }, { id: 2, img: HairCut3 }];

    const containerRef = useRef(null);

    const navigate = useNavigate();

    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    useEffect(() => {
        var count = 0;
        var cookieValue = getCookie('usr');
        const interval = setInterval(() => {
            if (pictureArr.length > 0) {
                count++;
                setPicture(pictureArr[(count) % pictureArr.length]);
            }
        }, [5000])

        if (cookieValue !== "") setLoggedIn(true);
        else setLoggedIn(false);

        getUserData();

        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setPrevPicture(picture);
        }, [1500])
        return () => clearInterval(interval);
    }, [picture])

    const updateToastState = (state, message, mode) => {
        setToast((currentToast) => {
            return {
                message: message !== undefined ? message : currentToast.message,
                state: state !== undefined ? state : currentToast.state,
                mode: mode !== undefined ? mode : currentToast.mode
            }
        })
    }

    const getUserData = async () => {
        var cookieValue = getCookie('usr');
        if (cookieValue) {
            var id = parseInt(cookieValue);
            var appointment = await fetchAppointmentByFilter('client', id)
            if (appointment.length > 0) {
                setHasAppointment(true);
                console.log(appointment);
                setDefaultDate(dayjs(new Date(appointment[0].dateTime).setHours(new Date(appointment[0].dateTime).getHours() - 1)))
            }
        }
    }

    const handleAppointment = async () => {
        console.log(dateValue);
        let checkedDate = new Date(`${dateValue["$M"] + 1}-${dateValue["$D"]}-${dateValue["$y"]} ${dateValue["$H"]}:${dateValue["$m"]}`)
        var cookieValue = getCookie('usr');
        var formattedDate = `${checkedDate.getDate()}-${checkedDate.getMonth() + 1}-${checkedDate.getFullYear()} ${checkedDate.getHours()}:${checkedDate.getMinutes()}${checkedDate.getSeconds()}`
        let result = await postAppointment({ clientId: cookieValue, dateTime: formattedDate });
        if (result === 'success') {
            updateToastState(true, `Vaš termin je poslan!`, 'success');
            await getUserData();
            setHasAppointment(true);
        }
        else {
            updateToastState(true, `Greška kod slanja termina.`, 'error');
        }
    }

    const checkDisabledDates = (date) => {
        let dateArr = [new Date('11-2-2023').getTime(), new Date('11-5-2023').getTime(), new Date('11-8-2023').getTime()]
        // let dateArr = [];

        //return date.valueOf() === new Date('11-2-2023').getTime()
        return dateArr.includes(date.valueOf());
    }

    const checkDisabledTimes = (time) => {
        let checkedDate = new Date(`${dateValue["$M"] + 1}-${dateValue["$D"]}-${dateValue["$y"]} ${time["$H"]}:${time["$m"]}`)
        // let dateArr = [new Date('11-1-2023 11:00').getTime(), new Date('11-1-2023 14:00').getTime(), new Date('11-1-2023 22:00').getTime()]
        let dateArr = [];

        return dateArr.includes(checkedDate.getTime()) || (checkedDate.getHours() > 22 || checkedDate.getHours() < 7);
    }

    return (
        <Card
            raised
            style={{
                height: 'calc(100% - 14vh)',
                margin: '7vh 7vw 7vh 7vw'
            }}
        >
            <Grid container className='card' height='100%'>
                <Grid item xs={4} height='100%'>
                    <Box ref={containerRef} sx={{ overflow: 'hidden', backgroundImage: `url(${prevPicture.img})`, backgroundSize: '100% 100%' }} height='100%' width='100%'>
                        <Slide direction='left' in={true} key={picture.img} container={containerRef.current} timeout={1250}>
                            <img alt="fade cut" src={picture.img} height='100%' width='100%' />
                        </Slide>
                    </Box>
                </Grid>
                <Grid item xs={4} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                    <Typography variant="h4" >Lokacija</Typography>
                    <iframe
                        title="location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d580.9044691051064!2d16.79388609422546!3d46.16542190662054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4766271f8708f20f%3A0x551d70fa64bc53a0!2sNeeded!5e0!3m2!1shr!2shr!4v1696185000656!5m2!1shr!2shr"
                        width="450" height="450" style={{ border: '0', paddingTop: '30px' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </Grid>
                {
                    loggedIn ? (


                        <Grid item xs={4} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                            <Typography variant="h4" >Moj termin</Typography>
                            {
                                hasAppointment ? (
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="hr">
                                        <DateCalendar defaultValue={defaultDate} readOnly />
                                        <MobileTimePicker defaultValue={defaultDate} readOnly />
                                    </LocalizationProvider>
                                )
                                    :
                                    (
                                        <>
                                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="hr">
                                                <DateCalendar value={dateValue} onChange={(newValue) => setDateValue(newValue)} disablePast shouldDisableDate={(date) => checkDisabledDates(date)} />
                                                <MobileTimePicker value={dateValue} onChange={(newValue) => setDateValue(newValue)} label="Vrijeme" openTo="hours" shouldDisableTime={(time) => checkDisabledTimes(time)} />
                                            </LocalizationProvider>
                                            <Button variant="text" size="large" onClick={handleAppointment} style={{ marginTop: '30px' }}>Upiši termin</Button>
                                        </>
                                    )
                            }

                        </Grid>
                    )
                        :
                        (
                            <Grid item xs={4} display='flex' alignItems='center' justifyContent='center'>
                                <Button variant="text" size="large" onClick={() => { navigate('/login') }}>Ulogiraj se</Button>
                            </Grid>
                        )
                }

            </Grid>
            <Snackbar open={toast.state} autoHideDuration={6000} onClose={() => { updateToastState(false) }} anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
                <Alert onClose={() => { updateToastState(false) }} severity={toast.mode} sx={{ width: '100%' }}>
                    {toast.message}
                </Alert>
            </Snackbar>
        </Card>
    );
}

export default Homepage;
