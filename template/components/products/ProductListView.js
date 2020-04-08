import React, { Component } from "react";
import { connect } from "react-redux";
import { Badge, ListGroup, ListGroupItem } from "reactstrap";
import { bindActionCreators } from "redux";
import * as productActions from "../../redux/actions/productActions";
class ProductListView extends Component {
  componentDidMount() {
    this.props.actions.getProducts();
  }
  render() {
    return (
      <div>
        <h3>
          <Badge color="success"> {this.props.currentCategory.name} </Badge>
        </h3>
        <ListGroup>
          {this.props.products.map(product => (
            <ListGroupItem key={product.id}>
                {product.name}
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
    products: state.productListReducer
  };
}//reducer'dan çekilen veri props'lara işlendi
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProducts: bindActionCreators(productActions.getProducts, dispatch)
    }
  };
}//actions alındı

export default connect(mapStateToProps, mapDispatchToProps)(ProductListView);
