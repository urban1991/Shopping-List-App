import React, { Fragment } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import InputForm from './InputForm';
import { withContext } from '../../context';


class EditDialog extends React.Component {
    state = {
        open: false,
    }

    handleToggle = () => {
        this.setState({
            open: !this.state.open
        })
    }

    handleFormSubmit = product => {
        this.handleToggle()
    
        this.props.onEdit(product)
    }

    render() {
        const { selectedProduct } = this.props;
        return (
            <Fragment>
                <EditOutlinedIcon  onClick={this.handleToggle}/>
                <Dialog 
                    open={this.state.open}
                    onClose={this.handleToggle}
                >
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogContent>
                        <InputForm 
                            product={selectedProduct}
                            onSubmit={this.handleFormSubmit}
                        />
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

export default withContext(EditDialog);
