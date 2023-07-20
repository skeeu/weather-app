import { createBrowserRouter, createRoutesFromElements, Link, Outlet, Route, RouterProvider, useParams } from "react-router-dom";
import Search from "./components/Search";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<RootLayout />}>
    <Route path='/:cityName' element={<HomePage />} />
    <Route path='/search' element={<Search />} />
    <Route path='/profile' element={<ProfilePage />} />
  </Route>
))

function HomePage() {
  const { cityName } = useParams()

  return <h1>Home {cityName}</h1>
}

function ProfilePage() {
  return <h1>Profile</h1>
}

function RootLayout() {
  return <>
    <div style={{ display: 'flex', gap: '10px' }}>
      <Link to='/'>Home</Link>
      <Link to='/search' >Search</Link>
      <Link to='/profile'>Profile</Link>
    </div>
    <Outlet />
  </>
}

function App() {
  return <RouterProvider router={router} />
}

export default App;
