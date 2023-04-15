import AdminForm from './features/forms/adminForm/AdminForm';
import SearchBar from './features/forms/searchBar/SearchBar';
import Tile from './features/tile/Tile';
import Album from './features/album/Album';
import SignUpForm from './features/forms/auth/signUpForm/SignUpForm';
import SignInForm from './features/forms/auth/signInForm/SignInForm';

function App() {
  return (
    // <div className="App">
    //   <SignUpForm />
    //   <SignInForm />
    //   <Album />
    // </div>
    <div className="App">
      <Album />
    </div>
  );
}

export default App;
