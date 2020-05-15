import { Card, Col, Row, message,Divider } from "antd";
import { Clock } from 'react-feather';
import React, { Component } from "react";
import { getConnectionLink } from "../../lib/connector";
import { connect } from "react-redux";
import * as authActions from "../../redux/actions/authActions";
import { bindActionCreators } from "redux";
import * as notificationViewActions from "../../redux/actions/notificationViewActions";
import * as profileViewActions from "../../redux/actions/profileViewActions";
import moment from "moment";
import 'moment/locale/tr';

const error = () => 
{
  message.error("Bu sayfaya girme iznine sahip değilsiniz");
};

class NotificationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: "",
      loaded: false,
    };
  }
  dateTime = (date) =>{
    date=moment(date).format('MMMM Do YYYY, h:mm:ss a');
    var currentDate = moment();
    let minute =currentDate.diff(date, 'minutes')
    let hour =currentDate.diff(date, 'hours')
    let day =currentDate.diff(date, 'days')
    let week =currentDate.diff(date, 'weeks')
    if(minute<60)
    {
      return minute+" dakika önce"
    }
    else if(hour<24)
    {
      let time = minute%60;
      return hour +" saat " + time + " dakika önce"
    }
    else if(day<7)
    {
      return day+" gün önce"
    }
    else
    {
      return week+" hafta önce"
    }
  }
  componentDidMount() {
    if (this.props.currentToken != "") {
      if (this.props.notification_data == "") {
        var paramsNames = ["userId"];
        var paramsValues = [this.props.profiledata.user_id];
        var obj = getConnectionLink(
          "mynotifications",
          paramsNames,
          paramsValues,
          "POST"
        );
        this.props.actions.notificationViewPage(obj);
      } else {
        this.setState(
          { notifications: this.props.notification_data, loaded: true },
          function() {}
        );
      }
    } else {
      setTimeout(() => {
        var paramsNames = ["userId"];
        var paramsValues = [this.props.profiledata.user_id];
        var obj = getConnectionLink(
          "mynotifications",
          paramsNames,
          paramsValues,
          "POST"
        );
        this.props.actions.notificationViewPage(obj);
      }, 500);
    }
  }
  componentDidUpdate() {
    if (this.props.notification_data != "" && !this.state.loaded) {
      this.setState(
        { notifications: this.props.notification_data, loaded: true },
        function() {}
      );
    }
  }
  render() {
    return (
      <div className="notificationList" style={{ padding: 5 }}>
        <Row>
          {" "}
          {this.props.notification_data.map((notification, i) => (
            <div key={i}>
              <Col style={{ padding: 5 }}>
                <Card style={{ marginTop: "10px" }}>
                  <Row>
                  <Col lg={2} md={1}>
                    <img src="../static/images/bnLogo.png" style={{maxWidth:"75px",maxHeigth:"75px" }} alt="logo"/>
                  </Col>
                  <Col lg={36} md={18}>
                  <h2 style={{ marginBottom: "20px" }}>{notification.title}</h2>
                  <p>{notification.description}</p> 
                  </Col>
                  </Row>
                  <Divider/>
                  <Row style={{textAlign:"right", marginRight:"10px"}}>
                  
                  <Clock style={{marginRight:"10px"}} />{this.dateTime(notification.date)}
                  </Row>
                </Card>
              </Col>
            </div>
          ))}
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    notification_data: state.notificationViewReducer,
    currentToken: state.authReducer,
    profiledata: state.profileViewReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      notificationViewPage: bindActionCreators(
        notificationViewActions.notificationViewPage,
        dispatch
      ),
      loginUser: bindActionCreators(authActions.loginUser, dispatch),
      profilePage: bindActionCreators(
        profileViewActions.ProfileInformation,
        dispatch
      ),
    },
  };
}
//actions aldik*/

export default connect(mapStateToProps, mapDispatchToProps)(NotificationView);
