import Nametag from "./Nametag"
import testuser from '../assets/testuser.jpeg'

const UserIcon = () => {
  return (
    <div className="user-icon"><img className='user-icon-img' src={testuser} alt="user-icon" /><Nametag /></div>
  )
}

export default UserIcon