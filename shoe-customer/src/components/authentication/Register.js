import { Avatar, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import FirebaseRegister from './auth-forms/AuthRegister';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import useResponsive from 'src/hooks/useResponsive';

const Signup = ({ handleChange }) => {
    const { t } = useTranslation("translation");
    const paperStyle = { padding: 20, width: 430, margin: "0 auto" }
    const paperStyle2 = { paddingTop: 20, width: 300, margin: "0 auto", paddingLeft: 10, paddingRight: 10, paddingBottom: 20, }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const data = useSelector(state => state.authen.data);
    const smUp = useResponsive('up', 'sm');


    useEffect(() => {
        if (data.stateChange !== null) {
            handleChange("event", data.stateChange);
        }
    }, [])

    return (
        <>            {!smUp ? <Grid>
            <Paper style={paperStyle2}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h3 style={headerStyle}>{t("Sign Up")}</h3>
                    <Typography variant='caption' gutterBottom>
                        {t("Please fill this form to create an account !")}
                    </Typography>
                </Grid>
                <FirebaseRegister />
            </Paper>
        </Grid> :
            <Grid>
                <Paper style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}>
                            <AddCircleOutlineOutlinedIcon />
                        </Avatar>
                        <h3 style={headerStyle}>{t("Sign Up")}</h3>
                        <Typography variant='caption' gutterBottom>
                            {t("Please fill this form to create an account !")}
                        </Typography>
                    </Grid>
                    <FirebaseRegister />
                </Paper>
            </Grid>}
        </>
    )
}

export default Signup;
