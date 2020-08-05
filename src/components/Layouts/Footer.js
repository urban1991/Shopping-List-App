import React, { Component } from 'react';
import { Paper, Tabs } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import { withContext } from '../../context';

class Footer extends Component {

    onIndexSelect = (e, index) => {
        const { onCategorySelect, categories } = this.props;
        onCategorySelect(index === '' ? 0 : categories[index - 1])
    }

    renderCategories = () => {
        const { categories } = this.props;
        return categories.map(category => {
            return <Tab key={ category } label={ category } />
        });
    } 

    getIndex = () => {
        const { selectedCategory, categories } = this.props;
        return selectedCategory ? categories.findIndex(category => category === selectedCategory) + 1 : 0;
    } 

    render() {
        return (
            <Paper>
                <Tabs
                 value={this.getIndex()}
                 onChange={this.onIndexSelect}
                 indicatorColor="primary"
                 textColor="primary"
                 variant="scrollable"
                 scrollButtons="auto"
                >
                <Tab label="All" />
                 {this.renderCategories()}
                </Tabs>
            </Paper>
        );
    };
};

export default withContext(Footer);