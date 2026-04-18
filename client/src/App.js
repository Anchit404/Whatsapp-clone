import { GoogleOAuthProvider } from '@react-oauth/google';

import Messenger from "./components/Messenger";

import AccountProvider from './context/AccountProvider';

function App() {

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider>  
       <Messenger />
      </AccountProvider>
    </GoogleOAuthProvider>
    
  );
}

export default App;
