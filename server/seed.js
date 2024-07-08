const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = [
    { id: 8, name: 'ThereseDu59', email: 'therese@mail.com' },
    { id: 9, name: 'AntoineDu75', email: 'antoine@mail.com' },
    { id: 10, name: 'MehdiDu66', email: 'mehdi@gmail.com' },
    { id: 11, name: 'PaulDu92', email: 'paul@mail.com' },
  ];

  for (const user of users) {
    await prisma.user.create({ data: user });
  }

  const recipes = [
    {
      name: 'Salade',
      description: 'Salade fraîche',
      instructions: 'Mélanger les légumes et servir.',
      authorId: 8,
      ingredients: {
        create: [
          { name: 'Laitue', quantity: '1', unit: 'tête' },
          { name: 'Tomates', quantity: '2', unit: 'pcs' },
          { name: 'Concombre', quantity: '1', unit: 'pcs' },
          { name: 'Carottes', quantity: '2', unit: 'pcs' },
          { name: 'Vinaigrette', quantity: '50', unit: 'ml' },
        ],
      },
    },
    {
      name: 'Omelette',
      description: 'Omelette simple',
      instructions: 'Battre les œufs et cuire.',
      authorId: 8,
      ingredients: {
        create: [
          { name: 'Œufs', quantity: '4', unit: 'pcs' },
          { name: 'Sel', quantity: '1', unit: 'c. à café' },
          { name: 'Poivre', quantity: '1', unit: 'c. à café' },
          { name: 'Beurre', quantity: '10', unit: 'g' },
        ],
      },
    },
    {
      name: 'Spaghetti',
      description: 'Pâtes à la tomate',
      instructions: 'Cuire les pâtes et ajouter la sauce.',
      authorId: 8,
      ingredients: {
        create: [
          { name: 'Spaghetti', quantity: '200', unit: 'g' },
          { name: 'Sauce tomate', quantity: '200', unit: 'ml' },
          { name: 'Sel', quantity: '1', unit: 'c. à café' },
          { name: 'Parmesan', quantity: '50', unit: 'g' },
        ],
      },
    },
    {
      name: 'Tacos',
      description: 'Tacos mexicains',
      instructions: 'Chauffer les tortillas et garnir.',
      authorId: 8,
      ingredients: {
        create: [
          { name: 'Tortillas', quantity: '4', unit: 'pcs' },
          { name: 'Poulet', quantity: '200', unit: 'g' },
          { name: 'Laitue', quantity: '1', unit: 'tête' },
          { name: 'Tomates', quantity: '2', unit: 'pcs' },
          { name: 'Fromage', quantity: '100', unit: 'g' },
        ],
      },
    },
    {
      name: 'Pizza',
      description: 'Pizza margherita',
      instructions: 'Cuire au four à 200°C pendant 15 min.',
      authorId: 8,
      ingredients: {
        create: [
          { name: 'Pâte à pizza', quantity: '1', unit: 'pcs' },
          { name: 'Sauce tomate', quantity: '100', unit: 'ml' },
          { name: 'Mozzarella', quantity: '150', unit: 'g' },
          { name: 'Basilic', quantity: '10', unit: 'g' },
          { name: 'Huile d\'olive', quantity: '20', unit: 'ml' },
        ],
      },
    },
    {
      name: 'Burger',
      description: 'Burger maison',
      instructions: 'Griller le steak et assembler.',
      authorId: 9,
      ingredients: {
        create: [
          { name: 'Pain burger', quantity: '2', unit: 'pcs' },
          { name: 'Steak haché', quantity: '2', unit: 'pcs' },
          { name: 'Cheddar', quantity: '2', unit: 'tranches' },
          { name: 'Laitue', quantity: '2', unit: 'feuilles' },
          { name: 'Tomate', quantity: '1', unit: 'pcs' },
        ],
      },
    },
    {
      name: 'Risotto',
      description: 'Risotto crémeux',
      instructions: 'Cuire le riz avec du bouillon.',
      authorId: 9,
      ingredients: {
        create: [
          { name: 'Riz Arborio', quantity: '200', unit: 'g' },
          { name: 'Bouillon de poulet', quantity: '500', unit: 'ml' },
          { name: 'Parmesan', quantity: '50', unit: 'g' },
          { name: 'Oignon', quantity: '1', unit: 'pcs' },
          { name: 'Vin blanc', quantity: '100', unit: 'ml' },
        ],
      },
    },
    {
      name: 'Curry',
      description: 'Curry de poulet',
      instructions: 'Cuire le poulet avec les épices.',
      authorId: 9,
      ingredients: {
        create: [
          { name: 'Poulet', quantity: '300', unit: 'g' },
          { name: 'Lait de coco', quantity: '200', unit: 'ml' },
          { name: 'Curry', quantity: '2', unit: 'c. à café' },
          { name: 'Oignon', quantity: '1', unit: 'pcs' },
          { name: 'Ail', quantity: '2', unit: 'gousses' },
        ],
      },
    },
    {
      name: 'Sushi',
      description: 'Sushi maison',
      instructions: 'Rouler le riz et le poisson.',
      authorId: 9,
      ingredients: {
        create: [
          { name: 'Riz à sushi', quantity: '200', unit: 'g' },
          { name: 'Nori', quantity: '4', unit: 'feuilles' },
          { name: 'Saumon', quantity: '100', unit: 'g' },
          { name: 'Avocat', quantity: '1', unit: 'pcs' },
          { name: 'Concombre', quantity: '1', unit: 'pcs' },
        ],
      },
    },
    {
      name: 'Paella',
      description: 'Paella espagnole',
      instructions: 'Cuire le riz avec les fruits de mer.',
      authorId: 9,
      ingredients: {
        create: [
          { name: 'Riz', quantity: '200', unit: 'g' },
          { name: 'Crevettes', quantity: '100', unit: 'g' },
          { name: 'Moules', quantity: '100', unit: 'g' },
          { name: 'Poivron', quantity: '1', unit: 'pcs' },
          { name: 'Safran', quantity: '1', unit: 'pincée' },
        ],
      },
    },
    {
      name: 'Tiramisu',
      description: 'Tiramisu classique',
      instructions: 'Monter les couches et réfrigérer.',
      authorId: 10,
      ingredients: {
        create: [
          { name: 'Mascarpone', quantity: '250', unit: 'g' },
          { name: 'Café', quantity: '200', unit: 'ml' },
          { name: 'Boudoirs', quantity: '100', unit: 'g' },
          { name: 'Cacao', quantity: '20', unit: 'g' },
          { name: 'Sucre', quantity: '100', unit: 'g' },
        ],
      },
    },
    {
      name: 'Quiche',
      description: 'Quiche lorraine',
      instructions: 'Cuire au four à 180°C.',
      authorId: 10,
      ingredients: {
        create: [
          { name: 'Pâte brisée', quantity: '1', unit: 'pcs' },
          { name: 'Lardons', quantity: '150', unit: 'g' },
          { name: 'Crème fraîche', quantity: '200', unit: 'ml' },
          { name: 'Œufs', quantity: '3', unit: 'pcs' },
          { name: 'Gruyère', quantity: '100', unit: 'g' },
        ],
      },
    },
    {
      name: 'Gâteau',
      description: 'Gâteau au chocolat',
      instructions: 'Cuire au four à 180°C pendant 25 min.',
      authorId: 10,
      ingredients: {
        create: [
          { name: 'Chocolat', quantity: '200', unit: 'g' },
          { name: 'Beurre', quantity: '100', unit: 'g' },
          { name: 'Sucre', quantity: '150', unit: 'g' },
          { name: 'Farine', quantity: '100', unit: 'g' },
          { name: 'Œufs', quantity: '4', unit: 'pcs' },
        ],
      },
    },
    {
      name: 'Soupe',
      description: 'Soupe de légumes',
      instructions: 'Cuire les légumes et mixer.',
      authorId: 10,
      ingredients: {
        create: [
          { name: 'Carottes', quantity: '3', unit: 'pcs' },
          { name: 'Pommes de terre', quantity: '2', unit: 'pcs' },
          { name: 'Poireaux', quantity: '1', unit: 'pcs' },
          { name: 'Bouillon de légumes', quantity: '1', unit: 'cube' },
          { name: 'Crème', quantity: '50', unit: 'ml' },
        ],
      },
    },
    {
      name: 'Brownies',
      description: 'Brownies fondants',
      instructions: 'Cuire au four à 180°C pendant 20 min.',
      authorId: 10,
      ingredients: {
        create: [
          { name: 'Chocolat', quantity: '200', unit: 'g' },
          { name: 'Beurre', quantity: '150', unit: 'g' },
          { name: 'Sucre', quantity: '200', unit: 'g' },
          { name: 'Farine', quantity: '100', unit: 'g' },
          { name: 'Œufs', quantity: '3', unit: 'pcs' },
        ],
      },
    },
    {
      name: 'Lasagnes',
      description: 'Lasagnes à la bolognaise',
      instructions: 'Cuire au four à 180°C pendant 40 min.',
      authorId: 10,
      ingredients: {
        create: [
          { name: 'Pâtes à lasagne', quantity: '200', unit: 'g' },
          { name: 'Viande hachée', quantity: '300', unit: 'g' },
          { name: 'Sauce tomate', quantity: '300', unit: 'ml' },
          { name: 'Béchamel', quantity: '200', unit: 'ml' },
          { name: 'Mozzarella', quantity: '150', unit: 'g' },
        ],
      },
    },
    {
      name: 'Gratin',
      description: 'Gratin dauphinois',
      instructions: 'Cuire au four à 180°C pendant 45 min.',
      authorId: 11,
      ingredients: {
        create: [
          { name: 'Pommes de terre', quantity: '1', unit: 'kg' },
          { name: 'Crème fraîche', quantity: '200', unit: 'ml' },
          { name: 'Lait', quantity: '200', unit: 'ml' },
          { name: 'Ail', quantity: '2', unit: 'gousses' },
          { name: 'Gruyère', quantity: '100', unit: 'g' },
        ],
      },
    },
    {
      name: 'Mousse',
      description: 'Mousse au chocolat',
      instructions: 'Mélanger les ingrédients et réfrigérer.',
      authorId: 11,
      ingredients: {
        create: [
          { name: 'Chocolat', quantity: '200', unit: 'g' },
          { name: 'Crème', quantity: '200', unit: 'ml' },
          { name: 'Sucre', quantity: '50', unit: 'g' },
          { name: 'Œufs', quantity: '3', unit: 'pcs' },
        ],
      },
    },
    {
      name: 'Tartiflette',
      description: 'Tartiflette savoyarde',
      instructions: 'Cuire au four à 200°C pendant 20 min.',
      authorId: 11,
      ingredients: {
        create: [
          { name: 'Pommes de terre', quantity: '1', unit: 'kg' },
          { name: 'Lardons', quantity: '200', unit: 'g' },
          { name: 'Reblochon', quantity: '1', unit: 'pcs' },
          { name: 'Oignons', quantity: '2', unit: 'pcs' },
          { name: 'Crème', quantity: '200', unit: 'ml' },
        ],
      },
    },
    {
      name: 'Crêpes',
      description: 'Crêpes sucrées',
      instructions: 'Cuire chaque crêpe dans une poêle chaude.',
      authorId: 11,
      ingredients: {
        create: [
          { name: 'Farine', quantity: '250', unit: 'g' },
          { name: 'Lait', quantity: '500', unit: 'ml' },
          { name: 'Œufs', quantity: '3', unit: 'pcs' },
          { name: 'Sucre', quantity: '50', unit: 'g' },
          { name: 'Beurre', quantity: '50', unit: 'g' },
        ],
      },
    },
    {
      name: 'Soufflé',
      description: 'Soufflé au fromage',
      instructions: 'Cuire au four à 180°C pendant 25 min.',
      authorId: 11,
      ingredients: {
        create: [
          { name: 'Fromage', quantity: '150', unit: 'g' },
          { name: 'Lait', quantity: '200', unit: 'ml' },
          { name: 'Œufs', quantity: '4', unit: 'pcs' },
          { name: 'Farine', quantity: '50', unit: 'g' },
          { name: 'Beurre', quantity: '50', unit: 'g' },
        ],
      },
    },
    {
      name: 'Pancakes',
      description: 'Pancakes moelleux',
      instructions: 'Cuire chaque pancake dans une poêle chaude.',
      authorId: 11,
      ingredients: {
        create: [
          { name: 'Farine', quantity: '200', unit: 'g' },
          { name: 'Lait', quantity: '250', unit: 'ml' },
          { name: 'Œufs', quantity: '2', unit: 'pcs' },
          { name: 'Sucre', quantity: '30', unit: 'g' },
          { name: 'Beurre', quantity: '30', unit: 'g' },
        ],
      },
    },
  ];

  for (const recipe of recipes) {
    await prisma.recipe.create({ data: recipe });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });