import { Avatar, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import FirebaseRegister from './auth-forms/AuthRegister';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useTranslation } from 'react-i18next';

const Signup = ({ handleChange }) => {
    const { t } = useTranslation("translation");
    const paperStyle = { padding: 20, width: 430, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
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
