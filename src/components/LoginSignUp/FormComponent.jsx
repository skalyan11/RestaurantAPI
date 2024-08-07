import React, { useState, useEffect } from 'react';

const FormComponent = ({ isSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const formElements = document.querySelectorAll('.form .form-element');
    formElements.forEach((item, i) => {
      setTimeout(() => {
        item.style.opacity = 1;
      }, i * 100);
    });
  }, []);

  const handleSubmit = () => {
    if (isSignup) {
      // Signup logic
      fetch('/api/register-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.name) {
            alert('Registration successful');
          } else {
            alert(data);
          }
        });
    } else {
      // Login logic
      fetch('/api/login-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.token) {
            alert('Login successful');
            // Redirect or perform further actions here
          } else {
            alert(data.error || 'Login failed');
          }
        });
    }
  }

  return (
    <div className="form">
      {isSignup && (
        <input
          type="text"
          className="form-element name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <input
        type="email"
        className="form-element email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="form-element password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="button" className="form-element submit-btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default FormComponent;