import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";
import 'dayjs/locale/hr';

import {
    Typography,
    Grid,
    Card,
    Snackbar,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    SpeedDial,
    SpeedDialIcon,
    SpeedDialAction,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    TextField
} from "@mui/material";

import {
    AddAlert,
    Close
} from "@mui/icons-material"

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar, LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import { fetchUserAppointments, fetchAppointmentByFilter } from "../../Utility/appointment";
import { fetchUsers } from "../../Utility/account";

function Adminpage() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [hasAppointment, setHasAppointment] = useState(false);
    const [dateValue, setDateValue] = useState(dayjs(new Date().setHours(12)));
    const [defaultDate, setDefaultDate] = useState(dayjs(new Date().setHours(12)));

    const [rows, setRows] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);

    const [toast, setToast] = useState({ message: '', state: false, mode: 'success' });

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


    function createData(name, email, appointment) {
        return { name, email, appointment };
    }

    useEffect(() => {
        var cookieValue = getCookie('usr');

        if (cookieValue !== "") setLoggedIn(true);
        else setLoggedIn(false);

        fetchUserAppointments().then((res) => {
            let tempRows =
                res.map(user => {
                    let { name, email, appointment } = user;
                    return createData(name, email, appointment ? new Date(appointment.dateTime).toLocaleDateString('hr-hr') : 'Nema termina');
                })
            setRows(tempRows)
        })

        return () => setRows([]);
    }, [])

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


    const addAppointment = () => {
    }

    const actions = [
        { icon: <AddAlert />, name: 'Dodaj novi termin', onclick: () => setOpenDialog(true) },
    ];

    return (
        <Card
            raised
            style={{
                height: 'calc(100% - 14vh)',
                margin: '7vh 7vw 7vh 7vw'
            }}
        >
            <Grid container className='card' height='100%' width='100%' margin='20px' alignItems='center' justifyContent='space-around' alignContent='center'>
                <Grid item xs={4} container alignItems='center' justifyContent='center'>
                    <Typography variant="h4" marginBottom='10px'>
                        Tablica termina
                    </Typography>
                    <TableContainer sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Ime</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">Termin</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row?.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row?.name}
                                        </TableCell>
                                        <TableCell align="right">{row?.email}</TableCell>
                                        <TableCell align="right">{row?.appointment}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                {/* <Grid item xs={4} container>
                    <Typography variant="h4" marginBottom='10px'>
                        Nadolazeći termini
                    </Typography>
                </Grid> */}
            </Grid>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 230, right: 200 }}
                icon={<SpeedDialIcon />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.onclick}
                    />
                ))}
            </SpeedDial>
            <Snackbar open={toast.state} autoHideDuration={6000} onClose={() => { updateToastState(false) }} anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
                <Alert onClose={() => { updateToastState(false) }} severity={toast.mode} sx={{ width: '100%' }}>
                    {toast.message}
                </Alert>
            </Snackbar>
            <Dialog
                open={openDialog}
                fullWidth
            >
                <DialogTitle display='flex' justifyContent='space-between'>
                    Dodaj novi termin
                    <IconButton onClick={() => { setOpenDialog(false) }}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Grid container flexDirection='column' justifyContent='center' alignItems='center' marginTop='10px'>
                        <TextField label="Ime i prezime" variant="outlined" name='username' sx={{ mb: '15px' }} />
                        <TextField label="Email" variant="outlined" name='email' />
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button>
                        Dodaj
                    </Button>

                </DialogActions>
            </Dialog>
        </Card>
    );
}

export default Adminpage;
