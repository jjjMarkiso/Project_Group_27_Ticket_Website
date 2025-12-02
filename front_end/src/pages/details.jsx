import Header from './header_footer/Header.jsx';
import Footer from './header_footer/Footer.jsx';
import styles from './details.module.css';
import { useEffect, useState } from 'react';

function DetailsPage() {
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");

    // Load user data on page load
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
            window.location.href = "/signin";
            return;
        }

        // Pre-fill fields with stored info
        setUsername(storedUser.username);
        setFullName(storedUser.full_name);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const storedUser = JSON.parse(localStorage.getItem("user"));

        const response = await fetch("http://localhost:8000/update-account", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: storedUser.user_id,
                username,
                full_name: fullName
            })
        });

        const data = await response.json();

        if (data.success) {
            // update localStorage
            localStorage.setItem("user", JSON.stringify({
                ...storedUser,
                username,
                full_name: fullName
            }));

            alert("Profile updated!");
            window.location.href = "/account";
        } else {
            alert("Error updating profile");
        }
    };

    return (
        <>
            <Header />

            <main className={styles.container}>
                <h1 className={styles.title}>Profile Details</h1>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label>Username</label>
                        <input 
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className={styles.field}>
                        <label>Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>

                    <button type="submit" className={styles.saveButton}>
                        Save Changes
                    </button>
                </form>
            </main>

            <Footer />
        </>
    );
}

export default DetailsPage;