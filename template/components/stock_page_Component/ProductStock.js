import { Card, Col, Row,message} from "antd";
import { Button } from "antd";
import React, { Component } from "react";
import Media from "react-media";

import { getConnectionLink } from "../../lib/connector";
import { connect } from "react-redux";
import * as authActions from "../../redux/actions/authActions";
import { bindActionCreators } from "redux";
import * as stockViewActions from "../../redux/actions/stockViewActions";
import * as profileViewActions  from '../../redux/actions/profileViewActions'

import Router from "next/router"

const error = () => {
  message.error("Bu sayfaya girme iznine sahip değilsiniz");
};

class ProductStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
      loaded: false
    };
  }

  
  componentDidMount() {
    setTimeout(() => {
      if(this.props.profiledata.role_lvl !=5)
      {
        Router.push("/homepage") 
      }
    }, 700);
    if (this.props.currentToken != "") {
      if (this.props.stock_data == "") {
        var paramsNames = ["token"];
        var paramsValues = [this.props.currentToken];
        var obj = getConnectionLink(
          "stocks",
          paramsNames,
          paramsValues,
          "POST"
        );
        this.props.actions.StockViewPage(obj);
        console.log(this.props.stock_data);
      } else {
        this.setState(
          { stocks: this.props.stock_data, loaded: true },
          function() {
            console.log(this.state.stocks);
          }
        );
      }
    } else {
      setTimeout(() => {
        var paramsNames = ["token"];
        var paramsValues = [this.props.currentToken];
        var obj = getConnectionLink(
          "stocks",
          paramsNames,
          paramsValues,
          "POST"
        );
        this.props.actions.StockViewPage(obj);
        console.log(this.props.stock_data);
      }, 500);
    }
  }
  componentDidUpdate() {
    if (this.props.stock_data != "" && !this.state.loaded) {
      this.setState(
        { stocks: this.props.stock_data, loaded: true },
        function() {
          console.log(this.state.stocks);
        }
      );
    }
  }
  render() {
    var stockList = [];
    if (this.state.stocks != []) {
      this.state.stocks.forEach((stocks, i) => {
        stockList.push(
          <div key={i}>
            <Col md={12} lg={8} style={{ padding: 5 }}>
              <Card style={{ marginTop: "10px" }}>
                <h2 style={{ marginBottom: "10px" }}>CİHAZ X</h2>
                <Row className="a">
                  <Col lg={24} md={24}>
                    <p>
                      <strong>UUID:</strong> {stocks.uuid}
                    </p>
                  </Col>
                  <Col lg={24} md={24}>
                    <p>
                      <strong>MAJOR:</strong> {stocks.major}
                    </p>
                  </Col>
                  <Col lg={24} md={24}>
                    <p>
                      <strong>MINOR:</strong> {stocks.minor}
                    </p>
                  </Col>
                </Row>
              </Card>
            </Col>
          </div>
        );
      });
    } else {
      stockList = "Yükleniyor.";
    }
    return (
      <div className="stockListPage" style={{ padding: 5 }}>     
                <Row> {stockList} </Row>  
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    stock_data: state.stockViewReducer,
    currentToken: state.authReducer,
    profiledata : state.profileViewReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      StockViewPage: bindActionCreators(
        stockViewActions.StockViewPage,
        dispatch
      ),
      loginUser: bindActionCreators(authActions.loginUser, dispatch),
      profilePage: bindActionCreators(profileViewActions.ProfileInformation, dispatch), 
    }
  };
}
//actions aldik*/

export default connect(mapStateToProps, mapDispatchToProps)(ProductStock);
