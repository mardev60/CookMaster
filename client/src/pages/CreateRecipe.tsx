import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  CssBaseline,
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CREATE_RECIPE = gql`
  mutation CreateRecipe($input: CreateRecipeInput!) {
    createRecipe(createRecipeInput: $input) {
      id
      name
      description
      instructions
      author {
        id
        name
      }
      ingredients {
        id
        name
        quantity
        unit
      }
    }
  }
`;

const GET_RECIPES = gql`
  query GetRecipes {
    recipes {
      id
      name
      description
      author {
        id
        name
      }
      ingredients {
        id
        name
        quantity
        unit
      }
    }
  }
`;

const CreateRecipe: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit: '' }]);
  const [createRecipe, { loading, error }] = useMutation(CREATE_RECIPE, {
    update(cache, { data: { createRecipe } }) {
      try {
        const existingData: any = cache.readQuery({ query: GET_RECIPES });
        if (existingData) {
          const { recipes } = existingData;
          cache.writeQuery({
            query: GET_RECIPES,
            data: { recipes: recipes.concat([createRecipe]) },
          });
        } else {
          cache.writeQuery({
            query: GET_RECIPES,
            data: { recipes: [createRecipe] },
          });
        }
      } catch (e) {
        console.error("Error reading from cache", e);
        cache.writeQuery({
          query: GET_RECIPES,
          data: { recipes: [createRecipe] },
        });
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    await createRecipe({
      variables: {
        input: { name, description, instructions, authorId: user.id, ingredients },
      },
    });
    navigate('/');
  };

  const handleIngredientChange = (index: number, field: string, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
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
          <AddCircleOutlineIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Créer une nouvelle recette
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
            id="description"
            label="Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="instructions"
            label="Instructions"
            name="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Ingrédients</Typography>
            {ingredients.map((ingredient, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 2, mt: 1 }}>
                <TextField
                  label="Nom"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Quantité"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Unité"
                  value={ingredient.unit}
                  onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                  fullWidth
                />
              </Box>
            ))}
            <Button onClick={handleAddIngredient} sx={{ mt: 2 }}>
              Ajouter un ingrédient
            </Button>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Créer'}
          </Button>
          {error && <Alert severity="error">{error.message}</Alert>}
        </Box>
      </Box>
    </Container>
  );
};

export default CreateRecipe;