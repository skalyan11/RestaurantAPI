import React from 'react';

const CreateAccountPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>Create an Account</h1>
      <form>
        {/* Form fields for account creation */}
        <input type="text" placeholder="Username" />
        <br />
        <input type="email" placeholder="Email" />
        <br />
        <input type="password" placeholder="Password" />
        <br />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccountPage;
