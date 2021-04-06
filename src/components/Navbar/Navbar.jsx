import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Tyography, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'

import logo from '../../assets/Convenience.jfif'
import useStyles from './styles'
const Navbar = ({ totalitems }) => {
    const classes = useStyles();
    const location = useLocation();

    return (
        <>
            <AppBar position="fixed" className={classes.AppBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Shopaholic" height="25 px" className={classes.image} />
                            Shoplifter

                    </Typography>
                    <div className={classes.grow} />
                    {
                        location.pathname === '/' && (<div className={classes.button} >
                            <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit" >
                                <Badge badgeContent={totalitems} color="secondary">
                                    <ShoppingCart />
                                </Badge>



                            </IconButton>
                        </div>)
                    }

                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
