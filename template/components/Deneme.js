import { Card } from 'antd';
import React, { Component } from 'react'
import { connect } from 'react-redux'

class Deneme extends Component {
  componentDidMount() 
    {
        if (this.props.currentToken)
        {
          
        }
    }
  render() {
      return(
            
              <Card>
              <div>{this.props.currentToken}</div>
              </Card>                  
      )
  }
}

function mapStateToProps(state) {
  return {
      currentToken : state.authReducer,
  };
}
//actions aldik

export default connect(mapStateToProps)(Deneme);