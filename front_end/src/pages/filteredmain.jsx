import Header from './header_footer/Header.jsx';
import Footer from './header_footer/Footer.jsx';
import styles from './main.module.css';
import eventImg from '../assets/music1.png'
import { Link } from "react-router-dom";

function FilterPage() {

    const items = [{ itemName: "Concert A", itemId: "1", img: eventImg},
        { itemName: "Concert D", itemId: "4", img: eventImg},
        { itemName: "Concert H", itemId: "8", img: eventImg},]

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

export default FilterPage;