import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <section className="container">

				<form id="auth-form">
					<a href="#/"><img className="form-logo" src="../../../images/postit-icon.png" alt="postit-icon"/></a>
					<p className="form-brief">Login to your account:</p>  		
					<div className="input-field">				
						<input type="text" id="username" placeholder="Enter your username or email"/>
					<label className="active" htmlFor="username">Username</label>
					</div>
					<div className="input-field">
						<input type="password" className="validate" id="password" placeholder="Enter your password"/>
					<label className="active" htmlFor="password">Password</label>
					</div>
					<button type="submit" className="btn btn-login">Submit</button>
					<p className="form-brief">Or login with any of this services:</p>
					<div className="external">
					<div className="row">
						<div className="col s6 md6 google-auth"><i className="fa fa-google-plus"></i></div>
						<div className="col s6 md6 facebook-auth"><i className="fa fa-facebook"></i></div>
					</div>
					</div>
				</form>
				<section className="external">
				<div className="row">
					<div className="col s6 md6"><a href="#register"><i className="material-icons">memory</i>Forgot your password?</a></div>
					<div className="col s6 md6"><a href="#register"><i className="material-icons">lock</i>Don't have an account?</a></div>
				</div>
				</section>

			</section>
    );
  }
}

export default Login;