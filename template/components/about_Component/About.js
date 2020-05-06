import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import { Table, Button } from "reactstrap";
import { Card, Row, Col } from "antd";

const Paragraf = () => {
  return (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Velit aliquet sagittis
      id consectetur purus ut faucibus. Magna ac placerat vestibulum lectus
      mauris. Lorem donec massa sapien faucibus et molestie ac. Sed vulputate mi
      sit amet mauris commodo quis imperdiet. Condimentum mattis pellentesque id
      nibh tortor id. Volutpat blandit aliquam etiam erat velit scelerisque in
      dictum non.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Velit aliquet sagittis
      id consectetur purus ut faucibus. Magna ac placerat vestibulum lectus
      mauris.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Velit aliquet sagittis
      id consectetur purus ut faucibus. Magna ac placerat vestibulum lectus
      mauris. 
    </p>
  );
};
const Vizyonumuz = () => {
  return (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Velit aliquet sagittis
      id consectetur purus ut faucibus. Magna ac placerat vestibulum lectus
      mauris. 
    </p>
  );
};
const Misyonumuz = () => {
  return (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Velit aliquet sagittis
      id consectetur purus ut faucibus. Magna ac placerat vestibulum lectus
      mauris. 
    </p>
  );
};
class CartDetail extends Component {
  removeFromCart(product) {
    this.props.actions.removeFromCart(product);
  }
  render() {
    return (
      <div>
        <Card style={{margin:"50px", padding:"30px"}}>
          <Row>
            <Col sm={16}>
              <h1 style={{marginBottom:"50px"}}>Biz Kimiz ?</h1>
              <Paragraf />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <img src="https://provega.com.tr/wp-content/uploads/2019/10/img-kurumsal.png" alt="kurumsal_image" style={{ maxWidth:"80%", maxHeight:"80%" ,marginLeft:"30px" }} />
            </Col>
          </Row>
        </Card>

        <Card style={{margin:"50px", padding:"30px"}}>
          <Row>

            <Col sm={18}>
              <h1 style={{marginBottom:"50px"}}>Vizyonumuz</h1>
              <Vizyonumuz />
            </Col>

          </Row>
        </Card>

        <Card style={{margin:"50px", padding:"30px"}}>
          <Row>

            <Col sm={18}>
              <h1 style={{marginBottom:"50px"}}>Misyonumuz</h1>
              <Misyonumuz />
            </Col>

          </Row>
        </Card>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
    },
  };
}
function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);
