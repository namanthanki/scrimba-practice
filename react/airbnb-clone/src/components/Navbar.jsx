import logo from '../assets/airbnb-logo.png'

const Navbar = () => {
  return (
    <nav>
        <img className="nav--logo" src={logo} alt="Airbnb Logo" />
        <h1 className="nav--title">airbnb</h1>
    </nav>
  )
}

export default Navbar;