## ⚙️ Installation

1. Clone the repository

```bash
git clone git@github.com:IbrohimMirxoshimov/library-dashboard.git
cd library-dashboard
```

2. Install the dependencies:

```bash
npm install
# or
yarn
```

3. Configure environment variables:

```bash
cp .env.example .env.local
```

Edit .env.local with your actual environment details:

```bash
ENV=development #not mandatory
VITE_BASE_URL=https://base-url.com/api/
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## 🔧 Available Scripts

- `dev`: start development server. Generate possibleTypes and available types, watches changes of types
- `build`: build for production
- `lint`: check lint validation
- `lint:fix`: check lint validation and try to fix as many lint issues as possible
- `format`: run prettier, make a list of unformatted files
- `format:fix`: run prettier, fix unformatted files

## 📁 Project Structure

```
├── public/          # Static assets
├── assets/          # Styles, images, fonts
├── components/      # App components
├── helpers/         # Helper functions
├── layouts/         # App layout
├── localization/    # Translation
├── modules/         # Includes base views, business logics, types, etc
├── pages/           # App routes + sidebar routes
├── services/        # Services
├── store/           # Redux store
├── types/           # App types, global ones
└── utilities/       # Utilities
```

## 📚 Learn More

- [React](https://18.react.dev/)
- [React Router Dom](https://reactrouter.com/6.28.0/home)
- [Redux Toolkit Query](https://redux-toolkit.js.org/rtk-query/overview)
- [Ant Design](https://ant.design/components/overview/)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
