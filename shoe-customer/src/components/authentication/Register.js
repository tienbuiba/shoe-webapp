import { Avatar, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import FirebaseRegister from './auth-forms/AuthRegister';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const Signup = ({ handleChange }) => {
    const { t } = useTranslation("translation");
    const paperStyle = { padding: 20, width: 430, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const dispatch = useDispatch();
    const data = useSelector(state => state.authen.data);

    useEffect(() => {
        if (data.stateChange !== null) {
            handleChange("event", data.stateChange);
        }
    }, [])

    return (
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
        </Grid>
    )
}

export default Signup;
