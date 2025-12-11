import Header from './header_footer/Header.jsx';
import Footer from './header_footer/Footer.jsx';
import styles from './main.module.css';
import eventImg2 from '../assets/sports1.jpg'
import { Link } from "react-router-dom";

function FilterSport() {

    const items = [{ itemName: "Sport A", itemId: "1", img: eventImg2},
        { itemName: "Sport B", itemId: "4", img: eventImg2},
        { itemName: "Sport C", itemId: "8", img: eventImg2},]

    return (
        <>
            <Header />            

            <div className={styles.container}>
                {items.map((val) => (
                    <Link 
                        key={val.itemId} 
                        to={`/event/${val.itemId}`} 
                        className={styles.item}
                    >
                        <img src={val.img} className={styles.itemImage} />
                        <h3>{val.itemName}</h3>
                    </Link>
                ))}
            </div>

            <Footer />
        </>
    );
}

export default FilterSport;