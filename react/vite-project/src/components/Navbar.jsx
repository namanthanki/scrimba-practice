import logo from '../assets/react.svg'

const Navbar = () => {
    return (
        <nav>
            <img className='nav--icon' src={logo} alt="React Logo" />
            <h3 className='nav--logo-text'>React Facts</h3>
            <h4 className='nav--title'>React Course - Project 1</h4>
        </nav>
    )
}

export default Navbar;