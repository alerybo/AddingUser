import classes from './Card.module.css';

const Card = (props) => {
    //add both styling classes: from .card.module.css and from any props classes:
  return <div className={`${classes.card} ${props.className}`}>{props.children}</div>;
};

export default Card;
