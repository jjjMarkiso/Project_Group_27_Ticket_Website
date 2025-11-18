import Header from './header_footer/Header.jsx';
import Footer from './header_footer/Footer.jsx';
import styles from './main.module.css';

function FilterPage() {

    const items = [{ itemName: "Item 2", itemId: "2"},
        { itemName: "Item 4", itemId: "4"},
        { itemName: "Item 5", itemId: "5"},
        { itemName: "Item 7", itemId: "7"},
        { itemName: "Item 9", itemId: "9"},]

    return (
        <>
            <Header />            

            <div className={styles.container}>
                {
                    items.map((val) => {
                        return <div className={styles.item}>{val.itemName}</div>
                    })
                }
            </div>

            <Footer />
        </>
    );
}

export default FilterPage;