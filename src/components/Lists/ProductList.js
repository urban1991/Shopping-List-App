import React, { Fragment } from 'react'
import { TextField, Grid, Paper, Typography, List, ListItem, ListItemText,
         ListItemSecondaryAction, IconButton } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import InputForm from './InputForm';
import EditDialog from './EditDialog';
import { withStyles } from '@material-ui/core/styles';
import { withContext } from '../../context';


const styles = theme => ({
    paper: { padding: 30, marginTop: 20, height: 'calc(100% - 40px)', overflowY: 'auto' },
    textField: { width: 187, marginRight: 20, marginTop: 20 },
    '@global': {
        'html, body, #root': {
            height: '100%'
        }
    },
    container: {
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px - 48px)'
        },
    },
    header:{
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column'
        }
    }
});

const ProductList = ({ shoppingList, productsByCategory, selectedCategory, onProductAdd,
                       onSelect, onDelete, classes }) => {

    const totalWeight = () => {
        if(shoppingList.length === 0) return 0;
        const weights = shoppingList.map(el => el.unit !== 'pcs.' ? Number.parseFloat(el.quantity) : 0)
        return  weights.reduce((acc, el) => acc + el, 0) 
    }

    const renderedProducts = productsByCategory.map(([ category, items]) => 
        !selectedCategory || selectedCategory === category 
        ?   <Fragment key={category}>
                <Typography variant="h5">
                    {category}
                </Typography>
                <List component="ul">
                    {items.map(({ name, unit, quantity, id }) => 
                        <ListItem key={id} button >
                            <ListItemText primary={name} secondary={`${quantity} ${unit}`} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => onSelect(id)}>
                                    <EditDialog />
                                </IconButton>
                                <IconButton onClick={() => onDelete(id)}>
                                    <DeleteOutlinedIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )}
                </List>
          </Fragment>
         : null
    )

    return (
       <Grid container className={classes.container}>
            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                    <InputForm  
                        onSubmit={onProductAdd}
                    /> 
                    <TextField
                        className={classes.textField}
                        label="Total weight"
                        value={`${totalWeight()} kg`}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                    <TextField
                        className={classes.textField}
                        label="Total quantity"
                        value={shoppingList.length}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                    {renderedProducts}
                </Paper>
            </Grid>
       </Grid>
    );
};

export default withContext(withStyles(styles)(ProductList));