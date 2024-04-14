import React, { useState } from 'react';
import { Modal, Button, TextField, Typography } from '@mui/material';

const LoginModal = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creatingAccount, setCreatingAccount] = useState(false); // Estado para controlar la creación de cuenta
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCreateAccountClick = () => {
    setCreatingAccount(true);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (creatingAccount) {
      // Aquí podrías hacer la petición a tu API para crear una cuenta
      // Por simplicidad, este ejemplo solo muestra los datos en la consola
      console.log('Creating Account...');
      console.log('First Name:', firstName);
      console.log('Last Name:', lastName);
      console.log('Email:', email);
      console.log('Password:', password);
    } else {
      // Aquí podrías hacer la petición a tu API para autenticar al usuario
      // Por simplicidad, este ejemplo solo muestra los datos en la consola
      console.log('Email:', email);
      console.log('Password:', password);
    }

    // Cierra el modal después de enviar los datos
    onClose();
  };

  const modalStyle = {
    position: 'absolute',
    width: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
    padding: '20px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  const textFieldStyle = {
    marginBottom: '16px',
  };

  const buttonStyle = {
    marginTop: '16px',
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
    >
      <div style={modalStyle}>
        <Typography variant="h6" component="h2" id="login-modal-title">
          {creatingAccount ? 'Create Account' : 'Login'}
        </Typography>
        <form onSubmit={handleSubmit}>
          {creatingAccount && (
            <>
              <TextField
                id="first-name"
                label="First Name"
                variant="outlined"
                fullWidth
                style={textFieldStyle}
                value={firstName}
                onChange={handleFirstNameChange}
              />
              <TextField
                id="last-name"
                label="Last Name"
                variant="outlined"
                fullWidth
                style={textFieldStyle}
                value={lastName}
                onChange={handleLastNameChange}
              />
            </>
          )}
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            style={textFieldStyle}
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            style={textFieldStyle}
            value={password}
            onChange={handlePasswordChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={buttonStyle}
          >
            {creatingAccount ? 'Create Account' : 'Login'}
          </Button>
        </form>
        <Typography variant="body2">
          {creatingAccount
            ? 'Already have an account?'
            : "Don't have an account?"}
          <Button onClick={() => setCreatingAccount(!creatingAccount)}>
            {creatingAccount ? 'Login' : 'Create Account'}
          </Button>
        </Typography>
      </div>
    </Modal>
  );
};

export default LoginModal;
