
import { Component } from 'react'
import StatCard from '../components/shared/StatCard';
import {
    Smartphone,
    PhoneCall,
    Mail,
    MapPin
  } from 'react-feather';
  import {
    Col,
    Message,
    Row,
    Card,
    Input,
    Divider
  } from 'antd';
  import { theme } from '../components/styles/GlobalStyles';
  
  const { TextArea } = Input;
  
  const MY_API = 'AIzaSyBgD23YwqAJet9vHzbUinYYaodOiff8y30'
    let _url = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBgD23YwqAJet9vHzbUinYYaodOiff8y30&q=40.7127837,-74.0059413`
  
  

class Iletisim extends Component {
    render() {
        return (
        <div>

        <Row gutter={16} id="components-button-demo">
        <Card bodyStyle={{ padding: 0 }} style={{ marginBottom:'20px'}}>

                     <iframe frameBorder="20" style={{ width: "100%", height: "500px"}} 
                            src={_url}>
                        </iframe>   
                    
                    </Card> 
                    <Row gutter={16} style={{margin:"20px"}}>
            <Col xs={24} sm={12} md={6} >
            <StatCard
                type="fill"
                title="Telefon"
                value={"0(212) 212 12 12"}
                icon={<PhoneCall size={20} strokeWidth={1} />}
                color={theme.primaryColor}
                clickHandler={() => Message.info('Campaign stat button clicked')}
            />
            </Col>
            <Col xs={24} sm={12} md={6}>
            <StatCard
                type="fill"
                title="Mail"
                value={"info@beninkinerede.com.tr"}
                icon={<Mail size={20} strokeWidth={1} />}
                color={theme.darkColor}
                clickHandler={() => Message.info('Customers stat button clicked')}
            />
            </Col>
            <Col xs={24} sm={12} md={6}>
            <StatCard
                type="fill"
                title="Adres"
                value={"Hacıbekir Sok No:12 İstanbul"}
                icon={<MapPin size={20} strokeWidth={1} />}
                color={theme.warningColor}
                clickHandler={() => Message.info('Queries stat button clicked')}
            />
            </Col>
            <Col xs={24} sm={12} md={6}>
            <StatCard
                type="fill"
                title="GSM"
                value={"0533 333 33 33"}
                icon={<Smartphone size={20} strokeWidth={1} />}
                color={theme.errorColor}
                clickHandler={() => Message.info('Opens stat button clicked')}
            />
            </Col>
        </Row>

                    <Card  style={{ margin:'30px'}}>
                    <Divider orientation="left">
                        <small>İletişim Formu</small>
                     </Divider>
                     <div bodyStyle={{ padding: 20 }}>
                     <Input style={{ marginBottom:'20px'}} placeholder="İsim " />
                     <Input style={{ marginBottom:'20px'}} placeholder="Email " />
                     <Input style={{ marginBottom:'20px'}} placeholder="Konu" />
                     <TextArea rows={4} style={{ marginBottom:'20px'}} placeholder="Metninizi Giriniz" />
                     </div>
                    </Card>   
                   
                    <Card bodyStyle={{ padding: 0 }} style={{ marginBottom:'20px'}}>
                        
                    </Card> 

            </Row>
        </div>
          
        );
      }
    }
    
export default Iletisim