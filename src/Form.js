import { useState } from "react";
import "./Form.css";

export default function MyForm() {
  const [inputForm, setInputForm] = useState({
    name: "",
    email: "",
    age: "",
    accept: false,
    role: "",
  });

  const [errors, setErrors] = useState({}); // State for validation errors

  const validateForm = () => {
    const newErrors = {};
    if (!inputForm.name.trim()) newErrors.name = "Name is required";
    if (!inputForm.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/))
      newErrors.email = "Invalid email format";
    if (!inputForm.age || inputForm.age < 1 || isNaN(inputForm.age))
      newErrors.age = "Age must be a valid number";
    if (!inputForm.role) newErrors.role = "Please select a role";
    if (!inputForm.accept) newErrors.accept = "You must accept the terms";
    return newErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputForm({ ...inputForm, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error on change
  };

  const checkHandleChange = (event) => {
    const { name, checked } = event.target;
    setInputForm({ ...inputForm, [name]: checked });
    setErrors({ ...errors, [name]: "" }); // Clear error on change
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Form submitted:", inputForm); // Replace with API call or other logic
    // Optional: Reset form after submission
    setInputForm({ name: "", email: "", age: "", accept: false, role: "" });
    setErrors({});
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h1>
        <i>Form</i>
      </h1>
      <div className="labels">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          value={inputForm.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <span id="name-error" className="error">
            {errors.name}
          </span>
        )}

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={inputForm.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <span id="email-error" className="error">
            {errors.email}
          </span>
        )}

        <label htmlFor="age">Age:</label>
        <input
          id="age"
          name="age"
          type="number"
          value={inputForm.age}
          onChange={handleChange}
          min="1"
          aria-invalid={!!errors.age}
          aria-describedby={errors.age ? "age-error" : undefined}
        />
        {errors.age && (
          <span id="age-error" className="error">
            {errors.age}
          </span>
        )}
      </div>

      <div className="roles">
        <label>
          <input
            id="student"
            name="role"
            value="student"
            type="radio"
            checked={inputForm.role === "student"}
            onChange={handleChange}
          />
          Student
        </label>
        <label>
          <input
            id="teacher"
            name="role"
            value="teacher"
            type="radio"
            checked={inputForm.role === "teacher"}
            onChange={handleChange}
          />
          Teacher
        </label>
        {errors.role && <span className="error">{errors.role}</span>}
      </div>

      <label htmlFor="accept">
        <input
          id="accept"
          type="checkbox"
          name="accept"
          checked={inputForm.accept}
          onChange={checkHandleChange}
          aria-invalid={!!errors.accept}
          aria-describedby={errors.accept ? "accept-error" : undefined}
        />
        Accept Terms
      </label>
      {errors.accept && (
        <span id="accept-error" className="error">
          {errors.accept}
        </span>
      )}

      <br className="br" />
      <button type="submit">Submit</button>
    </form>
  );
}
