import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import {
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Alert
} from '@mui/material';

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

const Home: React.FC = () => {
  const { loading, error, data } = useQuery(GET_RECIPES, {
    fetchPolicy: 'cache-and-network',
  });
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const userRecipes = data.recipes.filter((recipe: any) => recipe.author.id === user.id);
  const otherRecipes = data.recipes.filter((recipe: any) => recipe.author.id !== user.id);

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Mes recettes
        </Typography>
        {!loading && !error && userRecipes.length === 0 && (
          <Alert severity="info">Vous n'avez aucune recette. Veuillez en créer une nouvelle.</Alert>
        )}
        <Grid container spacing={3}>
          {userRecipes.map((recipe: any) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {recipe.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {recipe.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" component={Link} to={`/recipe/${recipe.id}`}>
                    Voir la recette
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" component="h1" gutterBottom sx={{ mt: 10}}>
          Les recettes des autres utilisateurs
        </Typography>
        {!loading && !error && otherRecipes.length === 0 && (
          <Alert severity="info">Il n'y a aucune recette disponible des autres utilisateurs.</Alert>
        )}
        <Grid container spacing={3}>
          {otherRecipes.map((recipe: any) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {recipe.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {recipe.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" component={Link} to={`/recipe/${recipe.id}`}>
                    Voir la recette
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;