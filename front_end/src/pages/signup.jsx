import Header from './header_footer/Header.jsx';
import Footer from './header_footer/Footer.jsx';
import styles from './signup.module.css';

function SignUp() {
    return (
        <>
            <Header />

            <main className={styles.main}>
                <div className={styles.card}>
                    <h1 className={styles.title}>Create an Account</h1>

                    <form className={styles.form}>
                        <div className={styles.field}>
                            <label htmlFor="username">Username</label>
                            <input 
                                type="text" 
                                id="username" 
                                placeholder="Choose a username" 
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="name">Full Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                placeholder="Enter your full name" 
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Create a password"
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="confirm">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm"
                                placeholder="Re-enter your password"
                            />
                        </div>

                        <button type="submit" className={styles.button}>
                            Sign Up
                        </button>

                        <p className={styles.signInField}>
                            Already have an account? <a href="/signin">Sign in</a>
                        </p>
                    </form>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default SignUp;
