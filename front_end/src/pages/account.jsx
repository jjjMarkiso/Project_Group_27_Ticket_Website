import Header from './header_footer/Header.jsx';
import Footer from './header_footer/Footer.jsx';
import styles from './account.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from "react";


function AccountPage() {

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            // user NOT logged in
            window.location.href = "/signin";
        }
    }, []);

    const [ticketsOpen, setTicketsOpen] = useState(true);
    const [profileOpen, setProfileOpen] = useState(true);

    const handleSignOut = () => {
        // Clear any saved user info (optional for now)
        localStorage.removeItem("user");

        // Redirect to Sign In page
        window.location.href = "/signin";
    };

    return (
        <>
            <Header />

            <main className={styles.container}>
                <h1 className={styles.title}>My Account</h1>

                {/* My Tickets Section */}
                <div className={styles.section}>
                    <div 
                        className={styles.sectionHeader}
                        onClick={() => setTicketsOpen(!ticketsOpen)}
                    >
                        <h2>My Tickets</h2>
                        <span>{ticketsOpen ? '▴' : '▾'}</span>
                    </div>

                    {ticketsOpen && (
                        <ul className={styles.submenu}>
                            <li>Upcoming Events</li>
                            <li>Past Events</li>
                        </ul>
                    )}
                </div>

                {/* My Profile Section */}
                <div className={styles.section}>
                    <div 
                        className={styles.sectionHeader}
                        onClick={() => setProfileOpen(!profileOpen)}
                    >
                        <h2>My Profile</h2>
                        <span>{profileOpen ? '▴' : '▾'}</span>
                    </div>

                    {profileOpen && (
                        <ul className={styles.submenu}>
                            <li>
                                <Link to="/details" className={styles.link}>
                                    Profile Details
                                </Link>
                            </li>

                            <li>
                                <Link to="/billing" className={styles.link}>
                                    Billing Information
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>

                {/* Sign Out Button */}
                <button className={styles.signOutButton} onClick={handleSignOut}>
                    ⬅ Sign Out
                </button>
            </main>

            <Footer />
        </>
    );
}

export default AccountPage;