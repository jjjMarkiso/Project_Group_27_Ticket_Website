import Header from './header_footer/Header.jsx';
import Footer from './header_footer/Footer.jsx';
import styles from './main.module.css';
import eventImg3 from '../assets/festival1.jpg'
import { Link } from "react-router-dom";

function FilterFestival() {

    const items = [{ itemName: "Festival A", itemId: "1", img: eventImg3},
        { itemName: "Festival B", itemId: "4", img: eventImg3},
        { itemName: "Festival C", itemId: "8", img: eventImg3},]

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

export default FilterFestival;