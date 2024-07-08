# CookMaster

![CookMaster Logo](client/src/assets/logo.png)

CookMaster est une application de gestion de recettes de cuisine. Les utilisateurs peuvent créer, modifier et supprimer des recettes, ajouter des ingrédients et consulter les recettes des autres utilisateurs. 

L'application est construite avec React pour le front-end, NestJS pour le back-end et Apollo Client pour la gestion des données GraphQL.

## Fonctionnalités

- Simple authentification Utilisateur : Connexion et inscription des utilisateurs avec leur email et nom.
- Gestion des Recettes : Création, modification et suppression de recettes.
- Gestion des Ingrédients : Ajout, modification et suppression d'ingrédients dans les recettes.
- Affichage des Recettes : Affichage des recettes de l'utilisateur et des autres utilisateurs avec leurs détails.
- Utilisation du Cache : Utilisation d'Apollo Client pour gérer le cache des données et améliorer la performance de l'application.

## Installation

### Pré-requis
- Node.js (>= 16.x)
- PostgreSQL

### Etapes
Cloner le repo :
```bash
git clone https://github.com/mardev60/CookMaster.git
cd CookMaster
```

Installez les dépendances pour le back-end et le front-end :
```bash
cd server
npm install
cd ../client
npm install
```

Configurez votre base de données PostgreSQL et mettez à jour le fichier .env dans le dossier server avec vos informations de connexion :
```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

Mettez à jour votre schéma Prisma et synchronisez votre base de données :
```bash
cd server
npx prisma migrate dev --name init
```

Lancez le serveur back-end :
```bash
npm run start:dev
```

Lancez le client front-end :
```bash
cd ../client
npm run dev
```

## Utilisation

- Accédez à l'application via http://localhost:5173.
- Inscrivez-vous avec un nouvel utilisateur ou connectez-vous avec un utilisateur existant.
- Ajoutez de nouvelles recettes, modifiez ou supprimez des recettes existantes.
- Ajoutez des ingrédients à vos recettes.
- Consultez les recettes des autres utilisateurs.

## Technologies utilisées
- Front-end : React, Vite, Material UI, Apollo Client
- Back-end : NestJS, GraphQL, Prisma, PostgreSQL
- Outils : TypeScript, ESLint, Prettier

## Structure du projet
### Client :
```
client/
├── src/
│   ├── components/
│   │   ├── Layout.tsx
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── CreateRecipe.tsx
│   │   ├── Recipe.tsx
│   │   ├── User.tsx
│   │   └── Users.tsx
│   ├── assets/
│   │   └── logo.png
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
└── package.json
```

### Server :
```
server/
├── src/
│   ├── modules/
│   │   ├── users/
│   │   │   ├── users.module.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.resolver.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-user.input.ts
│   │   │   │   └── update-user.input.ts
│   │   ├── recipes/
│   │   │   ├── recipes.module.ts
│   │   │   ├── recipes.service.ts
│   │   │   ├── recipes.resolver.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-recipe.input.ts
│   │   │   │   └── update-recipe.input.ts
│   │   ├── ingredients/
│   │   │   ├── ingredients.module.ts
│   │   │   ├── ingredients.service.ts
│   │   │   ├── ingredients.resolver.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-ingredient.input.ts
│   │   │   │   └── update-ingredient.input.ts
│   ├── prisma/
│   │   └── prisma.service.ts
│   ├── app.module.ts
│   ├── main.ts
│   └── .env
├── prisma/
│   ├── schema.prisma
└── package.json
```

## Contributing

Les contributions sont les bienvenues ! 

Si vous souhaitez contribuer, veuillez créer une branche de fonctionnalité, effectuer vos modifications et soumettre une pull request.

- Forkez le projet
- Créez votre branche de fonctionnalité (git checkout -b feature/AmazingFeature)
- Committez vos modifications (git commit -m 'Add some AmazingFeature')
- Pushez vers la branche (git push origin feature/AmazingFeature)
- Ouvrez une pull request

## License

[MIT](https://choosealicense.com/licenses/mit/)