import React from 'react';
import {AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import PrintIcon from '@material-ui/icons/Print';
import { makeStyles } from '@material-ui/core/styles';
import * as jsPDF from 'jspdf';
import { withContext } from '../../context';


const useStyles = makeStyles(theme => ({
    header: {
        letterSpacing: '4px',
        flex: "1",
        [theme.breakpoints.down('xs')]: {
            padding: '10px'
        }
    },
    button: {
      margin: theme.spacing(1),
      color: 'white',
      backgroundColor: 'inherit',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        letterSpacing: '4px'
      }
    },
    toolBar: {
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column'
        }
    }
  }));


const Header = ({ localStorageSave, clearList, shoppingList }) => {

    const print = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text(30, 30, shoppingList.map((el,index) => `${index + 1}. ${el.name} ${el.quantity} ${el.unit}`))

        window.open(doc.output('bloburl'), '_blank');
    }
    
    const classes = useStyles();
    return (
        <AppBar position="static" >
            <Toolbar className={classes.toolBar}>
                <Typography variant="h4" className={classes.header}>
                    SHOPPING LIST
                </Typography>
                <Button
                    onClick={() => localStorageSave()}
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                >
                    Save
                </Button>
                <Button
                    onClick={() => clearList()}
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                >
                    Clear
                </Button>
                <Button
                    onClick={() => print()}
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.button}
                    startIcon={<PrintIcon />}
                >
                    Print
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default withContext(Header);