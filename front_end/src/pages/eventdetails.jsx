import { useParams, useNavigate } from "react-router-dom";
import Header from "./header_footer/Header.jsx";
import Footer from "./header_footer/Footer.jsx";

function EventDetails() {
    const { eventId } = useParams();
    const navigate = useNavigate();

    const handleSeatSelect = () => {
        const user = localStorage.getItem("user");

        if (!user) {
            alert("You must be signed in to select seats.");
            return navigate("/signin");
        }

        navigate("/seats");
    };

    return (
        <>
            <Header />
            <main style={{ padding: "2rem", paddingTop: "120px" }}>
                <h1>Event Details for Event {eventId}</h1>
                <p>This is where event info will be displayed!</p>

                <button onClick={handleSeatSelect}>
                    Choose Seats
                </button>
            </main>
            
            <Footer />
        </>
    );
}

export default EventDetails;