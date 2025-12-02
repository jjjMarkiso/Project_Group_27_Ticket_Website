import Header from './header_footer/Header.jsx';
import Footer from './header_footer/Footer.jsx';
import styles from './signin.module.css';
import { useState } from 'react';

function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            username,
            password
        };

        try {
            const response = await fetch("http://localhost:8000/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            });

            const data = await response.json();

            console.log("Sign in response:", data);

            if (data.success) {
                alert("Welcome back!");

                // Save user data for later use
                localStorage.setItem("user", JSON.stringify({
                    user_id: data.user_id,
                    full_name: data.full_name,
                    username: username
                }));
                
                window.location.href = "/account";
            } else {
                alert(data.message || "Invalid username or password");
            }

        } catch (error) {
            console.error("Sign in error:", error);
            alert("Error contacting server");
        }
    };

    return (
        <>
            <Header />

            <main className={styles.main}>
                <div className={styles.card}>
                    <h1 className={styles.title}>Sign In</h1>

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
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className={styles.button}>
                            Sign In
                        </button>

                        <p className={styles.signUpField}>
                            No account? <a href="/signup">Create one</a>
                        </p>
                    </form>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default SignIn;