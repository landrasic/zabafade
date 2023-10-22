import React, { useState } from "react"
import axios from 'axios'

import { Card, Typography, Grid, TextField, Button } from "@mui/material";

const Loginpage = () => {

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

    const handleLogin = () => {
        axios.get('http://localhost:8000')
            .then(res => {
                let data = res.data;
                if (!data || (data.length === 0)) throw new Error('No data found!');
                data.forEach((entry) => {
                    if ((entry.name === loginInput.username) && (entry.pwd === loginInput.password)) console.log('Successful login!');
                    else console.log('Unsuccessful login!');
                })
            })
            .catch(err => {
                console.log(`There was an error: ${err}`);
            })

    }

    const handleRegister = () => {
        axios.post('http://localhost:8000', { name: registerInput.username, pwd: registerInput.password, email: registerInput.email })
            .then(res => {
                let data = res.data;
                if (!data || (data.length === 0)) throw new Error('No data found!');
                data.forEach((entry) => {
                    if ((entry.name === loginInput.username) && (entry.pwd === loginInput.password)) console.log('Successful login!');
                    else console.log('Unsuccessful login!');
                })
            })
            .catch(err => {
                console.log(`There was an error: ${err}`);
            })

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
                            <TextField label="Korisničko ime" variant="outlined" value={loginInput.username} name='username' onChange={onChangeLogin} />
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
                            <TextField label="Korisničko ime" variant="outlined" value={registerInput.username} name='username' onChange={onChangeRegister} />
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
        </Card>
    )
};

export default Loginpage;
