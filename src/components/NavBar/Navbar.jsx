import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import useStyles from './styles'
import MenuIcon from '@material-ui/icons/Menu'
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
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

    // console.log(user)

    const handleLogout = () => {
        dispatch({ type: LOGOUT })
        history.push('/auth')
        setUser(null)
    }

    useEffect(() => {
        const token = user?.token

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton> */}
                    <Typography component={Link} to='/' variant="h6" className={classes.title}>
                        <IconButton className={classes.logo} primary="white" secondary="black">
                            <HomeTwoToneIcon />
                        </IconButton>
                    </Typography>
                    {user
                        ? <div>
                            <Avatar ><img src={imgUrl} alt={userName} /></Avatar>
                            <Typography variant='h6'>{userName}</Typography>
                            <Button onClick={handleLogout} size='small' variant='contained' color='secondary'>Logout</Button>
                        </div>
                        : <Button component={Link} to='/auth' size='small' variant='contained' color='secondary'>Login</Button>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}
