import Header from './header_footer/Header.jsx';
import Footer from './header_footer/Footer.jsx';
import styles from './billing.module.css';
import { useState, useEffect } from 'react';

function BillingInfoPage() {
    const [address, setAddress] = useState("");

    // Load existing billing info on page load
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser) {
            window.location.href = "/signin";
            return;
        }

        // Fetch billing info from backend
        fetch("http://localhost:8000/get-billing", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: storedUser.user_id })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setAddress(data.billing_address);
            }
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const storedUser = JSON.parse(localStorage.getItem("user"));

        const response = await fetch("http://localhost:8000/update-billing", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: storedUser.user_id,
                billing_address: address
            })
        });

        const data = await response.json();

        if (data.success) {
            alert("Billing address updated!");
        } else {
            alert("Error updating billing address");
        }
    };

    return (
        <>
            <Header />

            <main className={styles.container}>
                <h1 className={styles.title}>Billing Information</h1>

                <form className={styles.form} onSubmit={handleSubmit}>

                    <div className={styles.field}>
                        <label>Billing Address</label>
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter your billing address"
                            rows={4}
                        />
                    </div>

                    <button type="submit" className={styles.saveButton}>
                        Save Address
                    </button>
                </form>
            </main>

            <Footer />
        </>
    );
}

export default BillingInfoPage;