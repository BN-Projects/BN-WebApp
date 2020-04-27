import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as profileViewActions  from '../../redux/actions/profileViewActions'
import { bindActionCreators } from "redux";
import { Button, Col , Input, Card, Row } from 'antd';


class About extends Component {
    constructor(){
        super()
        this.state = {
            email: 'den55',
            password: 'deneme'
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() 
      {
        if(this.props.currentToken == "Default Token")
        {
          console.log("TOKEN YOK", this.props.currentToken )
        }
        else
        {
          console.log("TOKEN VAR", this.props.currentToken )
        }
      }

    onSubmit = e => {
        e.preventDefault();
        var paramsNames=["email", "password"];
        //console.log(this.state.email)
        var paramsValues=[this.state.email,this.state.password];
        //this.props.actions.loginUser("login",paramsNames,paramsValues);
      }

      onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
      }
      

    render() {

        return(
            <div float='center'
            >
              <Card>
                
                <div>{this.props.currentToken}</div>
                <div>{this.props.profiledata.user_real_name}</div>
                <div>{this.props.profiledata.user_surname}</div>
                <div>{this.props.profiledata.user_password}</div>
                <div>{this.props.profiledata.user_img}</div>
                </Card>
            </div>                        
        )
    }
}

function mapStateToProps(state) {
    return {
        currentToken : state.authReducer,
        profiledata : state.profileViewReducer,
    };
  }
function mapDispatchToProps(dispatch) {
    return {
      actions: {
        profilePage: bindActionCreators(profileViewActions.ProfileInformation, dispatch)
      }
    };
  }
  //actions aldik

export default connect(mapStateToProps, mapDispatchToProps)(About);