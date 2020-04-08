import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as productActions from "../../redux/actions/productActions";
import { ListGroup, ListGroupItem } from "reactstrap";
class CategoryListView extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  }
  selectCategory = (category) =>{
    this.props.actions.changeCategory(category);
    this.props.actions.getProducts(category.id)
  }
  render() {
    return (
      <div>
        <h1>Categories:{this.props.categories.length}</h1>
        <h5>Seçili Kategori: {this.props.currentCategory.name}</h5>
        <ListGroup>
          {this.props.categories.map(category => (
            <ListGroupItem key={category.id}
              active={category.id === this.props.currentCategory.id}
              onClick={() => this.selectCategory(category)}
            >
              {category.name}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    categories: state.categoryListReducer
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ),
      changeCategory: bindActionCreators(
        categoryActions.changeCategory,
        dispatch
      ),
      getProducts: bindActionCreators(productActions.getProducts, dispatch)
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryListView);
