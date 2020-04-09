import ProfileCard from '../components/profile_page_Component/ProfileCard';
import Header from '../components/styles/Header'
import { Component } from 'react'

class profilePage extends Component {
    render() {
        return (
        <div>
            <Header> </Header>
            <ProfileCard/>
        </div>
        )
    }
}
export default profilePage;