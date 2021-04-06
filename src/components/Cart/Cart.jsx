import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core'
import useStyles from './styles'
import CartItem from './CartItem/CartItem'
import { Link } from 'react-router-dom'

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    const classes = useStyles();


    const EmptyCart = () => (
        <Typography variant="subtitle1">You have no itmes in cart
            <Link to="/" className={classes.link} variatn="h1">  start adding some  </Link>!
        </Typography>

    );

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>

                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} onUpdatecartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">Subtotal:{cart.subtotal.formatted_with_symbol} </Typography>
            </div>
            <div>
                <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
                <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary" onClick={() => console.log("pressed")}>CheckOut</Button>
            </div>



        </>
    )
    if (!cart.line_items) {
        return "Loading...."
    }

    return (
        <Container>
            <div className={classes.toolbar} />

            <Typography className={classes.title} gutterBottom variant="h4" >
                Your shopping Cart
     </Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}

        </Container >
    )
}
export default Cart;