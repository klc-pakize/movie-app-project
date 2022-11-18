import AuthProviderContext from "./context/AuthProviderContext";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <AuthProviderContext>
      <AppRouter />
    </AuthProviderContext>
  );
}

export default App;
