import React, { useState } from "react";
import "./ContactForm.css";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Front-end validation
        if (!formData.name || !formData.email || !formData.phone || !formData.message) {
            setStatus("❌ Please fill in all fields.");
            return;
        }

        if (!isValidEmail(formData.email)) {
            setStatus("❌ Please enter a valid email address.");
            return;
        }

        setLoading(true);
        setStatus("");

        try {
            const response = await fetch("https://vernanbackend.ezlab.in/api/contact-us/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("✅ Form Submitted Successfully!");
                setFormData({ name: "", email: "", phone: "", message: "" });
            } else {
                setStatus("⚠️ Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error(error);
            setStatus("🚨 Network Error. Try again later.");
        }

        setLoading(false);
    };

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Phone:</label>
                <input
                    type="text"
                    name="phone"
                    placeholder="Enter your phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Message:</label>
                <textarea
                    name="message"
                    placeholder="Enter your message"
                    value={formData.message}
                    onChange={handleChange}
                ></textarea>
            </div>

            <button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
            </button>

            {status && <p className="status-message">{status}</p>}
        </form>
    );
};

export default ContactForm;