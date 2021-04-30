import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import useStyles from './styles'
// import MenuIcon from '@material-ui/icons/Menu'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { Avatar, Typography, IconButton, Toolbar, AppBar, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { LOGOUT } from '../../constants/actionTypes'

export const Navbar = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const userName = user?.result.name
    const imgUrl = user?.result.imageUrl

    const handleLogout = () => {
        dispatch({ type: LOGOUT })
        history.push('/auth')
        setUser(null)
    }

    useEffect(() => {
        // const token = user?.token

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <div className={classes.root}>
            <AppBar position="static" color='default'>
                <Toolbar>
                    {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton> */}
                    <Typography component={Link} to='/' variant="h6" className={classes.title}>
                        <IconButton className={classes.logo} primary="white" secondary="black" color='inherit'>
                            <HomeRoundedIcon/>
                        </IconButton>
                    </Typography>
                    {user
                        ? <div class='row'>
                            <div class='column'>
                                <div class='row'>
                                    <div class='column'>
                                        <Avatar><img src={imgUrl} alt={userName} /></Avatar>
                                    </div>
                                    <div class='column' style={{paddingTop:8, paddingLeft:5}}>
                                        <Typography variant='h7'>{userName}</Typography>
                                    </div>
                                </div>
                            </div>
                            <div class='column' style={{paddingLeft:35, paddingRight:10}}>
                            <Button onClick={handleLogout} size='large' color='primary'>Logout</Button>
                            </div>
                        </div>
                        : <Button component={Link} to='/auth' size='large' color='primary'>Login</Button>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}
