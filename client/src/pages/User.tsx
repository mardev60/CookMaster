import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, gql, useApolloClient } from '@apollo/client';
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  TextField,
  Button
} from '@mui/material';

const GET_USER = gql`
  query GetUser($id: Int!) {
    user(id: $id) {
      id
      name
      email
      recipes {
        id
        name
        description
      }
    }
  }
`;

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($id: Int!, $updateUserInput: UpdateUserInput!) {
    updateUser(id: $id, updateUserInput: $updateUserInput) {
      id
      name
      email
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

const User: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const client = useApolloClient();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { data: cacheData } = client.readQuery({
    query: GET_USER,
    variables: { id: parseInt(id!, 10) },
  }) || { data: null };

  const { loading, error, data, refetch } = useQuery(GET_USER, {
    variables: { id: parseInt(id!, 10) },
    skip: !!cacheData,
  });

  const [updateUser, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_USER, {
    update(cache, { data: { updateUser } }) {
      cache.modify({
        id: cache.identify(updateUser),
        fields: {
          name() {
            return updateUser.name;
          },
          email() {
            return updateUser.email;
          },
        },
      });
    }
  });

  const [deleteUser, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_USER, {
    update(cache, { data: { deleteUser } }) {
      const { users }: any = cache.readQuery({ query: GET_USERS })!;
      cache.writeQuery({
        query: GET_USERS,
        data: { users: users.filter((user: any) => user.id !== deleteUser.id) },
      });
    }
  });

  useEffect(() => {
    if (data || cacheData) {
      const userData = data?.user || cacheData.user;
      setName(userData.name);
      setEmail(userData.email);
    } else {
      refetch();
    }
  }, [data, cacheData, refetch]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser({
      variables: {
        id: parseInt(id!, 10),
        updateUserInput: { id: parseInt(id!, 10), name, email },
      },
    });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteUser({
      variables: { id: parseInt(id!, 10) },
    })
    .then(() => navigate('/users'));
  };

  if (loading || deleteLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;
  if (deleteError) return <Alert severity="error">{deleteError.message}</Alert>;

  const userData = data?.user || cacheData.user;

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {!isEditing ? (
          <>
            <Typography component="h1" variant="h5">
              {userData.name}
            </Typography>
            <Typography variant="body1">{userData.email}</Typography>
            <Button variant="contained" color="primary" onClick={() => setIsEditing(true)} sx={{ mt: 3 }}>
              Modifier
            </Button>
            <Button variant="contained" color="secondary" onClick={handleDelete} sx={{ mt: 3 }}>
              Supprimer
            </Button>
          </>
        ) : (
          <Box component="form" onSubmit={handleUpdate} sx={{ mt: 3, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nom"
              name="name"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={updateLoading}
            >
              {updateLoading ? <CircularProgress size={24} /> : 'Enregistrer'}
            </Button>
            {updateError && <Alert severity="error">{updateError.message}</Alert>}
            <Button variant="contained" color="error" onClick={() => setIsEditing(false)} sx={{ mt: 3 }}>
              Annuler
            </Button>
          </Box>
        )}
        <Box sx={{ mt: 4, width: '100%' }}>
          <Typography variant="h6">Recettes</Typography>
          {userData.recipes.map((recipe: any) => (
            <Card key={recipe.id} sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h5">{recipe.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {recipe.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default User;