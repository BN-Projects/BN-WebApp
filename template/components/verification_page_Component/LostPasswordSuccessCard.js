import { Row, Card, Button } from "antd";
import PropTypes from "prop-types";
import { getConnectionLink } from "../../lib/connector";
import { connect } from "react-redux";
import Link from "next/link";
import * as authActions from "../../redux/actions/authActions";
import { bindActionCreators } from "redux";
import * as lostPasswordActions from "../../redux/actions/lostPasswordActions";
import * as emailActions from "../../redux/actions/emailActions";
import React, { Component } from "react";
import { CheckCircle, AlertCircle } from 'react-feather';
import Router from "next/router"


class SuccessCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.token,
      email: props.email,
      loaded: false
    };
  }

  componentDidMount() {
    if (this.props.token != "" && this.props.email != "") {
        var paramsNames = ["token","email"];
        var paramsValues = [this.props.token, this.props.email];
        var obj = getConnectionLink(
            "lostpasswordcontrol",
            paramsNames,
            paramsValues,
            "GET"
        );
        this.props.actions.lostPasswordControlPage(obj);
        this.props.actions.getEmail(this.props.email); 
    }
    // setTimeout(() => {
    //   Router.push("/homepage") 
    // }, 3000);
}

componentDidUpdate() {
      
}



  render() {

    var verification = [];
    if (this.props.token != "" && this.props.token != null && this.props.email != "" && this.props.email != null) {
      verification=
            <Card >
              <Row style={{ textAlign: "center" }}>
                    <CheckCircle size={100} strokeWidth={1} color={'green'} />
                    <br/><br/><br/><br/>
                <strong><h3>Şifre Değiştirme İsteğiniz Başarılı Şekilde Gerçekleştirildi!</h3></strong>
                <br/><br/>
                <h5> 5 Saniye Sonra Ana Sayfaya Yönlendirileceksiniz!</h5>
                
                <br/><br/><br/><br/>
                <p>{this.props.token}</p>
                <p>{this.props.email}</p>
                <Button type="primary" href="/homepage" > Şifre Değiştirmeye Git! </Button>
                <br/><br/>
              </Row>
            </Card>;
      }
     else {
      verification =  
      <Card >
      
        <Row style={{ textAlign: "center" }}>
          <AlertCircle size={100} strokeWidth={1} color={'red'} />
          <br/><br/><br/><br/>
          <strong><h3>Şifre Değiştirme İsteğiniz Gerçekleştirilirken Bir Hata Oluştu!</h3></strong>
          <br/><br/>
          <h5>Lütfen Tekrar Deneyin!</h5>
          <br/><br/><br/><br/>
          <Button type="primary" href="/homepage" > Anasayfaya Git! </Button>
          <br/><br/>
        </Row>
    </Card>;
    }
    return (
      <div>
        {verification}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    lostpassword : state.lostPasswordReducer
      
  };
}
function mapDispatchToProps(dispatch) {
  return {
      actions: {
        lostPasswordControlPage: bindActionCreators(lostPasswordActions.lostPasswordControlPage, dispatch),
        getEmail: bindActionCreators(emailActions.getEmail, dispatch),
      }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessCard);
