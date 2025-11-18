import Header from './header_footer/Header.jsx';
import Footer from './header_footer/Footer.jsx';
import styles from './main.module.css';

function MainPage() {

    const items = [{ itemName: "Item 1", itemId: "1"},
        { itemName: "Item 2", itemId: "2"},
        { itemName: "Item 3", itemId: "3"},
        { itemName: "Item 4", itemId: "4"},
        { itemName: "Item 5", itemId: "5"},
        { itemName: "Item 6", itemId: "6"},
        { itemName: "Item 7", itemId: "7"},
        { itemName: "Item 8", itemId: "7"},
        { itemName: "Item 9", itemId: "7"},]

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

export default MainPage;