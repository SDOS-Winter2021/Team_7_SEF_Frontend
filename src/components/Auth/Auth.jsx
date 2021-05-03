import React, { useState } from 'react'
import { Avatar, Button, Paper, Container, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import { Icon } from './Icon'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { AUTH } from '../../constants/actionTypes'
import { useHistory } from 'react-router-dom'
import { signIn } from '../../actions/auth'
// import Jumbotron from 'react-bootstrap/Jumbotron'
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
        <div className="bg-image d-flex justify-content-center  align-items-center"
            style={{ "backgroundImage": "url('https://simpleeducationfoundation.org/wp-content/uploads/2019/10/principal3-min-1.jpg?resize=480:*')", "height": "100vh", "backgroundSize": "100% 100%" }}>
            <Container component='main' maxWidth='xs'>
                {/* <Jumbotron style={{"background": "rgba(204, 204, 204, 1)"}}> */}
                <Paper className={classes.paper} elevation={3}>
                    {/* <h1 className="text-center" style={{"color":"#3f51b5","fontSize":"60px",}}><b>Log in</b></h1> */}
                    {/* <Typography variant="h6" align='left' color='default' className={classes.title}>
                        Sign In
                    </Typography> */}
                    <Typography variant="button" align='center' color='default' className={classes.title}>
                        <b>Sign In with your SEF account</b>
                    </Typography>
                    
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <GoogleLogin
                                clientId='769388396500-909t411qfsejlkguj9n6opi2kulhpb2r.apps.googleusercontent.com'
                                render={(renderProps) => (
                                    <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>
                                        Sign In with Google
                                    </Button>
                                )}
                                onSuccess={googleSuccess}
                                onFailure={googleFailure}
                                cookiePolicy='single_host_origin'
                            />
                        </form>
                </Paper>
                {/* </Jumbotron> */}
            </Container>
        </div>

    )
}
