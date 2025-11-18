import Header from './header_footer/Header.jsx';
import Footer from './header_footer/Footer.jsx';
import styles from './signin.module.css';

function SignIn() {
    return (
        <>
            <Header />

            <main className={styles.main}>
                <div className={styles.card}>
                    <h1 className={styles.title}>Sign In</h1>

                    <form className={styles.form}>
                        <div className={styles.field}>
                            <label htmlFor="user_id">Username</label>
                            <input 
                                type="text" 
                                id="user_id" 
                                placeholder="Enter your username" 
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
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