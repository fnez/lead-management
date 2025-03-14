"use client";
import { useState } from "react";
// import { useRouter } from "next/router";
import styles from "./page.module.css";

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    linkedIn: "",
    visas: [],
    resume: null,
    additionalInfo: "",
  });

  const [message, setMessage] = useState("");
  // const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleMultiSelectChange = (e) => {
    const options = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({ ...formData, visas: options });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.linkedIn
    ) {
      setMessage("Please fill in all required fields.");
      return;
    }

    const formPayload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "visas") {
        formData[key].forEach((visa) => formPayload.append("visas", visa));
      } else {
        formPayload.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        body: formPayload,
      });

      if (response.ok) {
        setMessage("Lead submitted successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          linkedIn: "",
          visas: [],
          resume: null,
          additionalInfo: "",
        });
      } else {
        setMessage("Error submitting lead.");
      }
    } catch (error) {
      setMessage("Error");
      console.error(`Error: ${error}`);
    }
  };

  return (
    <>
      <section className={styles.banner}></section>
      <div className={styles.formContainer}>
        <section className={styles.heading}>
          <h1>Want to understand your visa options?</h1>
          <h2>
            Submit the form below and our team of experienced attorneys will
            review your information and send a preliminary assessment of your
            case based on your goals.
          </h2>
        </section>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="url"
            name="linkedIn"
            placeholder="LinkedIn Profile"
            value={formData.linkedIn}
            onChange={handleChange}
            required
          />
          <h2>Visa categories of interest ?</h2>
          <select
            className={styles.select}
            multiple
            name="visas"
            onChange={handleMultiSelectChange}
          >
            <option value="H1B">H1B</option>
            <option value="F1">F1</option>
            <option value="Green Card">Green Card</option>
            <option value="I don't know">I don't know</option>
          </select>
          <input type="file" name="resume" onChange={handleFileChange} />
          <h2>How can we help you ?</h2>
          <textarea
            className={styles.additionalInfo}
            name="additionalInfo"
            placeholder="What is your current status and when does it expire ? What is your past immigration history ? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?"
            value={formData.additionalInfo}
            onChange={handleChange}
          ></textarea>
          <button type="submit">Submit</button>
          {message && <p>{message}</p>}
        </form>
      </div>
    </>
  );
}
