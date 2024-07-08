import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const GET_RECIPE = gql`
  query GetRecipe($id: Int!) {
    recipe(id: $id) {
      id
      name
      description
      instructions
      ingredients {
        id
        name
        quantity
        unit
      }
      author {
        id
        name
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
    }
  }
`;

const UPDATE_RECIPE = gql`
  mutation UpdateRecipe($id: Int!, $updateRecipeInput: UpdateRecipeInput!) {
    updateRecipe(id: $id, updateRecipeInput: $updateRecipeInput) {
      id
      name
      description
      instructions
    }
  }
`;

const DELETE_RECIPE = gql`
  mutation DeleteRecipe($id: Int!) {
    deleteRecipe(id: $id) {
      id
    }
  }
`;

const CREATE_INGREDIENT = gql`
  mutation CreateIngredient($name: String!, $quantity: String!, $unit: String!, $recipeId: Int!) {
    createIngredient(name: $name, quantity: $quantity, unit: $unit, recipeId: $recipeId) {
      id
      name
      quantity
      unit
    }
  }
`;

const UPDATE_INGREDIENT = gql`
  mutation UpdateIngredient($id: Int!, $name: String, $quantity: String, $unit: String) {
    updateIngredient(id: $id, name: $name, quantity: $quantity, unit: $unit) {
      id
      name
      quantity
      unit
    }
  }
`;

const DELETE_INGREDIENT = gql`
  mutation DeleteIngredient($id: Int!) {
    deleteIngredient(id: $id) {
      id
    }
  }
`;

const Recipe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_RECIPE, {
    variables: { id: parseInt(id!, 10) },
  });

  const [updateRecipe, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_RECIPE);
  const [deleteRecipe, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_RECIPE, {
    update(cache, { data: { deleteRecipe } }) {
      const { recipes } : any= cache.readQuery({ query: GET_RECIPES })!;
      cache.writeQuery({
        query: GET_RECIPES,
        data: { recipes: recipes.filter((recipe: any) => recipe.id !== deleteRecipe.id) },
      });
      cache.evict({ id: `Recipe:${deleteRecipe.id}` });
      cache.gc();
    },
  });
  const [createIngredient] = useMutation(CREATE_INGREDIENT, {
    refetchQueries: [{ query: GET_RECIPE, variables: { id: parseInt(id!, 10) } }],
  });
  const [updateIngredient] = useMutation(UPDATE_INGREDIENT, {
    refetchQueries: [{ query: GET_RECIPE, variables: { id: parseInt(id!, 10) } }],
  });
  const [deleteIngredient] = useMutation(DELETE_INGREDIENT, {
    refetchQueries: [{ query: GET_RECIPE, variables: { id: parseInt(id!, 10) } }],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingIngredients, setIsEditingIngredients] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [currentIngredient, setCurrentIngredient] = useState({ id: 0, name: '', quantity: '', unit: '' });

  useEffect(() => {
    if (data) {
      setName(data.recipe.name);
      setDescription(data.recipe.description);
      setInstructions(data.recipe.instructions);
    }
  }, [data]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateRecipe({
      variables: {
        id: parseInt(id!, 10),
        updateRecipeInput: { id: parseInt(id!, 10), name, description, instructions },
      },
    });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteRecipe({
      variables: { id: parseInt(id!, 10) },
    });
    navigate('/');
  };

  const handleAddIngredient = async () => {
    await createIngredient({
      variables: {
        name: currentIngredient.name,
        quantity: currentIngredient.quantity,
        unit: currentIngredient.unit,
        recipeId: parseInt(id!, 10),
      },
    });
    setIsEditingIngredients(false);
  };

  const handleUpdateIngredient = async () => {
    await updateIngredient({
      variables: {
        id: currentIngredient.id,
        name: currentIngredient.name,
        quantity: currentIngredient.quantity,
        unit: currentIngredient.unit,
      },
    });
    setIsEditingIngredients(false);
  };

  const handleDeleteIngredient = async (ingredientId: number) => {
    await deleteIngredient({
      variables: { id: ingredientId },
    });
  };

  if (loading || deleteLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;
  if (deleteError) return <Alert severity="error">{deleteError.message}</Alert>;

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4">
          {data.recipe.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {data.recipe.description}
        </Typography>
        <Card sx={{ width: '100%', marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">Instructions</Typography>
            <Typography variant="body1">{data.recipe.instructions}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: '100%', marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">Ingrédients</Typography>
            <List>
              {data.recipe.ingredients.map((ingredient: any) => (
                <ListItem key={ingredient.id} secondaryAction={
                  <>
                    <IconButton edge="end" aria-label="edit" onClick={() => {
                      setCurrentIngredient(ingredient);
                      setIsEditingIngredients(true);
                    }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteIngredient(ingredient.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                }>
                  <ListItemText
                    primary={`${ingredient.name} - ${ingredient.quantity} ${ingredient.unit}`}
                  />
                </ListItem>
              ))}
            </List>
            <Button onClick={() => {
              setCurrentIngredient({ id: 0, name: '', quantity: '', unit: '' });
              setIsEditingIngredients(true);
            }} sx={{ mt: 2 }}>
              Ajouter un ingrédient
            </Button>
          </CardContent>
        </Card>
        <Typography variant="body2" color="text.secondary">
          Auteur : {data.recipe.author.name}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setIsEditing(true)} sx={{ mt: 3 }}>
          Modifier
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDelete} sx={{ mt: 3 }}>
          Supprimer
        </Button>

        <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
          <DialogTitle>Modifier la recette</DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleUpdate} sx={{ mt: 1 }}>
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
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsEditing(false)} color="primary">
              Annuler
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={isEditingIngredients} onClose={() => setIsEditingIngredients(false)}>
          <DialogTitle>{currentIngredient.id ? 'Modifier l\'ingrédient' : 'Ajouter un ingrédient'}</DialogTitle>
          <DialogContent>
            <TextField
              margin="normal"
              required
              fullWidth
              id="ingredient-name"
              label="Nom"
              name="ingredient-name"
              value={currentIngredient.name}
              onChange={(e) => setCurrentIngredient({ ...currentIngredient, name: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="ingredient-quantity"
              label="Quantité"
              name="ingredient-quantity"
              value={currentIngredient.quantity}
              onChange={(e) => setCurrentIngredient({ ...currentIngredient, quantity: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="ingredient-unit"
              label="Unité"
              name="ingredient-unit"
              value={currentIngredient.unit}
              onChange={(e) => setCurrentIngredient({ ...currentIngredient, unit: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsEditingIngredients(false)} color="primary">
              Annuler
            </Button>
            <Button onClick={currentIngredient.id ? handleUpdateIngredient : handleAddIngredient} color="primary">
              Enregistrer
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Recipe;