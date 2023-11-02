import React, { useState } from "react"

import { useNavigate } from "react-router-dom";

import { Card, Typography, Grid, TextField, Button, Snackbar, Alert } from "@mui/material";
import { fetchUsers, postUser } from "../../Utility/account";

const Loginpage = () => {
    const navigate = useNavigate();

    const [loginInput, setLoginInput] = useState({
        username: '',
        password: '',
    });
    const [registerInput, setRegisterInput] = useState({
        username: '',
        email: '',
        password: '',
    })
    const [customSx, setCustomSx] = useState(null);
    const [mode, setMode] = useState('login');
    const [animationEnd, setAnimationEnd] = useState(true);
    const [toast, setToast] = useState({ message: '', state: false, mode: 'success' });

    const setLoginSession = (username, id) => {
        var now = new Date();
        var minutes = 60;

        updateToastState(true, `${username} je logiran!`, 'success');

        now.setTime(now.getTime() + (minutes * 60 * 1000));

        document.cookie = `usr=${id}; expires=${now.toUTCString()}; path=/;`

        navigate('/');
    }

    const updateToastState = (state, message, mode) => {
        setToast((currentToast) => {
            return {
                message: message !== undefined ? message : currentToast.message,
                state: state !== undefined ? state : currentToast.state,
                mode: mode !== undefined ? mode : currentToast.mode
            }
        })
    }

    const handleLogin = async () => {
        let result = await fetchUsers();
        result.forEach((entry) => {
            if ((entry.name === loginInput.username) && (entry.pwd === loginInput.password)) setLoginSession(entry.name, entry.id);
            else updateToastState(true, `Greška kod ulogiranja.`, 'error');
        })
    }

    const handleRegister = async () => {
        let result = await postUser({ name: registerInput.username, pwd: registerInput.password, email: registerInput.email });
        if (result === 'success') {
            updateToastState(true, `${registerInput.username} je kreiran!`, 'success');
            setAnimationRegister();
        }
        else {
            updateToastState(true, `Greška kod registracije.`, 'error');
        }
    }

    const onChangeLogin = (e) => {
        switch (e.target.name) {
            case 'username':
                setLoginInput((currentLogin) => { return { ...currentLogin, username: e.target.value } });
                break;
            case 'password':
                setLoginInput((currentLogin) => { return { ...currentLogin, password: e.target.value } });
                break;
            default:
                break;
        }
    }

    const onChangeRegister = (e) => {
        switch (e.target.name) {
            case 'username':
                setRegisterInput((currentRegister) => { return { ...currentRegister, username: e.target.value } });
                break;
            case 'email':
                setRegisterInput((currentRegister) => { return { ...currentRegister, email: e.target.value } });
                break;
            case 'password':
                setRegisterInput((currentRegister) => { return { ...currentRegister, password: e.target.value } });
                break;
            default:
                break;
        }
    }

    const setAnimationLogin = () => {
        setAnimationEnd(false);
        setCustomSx({
            '@keyframes login': {
                '0%': {
                    height: 'calc(100% - 14vh)',
                    width: 'calc(100% - 60vw)',
                },
                '20%': {
                    height: 'calc(100% - 35vh)',
                    width: 'calc(100% - 70vw)',
                    marginTop: '20vh'
                },
                '40%': {
                    height: 'calc(100% - 74vh)',
                    width: 'calc(100% - 95vw)',
                    marginTop: '35vh'
                },
                '60%': {
                    height: 'calc(100% - 74vh)',
                    width: 'calc(100% - 95vw)',
                    marginTop: '35vh'
                },
                '80%': {
                    height: 'calc(100% - 74vh)',
                    width: 'calc(100% - 95vw)',
                    marginTop: '35vh'
                },
                '100%': {
                    height: 'calc(100% - 14vh)',
                    width: 'calc(100% - 60vw)',
                    marginLeft: '55vw'
                },
            },
            animationName: 'login',
            animationDuration: '3s',
            animationFillMode: 'both'
        })
        setTimeout(() => {
            setMode('register');
            setAnimationEnd(true);
        }, [3000])
    }

    const setAnimationRegister = () => {
        setAnimationEnd(false);
        setCustomSx({
            '@keyframes register': {
                '0%': {
                    height: 'calc(100% - 14vh)',
                    width: 'calc(100% - 60vw)',
                    marginLeft: '55vw'
                },
                '20%': {
                    height: 'calc(100% - 35vh)',
                    width: 'calc(100% - 70vw)',
                    marginTop: '20vh'
                },
                '40%': {
                    height: 'calc(100% - 74vh)',
                    width: 'calc(100% - 95vw)',
                    marginTop: '35vh'
                },
                '60%': {
                    height: 'calc(100% - 74vh)',
                    width: 'calc(100% - 95vw)',
                    marginTop: '35vh'
                },
                '80%': {
                    height: 'calc(100% - 74vh)',
                    width: 'calc(100% - 95vw)',
                    marginTop: '35vh'
                },
                '100%': {
                    height: 'calc(100% - 14vh)',
                    width: 'calc(100% - 60vw)',
                },

            },
            animationName: 'register',
            animationDuration: '3s',
            animationFillMode: 'both'
        })
        setTimeout(() => {
            setMode('login');
            setAnimationEnd(true);
        }, [3000])
    }

    return (
        <Card
            raised
            style={{
                height: 'calc(100% - 14vh)',
                width: 'calc(100% - 60vw)',
                margin: '7vh 7vw 7vh 7vw',
            }}
            sx={{
                ...customSx,
                borderRadius: '360px',
            }}
        >
            {
                (mode === 'login' && animationEnd) && (
                    <Grid height='100%' width='100%' display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
                        <Grid height='40%' display='flex' alignItems='center' justifyContent='space-evenly' flexDirection='column'>
                            <Typography variant="h3">Login</Typography>
                            <TextField label="Ime i prezime" variant="outlined" value={loginInput.username} name='username' onChange={onChangeLogin} />
                            <TextField label="Lozinka" variant="outlined" type="password" value={loginInput.password} name='password' onChange={onChangeLogin} />
                        </Grid>
                        <Grid width='40%' display='flex' alignItems='center' justifyContent='space-evenly'>
                            <Button onClick={setAnimationLogin}>Nemate račun?</Button>
                            <Button onClick={handleLogin}>Ulogiraj se</Button>
                        </Grid>

                    </Grid>
                )
            }
            {
                mode === 'register' && animationEnd && (
                    <Grid height='100%' width='100%' display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
                        <Grid height='40%' display='flex' alignItems='center' justifyContent='space-evenly' flexDirection='column'>
                            <Typography variant="h3">Napravi račun</Typography>
                            <TextField label="Ime i prezime" variant="outlined" value={registerInput.username} name='username' onChange={onChangeRegister} />
                            <TextField label="Email" variant="outlined" value={registerInput.email} name='email' onChange={onChangeRegister} />
                            <TextField label="Lozinka" variant="outlined" type="password" value={registerInput.password} name='password' onChange={onChangeRegister} />
                        </Grid>
                        <Grid width='40%' display='flex' alignItems='center' justifyContent='space-evenly'>
                            <Button onClick={setAnimationRegister}>Imate račun?</Button>
                            <Button onClick={handleRegister}>Registriraj se</Button>
                        </Grid>

                    </Grid>
                )
            }
            <Snackbar open={toast.state} autoHideDuration={6000} onClose={() => { updateToastState(false) }} anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
                <Alert onClose={() => { updateToastState(false) }} severity={toast.mode} sx={{ width: '100%' }}>
                    {toast.message}
                </Alert>
            </Snackbar>
        </Card>
    )
};

export default Loginpage;
