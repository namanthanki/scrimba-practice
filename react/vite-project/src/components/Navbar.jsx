import logo from '../assets/react.svg'
import ThemeSwitcher from './ThemeSwitcher';

const Navbar = () => {
    return (
        <nav>
            <img className='nav--icon' src={logo} alt="React Logo" />
            <h3 className='nav--logo-text'>React Facts</h3>
            <ThemeSwitcher />
            <h4 className='nav--title'>React Course - Project 1</h4>
        </nav>
    )
}

export default Navbar;