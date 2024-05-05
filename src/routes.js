import { element } from 'prop-types'
import React from 'react'



const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
//Forms
const Reunion = React.lazy(() => import('./views/forms/bibliotecaire/bibliotecaire'))

const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const lesemprunte = React.lazy(() => import('./views/forms/lesemprunte/lesemprunte'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Widgets = React.lazy(() => import('./widgets/Widgets'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))
const User = React.lazy(() => import('./views/User/User'))
const Login = React.lazy(()=> import('./components/header/AppHeaderDropdown'))
const Updatebibliotecaire = React.lazy(()=> import('./views/forms/bibliotecaire/Updatebibliotecaire'))
const Ajouterbibliotecaire = React.lazy(() =>import('./views/forms/bibliotecaire/Addbibliotecaire'))
const Profil=React.lazy(()=>import ('./views/pages/profil/Profil'))
const UpdateProfil=React.lazy(()=>import ('./views/pages/profil/Updateprofil'))

const Emprunter =React.lazy(()=>import('./views/forms/bibliotecaire/Emprunter'))



// Notifications


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/User', name: 'User', element: User },

  { path: '/forms/bibliotecaire', name: 'Checks & Radios', element: Reunion },
  { path: '/forms/Updatebibliotecaire/:id', name: 'Updatebibliotecaire', element: Updatebibliotecaire },
     {path: '/forms/Addbibliotecaire', name: 'Addbibliotecaire', element: Ajouterbibliotecaire},
     {path: '/login', name: 'Login', element: Login},
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/widgets', name: 'Widgets', element: Widgets },
  

{path: '/profile/:id', name:'profil',element:Profil},
{path: '/updateprofile/:id', name:'updateprofil',element:UpdateProfil},
{path: '/Emprunter/:userId/:livreId', name:'Emprunter',element:Emprunter},
{path: '/forms/lesemprunte' , name:'lesemprunte' , element:lesemprunte},

]

export default routes
