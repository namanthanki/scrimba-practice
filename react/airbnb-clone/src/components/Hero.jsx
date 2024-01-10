import photoGrid from '../assets/photo-grid.png'

const Hero = () => {
    return (
        <section className="hero">
            <img className="hero--photo" src={photoGrid} alt="Hero Photo Grid" />
            <h1 className="hero--header">Online Experiences</h1>
            <p className="hero--text">
                Join unique interactive activities led by 
                one-of-a-kind hosts—all without leaving home.
            </p>
        </section>
    )
}

export default Hero;