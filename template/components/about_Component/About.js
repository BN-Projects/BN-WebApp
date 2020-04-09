import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as authActions  from '../../redux/actions/authActions'
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
                <Row>
                <Col span={9}>
                </Col>
                <Col span={6}>
				          <form onSubmit={this.onSubmit}>
					          <div>
						          <Input
                            type="text"
                            placeholder="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                        />
                    </div>
					        <div>
                    <p>   </p>
					    	        <Input 
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                        <Button type="primary" htmlType="submit" block className="mt-3">
                                        Giriş Yap
                        </Button>
                       
                    </div>
				</form>
                <div>{this.props.currentToken}</div>
                </Col>
                </Row>
                </Card>
            </div>                        
        )
    }
}

function mapStateToProps(state) {
    return {
        currentToken : state.authReducer,
    };
  }
function mapDispatchToProps(dispatch) {
    return {
      actions: {
        loginUser: bindActionCreators(authActions.loginUser, dispatch)
      }
    };
  }
  //actions aldik

export default connect(mapStateToProps, mapDispatchToProps)(About);