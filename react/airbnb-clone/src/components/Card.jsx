import PropTypes from 'prop-types';
import starIcon from '../assets/star.png';

const Card = (props) => {
    let badgeText;
    if (props.openSpots === 0) {
        badgeText = "SOLD OUT";
    } else if (props.location === "Online") {
        badgeText = "ONLINE";
    }

    console.log(props)
    return (
        <div className="card">
           {badgeText && <div className="card--badge">{badgeText}</div>}
            <img src={`./src/assets/${props.coverImg}`} alt="Placeholder Image 1" />
            <div className="card--stats">
                <img className="card--star-icon" src={starIcon} alt="Rating Icon" />
                <span>{props.stats.rating}</span>
                <span className='gray'>({props.stats.reviewCount}) • </span>
                <span className='gray'>{props.location}</span>
            </div>
            <h2 className="card--title">{props.title}</h2>
            <p className="card--price"><span className='bold'>From ${props.price}</span> / person</p>
        </div>  
    ); 
}

Card.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    coverImg: PropTypes.string,
    stats: PropTypes.objectOf(
        PropTypes.oneOfType([
            PropTypes.number,
        ])
    ),
    location: PropTypes.string,
    openSpots: PropTypes.number,
}

export default Card;