import { Button, Input} from 'antd';
import ProfileCard from './shared/ProfileCard';
import { Edit } from 'react-feather';




const ProductOne = () => (
    <div>
    <ProfileCard
            name={'John Doe'}
            avatar="/static/images/face1.jpg"
            images={[
              '/static/images/unsplash/4.jpg',
              '/static/images/unsplash/6.jpg'
            ]}
            location={'London, Uk'}
            imageHeight={230}
            
            
          />
          <div style={{ padding:'20px' }}>
            
            <Input style={{ marginBottom:'20px' , width:'365px', marginRight:'10px'}} placeholder="İsim " />
            <Button
                  shape="circle"
                  type="primary"
                  size="large"
                  className="phone"
                >
                  <Edit size={16} strokeWidth={1} />
                </Button>
                <Input style={{ marginBottom:'20px' , width:'365px', marginRight:'10px'}} placeholder="Soyisim " />
            <Button
                  shape="circle"
                  type="primary"
                  size="large"
                  className="phone"
                >
                  <Edit size={16} strokeWidth={1} />
                </Button>
                <Input style={{ marginBottom:'20px' , width:'365px', marginRight:'10px'}} placeholder="Telefon " />
            <Button
                  shape="circle"
                  type="primary"
                  size="large"
                  className="phone"
                >
                  <Edit size={16} strokeWidth={1} />
                </Button>
                <Input style={{ marginBottom:'20px' , width:'365px', marginRight:'10px'}} placeholder="Adres " />
            <Button
                  shape="circle"
                  type="primary"
                  size="large"
                  className="phone"
                >
                  <Edit size={16} strokeWidth={1} />
                </Button>
          </div>
          <div className="text-center mt-3 mb-3">
          <Button type="primary" float='center'>DEĞİŞİKLİKLERİ KAYDET</Button>
          </div>
         
          
    </div>
    );

export default ProductOne;