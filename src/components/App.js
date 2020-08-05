import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Layouts/Header';
import Footer from './Layouts/Footer';
import ProductList from './Lists/ProductList';
import { categories, units } from '../store';
import { Provider } from '../context';

class App extends React.Component {
  state = {
    shoppingList: [],
    selectedCategory: null,
    selectedProduct: {},
  }

  componentDidMount() {
    const shoppingList = JSON.parse(localStorage.getItem("shoppingList") || "[]");
    this.setState({ shoppingList });
  }

  handleLocaleStorageSave = () => {
    localStorage.setItem('shoppingList',JSON.stringify(this.state.shoppingList))
  }

  handleClearList = () => {
    localStorage.clear();
    this.setState({ shoppingList: [] })
  }

  getProductsByCategories() {
    return Object.entries(
      this.state.shoppingList.reduce((shoppingList, shoppingItem) => {
        const { category } = shoppingItem;

        shoppingList[category] = shoppingList[category] ?
        [...shoppingList[category], shoppingItem] : [shoppingItem];

        return shoppingList;
      }, {})
    )
  }
  
  handleCategorySelect = category => 
    this.setState({
      selectedCategory: category
    })

  handleProductAdd = product => 
    this.setState(({ shoppingList }) => ({
      shoppingList: [...shoppingList, product]
    }))

  handleProductEdit = product => 
    this.setState(({ shoppingList }) => ({
      shoppingList: [
        ...shoppingList.filter(el => el.id !== product.id),
        product
      ],
      product
    }))
    
  handleProductSelect = id => 
    this.setState(({ shoppingList }) => ({
      selectedProduct: shoppingList.find(product => product.id === id)
    }))

  handleProductDelete = id => 
    this.setState(({ shoppingList }) => ({
      shoppingList: shoppingList.filter(product => product.id !== id)
    }))

  getContext = () => ({
    categories,
    units,
    ...this.state,
    productsByCategory: this.getProductsByCategories(),
    onCategorySelect: this.handleCategorySelect,
    onEdit: this.handleProductEdit,
    onDelete: this.handleProductDelete,
    onProductAdd: this.handleProductAdd,
    onSelect: this.handleProductSelect,
    onSelectItem: this.handleSelectItem,
    clearList: this.handleClearList,
    localStorageSave: this.handleLocaleStorageSave
    
  })  
    
  render() {  
    return ( 
      <Provider value={this.getContext()}>
        <CssBaseline />

        <Header />

        <ProductList />

        <Footer />

      </Provider>
    );
  };
};

export default App;