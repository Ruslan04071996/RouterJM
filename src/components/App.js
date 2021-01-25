import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css'
import Registration from './registration/registration'
import Articles from './articles/articles'
import { loadArticles } from '../redux/req-articles/action'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import FullArticle from './full-article/full-artilce'
import SignUp from './registration-page/registration-page'
import SignIn from './sign-in/sign-in'
import ChangingProfile from './change-profile/change-profile'
import login from '../redux/userState/login-action'
import NewArticle from './new-article/new-article'
import PrivateRoute from './PrivateRoute'
import ChangeArticle from './new-article/new-article'

export default function App() {
  const isLogin = useSelector((store) => store.userState.isLogin)
  const dispatch = useDispatch()
  const savedEmail = getCookie('email')
  const savedPassword = getCookie('password')
  const objForRegistration = {
    user: {
      email: savedEmail,
      password: savedPassword,
    },
  }
  const token = getCookie('token')
  useEffect(() => {
    dispatch(loadArticles(token))
    dispatch(login(JSON.stringify(objForRegistration), 'users', 'login'))
  })

  return (
    <>
      {!isLogin ? (
        <Switch>
          <Route path='/' exact component={Articles}></Route>
          <Route path='/articles' component={Articles} exact />
          <Route
            exact
            path='/articles/:slug'
            render={({ match }) => {
              const { slug } = match.params

              return <FullArticle id={slug} />
            }}
          />
          <Route path='/sign-up' exact component={SignUp} />
          <Route path='/sign-in' component={SignIn} />
        </Switch>
      ) : (
        <Switch>
          <Route path='/' exact component={Articles}></Route>
          <Route path='/articles' component={Articles} exact />
          <Route
            exact
            path='/articles/:slug'
            render={({ match }) => {
              const { slug } = match.params

              return <FullArticle id={slug} />
            }}
          />
          <Route path='/sign-up' exact component={SignUp} />
          <Route path='/sign-in' component={SignIn} />

          <Route
            path='/articles/:slug/edit'
            render={({ match }) => {
              const { slug } = match.params

              return <ChangeArticle />
            }}
          />
          <Route path='/profile' component={ChangingProfile} />
          <Route path='/new-article' component={NewArticle} />
        </Switch>
      )}

      {/* <Switch>
        <Route path='/' exact component={Articles}></Route>
        <Route path='/articles' component={Articles} exact />
        <Route
          exact
          path='/articles/:slug'
          render={({ match }) => {
            const { slug } = match.params

            return <FullArticle id={slug} />
          }}
          />
          <Route path='/sign-up' exact component={SignUp} />
          <Route path='/sign-in' component={SignIn} />
 
        <Route
          path='/articles/:slug/edit'
          render={({ match }) => {
            const { slug } = match.params

            return <ChangeArticle />
          }}
        />
        <Route path='/sign-up' exact component={SignUp} />
        <Route path='/sign-in' component={SignIn} />
        <Route path='/profile' component={ChangingProfile} />
        <Route path='/new-article' component={NewArticle} />
      </Switch>
      */}
    </>
  )
}

export function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}
