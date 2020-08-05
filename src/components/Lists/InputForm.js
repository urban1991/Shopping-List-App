import React from 'react'
import { TextField, InputLabel, MenuItem, FormControl, Select, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Consumer } from '../../context';

const styles = theme => ({
    FormControl: {
        display: 'flex',
        flex: 1
    },
    text: {
        marginTop: 20,
        marginRight: 20,
        width: 187
    },
    button: {
        marginTop: 20,
        width: 188,
        height: 55
    }
});

class InputForm extends React.Component {
    state = this.getInitialState()

    getInitialState() {
        const { product } = this.props;

        return product || {
            name: '',
            unit: '',
            quantity: '',
            category: ''    
        }
    }

    handleChange = name => ({target: { value }}) =>
        this.setState({
            [name]: value
        });

    handleSubmit = () => {
        this.props.onSubmit({
            id: this.state.name.toLowerCase().replace(/ /g, '-'),
            ...this.state
        });

        this.setState(this.getInitialState())
    }

    renderCategories = categories => {
        return categories.map(category => <MenuItem key={category} value={category}>{category}</MenuItem> 
    )} 

    renderUnits = units => {
        return units.map(unit => <MenuItem key={unit} value={unit}>{unit}</MenuItem> 
    )} 

    render() {
        const { name, unit, quantity, category } = this.state,
              { classes, product } = this.props;
        return (
            <Consumer>
                {({ categories, units }) => (
                    <form>
                        <TextField
                            className={classes.FormControl}
                            label="Product Name"
                            variant="outlined"
                            value={name}
                            onChange={this.handleChange('name')}
                            />
                        <br/>
                        <FormControl variant="outlined" className={classes.FormControl} >
                            <InputLabel htmlFor="category" >Category</InputLabel>
                            <Select
                                value={category}
                                onChange={this.handleChange('category')}
                                label="Category"
                            >
                            {this.renderCategories(categories)}
                            </Select>
                        </FormControl>
                        <TextField
                            className={classes.text}
                            label="Quantity"
                            type="number"
                            variant="outlined"
                            value={quantity}
                            onChange={this.handleChange('quantity')}
                        />
                        <FormControl variant="outlined" className={classes.text} >
                            <InputLabel htmlFor="unit" >Unit</InputLabel>
                            <Select
                                label="Unit"
                                value={unit}
                                onChange={this.handleChange('unit')}
                                >
                                {this.renderUnits(units)}
                            </Select>
                        </FormControl> 
                        <Button 
                            variant="contained" 
                            color="primary"
                            size="large"
                            className={classes.button}    
                            onClick={this.handleSubmit}
                            disabled={!name || !category || !quantity || !unit}
                            >
                            {product ? 'Edit' : 'Add'}
                        </Button>
                    </form>
                )}
            </Consumer>
        )
    }
}

export default withStyles(styles)(InputForm);