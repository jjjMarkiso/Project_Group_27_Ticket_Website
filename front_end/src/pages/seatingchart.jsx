import { useState } from "react";
import Header from "./header_footer/Header.jsx";
import Footer from "./header_footer/Footer.jsx";
import styles from "./seatingchart.module.css";

function SeatingChart() {
    // Example seat layout: 5 rows × 8 seats per row
    const rows = 5;
    const cols = 8;

    // Initialize seat availability (true = available, false = taken)
    const [seats, setSeats] = useState(
        Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => true)
        )
    );

    const toggleSeat = (rowIndex, colIndex) => {
        setSeats(prev => {
            const updated = prev.map(row => [...row]);

            const isAvailable = updated[rowIndex][colIndex];

            if (isAvailable) {
                // Confirm before marking seat as taken
                const confirmSeat = window.confirm("Do you want to select this seat?");
                if (!confirmSeat) return prev;   // user canceled
            } else {
                // Optional: confirm releasing a seat
                const confirmRelease = window.confirm("Do you want to unselect this seat?");
                if (!confirmRelease) return prev;
            }

            updated[rowIndex][colIndex] = !updated[rowIndex][colIndex];
            return updated;
        });
    };

    return (
        <>
            <Header />

            <main className={styles.container}>
                <h1 className={styles.title}>Select Your Seats</h1>

                <div className={styles.chart}>
                    {seats.map((row, rowIndex) => (
                        <div className={styles.row} key={rowIndex}>
                            {row.map((available, colIndex) => (
                                <div
                                    key={colIndex}
                                    className={`${styles.seat} ${
                                        available ? styles.available : styles.taken
                                    }`}
                                    onClick={() => toggleSeat(rowIndex, colIndex)}
                                ></div>
                            ))}
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </>
    );
}

export default SeatingChart;