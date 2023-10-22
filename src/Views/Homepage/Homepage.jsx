import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Typography, Grid, Card, Slide, Box, Button } from "@mui/material";

import HairCut1 from '../../Assets/Images/cut1.jpg';
import HairCut2 from '../../Assets/Images/cut2.jpg';
import HairCut3 from '../../Assets/Images/cut3.jpg';

function Homepage() {

    const [picture, setPicture] = useState({ id: 0, img: HairCut1 });
    const [prevPicture, setPrevPicture] = useState({ id: 0, img: HairCut1 });

    const pictureArr = [{ id: 0, img: HairCut1 }, { id: 1, img: HairCut2 }, { id: 2, img: HairCut3 }];

    const containerRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        var count = 0;
        const interval = setInterval(() => {
            if (pictureArr.length > 0) {
                count++;
                setPicture(pictureArr[(count) % pictureArr.length]);
            }
        }, [5000])
        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setPrevPicture(picture);
        }, [1500])
        return () => clearInterval(interval);
    }, [picture])


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
                    <Typography variant="h4">Lokacija</Typography>
                    <iframe
                        title="location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d580.9044691051064!2d16.79388609422546!3d46.16542190662054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4766271f8708f20f%3A0x551d70fa64bc53a0!2sNeeded!5e0!3m2!1shr!2shr!4v1696185000656!5m2!1shr!2shr"
                        width="600" height="450" style={{ border: '0', paddingTop: '30px' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </Grid>
                <Grid item xs={4} display='flex' alignItems='center' justifyContent='center'>
                    <Button variant="text" size="large" onClick={() => { navigate('/login') }}>Ulogiraj se</Button>
                </Grid>
            </Grid>
        </Card>
    );
}

export default Homepage;
