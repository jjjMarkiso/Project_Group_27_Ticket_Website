import Header from './header_footer/Header.jsx';
import Footer from './header_footer/Footer.jsx';
import styles from './signup.module.css';
import { useState } from 'react';

function SignUp() {

    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirm) {
            alert("Passwords do not match!");
            return;
        }

        const newUser = {
            username,
            full_name: fullName,
            password
        };

        try {
            const response = await fetch("http://localhost:8000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser)
            });

            const data = await response.json();
            console.log("Signup response:", data);

            if (data.success) {
                alert("Account created!");
                window.location.href = "/signin";
            } else {
                alert("Signup failed");
            }

        } catch (error) {
            console.error("Signup error:", error);
            alert("An error occurred");
        }
    };

    return (
        <>
            <Header />

            <main className={styles.main}>
                <div className={styles.card}>
                    <h1 className={styles.title}>Create an Account</h1>

                    <form className={styles.form} onSubmit={handleSubmit}>

                        <div className={styles.field}>
                            <label>Username</label>
                            <input 
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Full Name</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className={styles.button}>
                            Sign Up
                        </button>

                    </form>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default SignUp;
