import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import { Icon } from './Icon'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { AUTH } from '../../constants/actionTypes'
import { useHistory } from 'react-router-dom'
import { signIn, signUp } from '../../actions/auth'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

export const Auth = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const [isSignUp, setIsSignUp] = useState(false)
    const [form, setForm] = useState(initialState)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (isSignUp) {
            dispatch(signUp(form, history))
        } else {
            dispatch(signIn(form, history))
        }
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId
        console.log(res)

        try {
            dispatch({ type: AUTH, data: { result, token } });
            history.push('/')
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
                        clientId='418571538477-t9fcp3230p21kcio23nb0euf0dtelimb.apps.googleusercontent.com'
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
