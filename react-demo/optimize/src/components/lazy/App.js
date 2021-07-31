import { lazy, Suspense } from 'react'
import { HashRouter, Route, Switch, Link } from 'react-router-dom'

// import Home from './Home'
// import About from './About'

const Home = lazy(() => import(/* webpackChunkName: "home" */'./Home'))
const About = lazy(() => import(/* webpackChunkName: "about" */'./About'))

export default function App() {
  return (
    <HashRouter>
      <div>
        <Link to='/'>home</Link>
        <Link to='/about'>about</Link>
      </div>
      <Switch>
        <Route path='/' exact>
          <Suspense fallback={<div>loading</div>}>
            <Home />
          </Suspense>
        </Route>
        <Route path='/about'>
          <Suspense fallback={<div>loading</div>}>
            <About />
          </Suspense>
        </Route>
      </Switch>
    </HashRouter>
  )
}


