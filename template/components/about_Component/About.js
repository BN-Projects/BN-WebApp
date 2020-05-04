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
      dictum non. Ultrices gravida dictum fusce ut placerat orci nulla
      pellentesque. Non blandit massa enim nec. Imperdiet massa tincidunt nunc
      pulvinar sapien et ligula. Scelerisque eleifend donec pretium vulputate
      sapien nec sagittis aliquam. Nec nam aliquam sem et tortor. A diam
      sollicitudin tempor id eu nisl nunc mi ipsum. Praesent semper feugiat nibh
      sed pulvinar. Viverra nibh cras pulvinar mattis nunc sed blandit. Nibh
      tellus molestie nunc non blandit massa enim nec dui. At volutpat diam ut
      venenatis tellus in. Consequat nisl vel pretium lectus. Etiam dignissim
      diam quis enim lobortis. Quis varius quam quisque id diam vel quam
      elementum. Iaculis at erat pellentesque adipiscing commodo elit at
      imperdiet dui. In arcu cursus euismod quis viverra nibh cras. Lectus
      mauris ultrices eros in cursus turpis. Pellentesque adipiscing commodo
      elit at imperdiet dui accumsan. Sed risus pretium quam vulputate dignissim
      suspendisse in est. Elementum eu facilisis sed odio morbi quis commodo.
      Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Magna etiam
      tempor orci eu lobortis. Vitae turpis massa sed elementum tempus. Pretium
      lectus quam id leo. Leo vel fringilla est ullamcorper eget nulla facilisi.
      Libero volutpat sed cras ornare arcu dui vivamus. Egestas pretium aenean
      pharetra magna ac placerat vestibulum. Facilisis mauris sit amet massa
      vitae tortor condimentum lacinia. Eu consequat ac felis donec. Pharetra
      diam sit amet nisl suscipit adipiscing bibendum est ultricies. Tincidunt
      dui ut ornare lectus. Ac feugiat sed lectus vestibulum mattis ullamcorper
      velit sed ullamcorper. Pellentesque habitant morbi tristique senectus et
      netus. Pharetra pharetra massa massa ultricies. Nibh mauris cursus mattis
      molestie a. A cras semper auctor neque. Urna cursus eget nunc scelerisque
      viverra mauris in. Commodo elit at imperdiet dui accumsan sit amet nulla.
      Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Tortor
      aliquam nulla facilisi cras fermentum odio eu. Pellentesque habitant morbi
      tristique senectus et netus et malesuada. Aliquet bibendum enim facilisis
      gravida. Rhoncus urna neque viverra justo. Blandit cursus risus at
      ultrices mi tempus. Faucibus turpis in eu mi bibendum neque. Netus et
      malesuada fames ac. Tristique senectus et netus et malesuada fames. Nisl
      vel pretium lectus quam id leo in vitae turpis. Scelerisque in dictum non
      consectetur a erat nam at lectus. Dignissim diam quis enim lobortis
      scelerisque fermentum dui faucibus in. A iaculis at erat pellentesque
      adipiscing. Nam libero justo laoreet sit amet cursus sit amet dictum. Nisl
      condimentum id venenatis a. Ultricies tristique nulla aliquet enim tortor
      at auctor urna. Congue mauris rhoncus aenean vel elit scelerisque. Sed
      vulputate mi sit amet mauris commodo. Rhoncus mattis rhoncus urna neque
      viverra justo nec. Phasellus faucibus scelerisque eleifend donec pretium
      vulputate sapien. In arcu cursus euismod quis. Nam at lectus urna duis
      convallis convallis. Nunc congue nisi vitae suscipit tellus mauris a. Ut
      ornare lectus sit amet est placerat in egestas. Pellentesque massa
      placerat duis ultricies lacus sed turpis. Tortor aliquam nulla facilisi
      cras fermentum. Non enim praesent elementum facilisis leo vel fringilla
      est ullamcorper. Odio pellentesque diam volutpat commodo. Risus feugiat in
      ante metus dictum at tempor commodo. Aliquam malesuada bibendum arcu vitae
      elementum curabitur vitae nunc sed. Non diam phasellus vestibulum lorem.
      Orci nulla pellentesque dignissim enim sit amet venenatis. Eu feugiat
      pretium nibh ipsum. Fusce id velit ut tortor pretium viverra suspendisse
      potenti nullam. Viverra nibh cras pulvinar mattis nunc sed. Aliquet
      bibendum enim facilisis gravida. Ornare lectus sit amet est. Feugiat nibh
      sed pulvinar proin gravida hendrerit. Ullamcorper dignissim cras tincidunt
      lobortis feugiat vivamus at augue eget.
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
        <Card>
          <Row>
            <Col sm={24}>
              <h1>Biz Kimiz ?</h1>
              <Paragraf />
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
