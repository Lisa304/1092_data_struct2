import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './App.css';
//import {MDBBtn} from 'mdbreact';
//import SideNavPage from './sidenav/sidenavLayout'
import NavBarRouter from './sidenav';

function App() {
  return (
    <div className="App">
      <NavBarRouter></NavBarRouter>
    </div>
  );
}

export default App;
