import React, { useState } from 'react';
import { useMutation, gql, useApolloClient } from '@apollo/client';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  CssBaseline,
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $email: String!) {
    createUser(createUserInput: { name: $name, email: $email }) {
      id
      name
      email
    }
  }
`;

const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    userByEmail(email: $email) {
      id
      name
      email
    }
  }
`;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const client = useApolloClient();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [register, { loading, error }] = useMutation(REGISTER_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({
      variables: { name, email },
    }).then(async ({ data }) => {
      if (data && data.createUser) {
        client.writeQuery({
          query: GET_USER_BY_EMAIL,
          variables: { email: data.createUser.email },
          data: {
            userByEmail: data.createUser
          },
        });
        localStorage.setItem('user', JSON.stringify(data.createUser));
        navigate('/');
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inscription
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nom"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "S'inscrire"}
          </Button>
          {error && <Alert severity="error">{error.message}</Alert>}
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                {"Déjà un compte ? Connectez-vous"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;