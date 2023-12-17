import { Link } from 'react-router-dom';
import './LinkProfile.css';

export default function LinkProfile () {
  return (
    <Link to='/profile' className='link-profile'>
      <span className='link-profile__text'>Аккаунт</span>
      <div className='link-profile__icon'></div>
    </Link>
  )
}