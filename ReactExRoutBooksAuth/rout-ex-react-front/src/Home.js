import React from 'react'
import A from './models/Authentication'


const Home = () => {

  function handleSubmit(e) {
    e.preventDefault()
    const target = e.target
    const password = target.password.value
    const userName = target.username.value
    A.sendLoginToServer(userName, password, function (token) {
      if (token != null) {
        A.authenticateUser(token, userName)
      } else {
        alert("Username and Password didn't match")
      }
    })
  }

  function logout() {
    console.log("Logout here.")
    A.deauthenticateUser()
  }

  if (!A.isUserAuthenticated()) {
    return (

      <div>
        <h2>Home View</h2>

        <h4>Login</h4>
          <form id="loginform" className="col-md-4" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input id="username" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" className="form-control" />
              <br />
              <button type="submit" className="btn">
                Login
              </button>
            </div>
          </form>
      </div>
    )
  } else {
    return(
      <div>
        <h2>Welcome to the Homepage {A.getUserName()}</h2>
        <br/>
        <p>You have the token : {A.getToken()}</p>
        <br/>
        <input type="button" value="Logout" onClick={logout}/>
      </div>
    )
  }
}

export default Home