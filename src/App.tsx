import AppRoute from './routes';

export default function App() {
  return <AppRoute {...{isAuthenticated: true, role: 'owner'}} />;
}
