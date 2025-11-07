import React from "react";
import ContactForm from "./components/ContactForm";
import "./App.css";

function App() {
    return (
        <div className="app-container">
            <header className="header">
                <h1>Contact Us</h1>
                <p>We’d love to hear from you. Please fill out the form below.</p>
            </header>

            <main>
                <ContactForm />
            </main>
        </div>
    );
}

export default App;
