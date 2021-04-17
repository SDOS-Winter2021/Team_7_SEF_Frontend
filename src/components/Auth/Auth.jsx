import React, { useState } from 'react'
import { Avatar, Button, Paper, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import { Icon } from './Icon'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { AUTH } from '../../constants/actionTypes'
import { useHistory } from 'react-router-dom'
import { signIn } from '../../actions/auth'
// import { LOGOUT } from '../../constants/actionTypes'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

export const Auth = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const form = useState(initialState)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(signIn(form, history))
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId
        // console.log(result.email)

        try {
            // dispatch({ type: AUTH, data: { result, token } });
            // history.push('/')
            // if (result.email.includes('@iiitd.ac.in')) {
                dispatch({ type: AUTH, data: { result, token } });
                history.push('/')
            // }
            // else {

            //     alert('Unotherised user')
            //     dispatch({ type: LOGOUT })
            //     history.push('/auth')
            // }
        } catch (error) {
            console.log(error)
        }
    }
    const googleFailure = (error) => {
        console.log(error)
    }

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <GoogleLogin
                        clientId='769388396500-95kaaug7sbjt0e3s33ukfr7d2nt2taf3.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                </form>
            </Paper>
        </Container>
    )
}
