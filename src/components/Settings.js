import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED,
  LOGOUT
} from '../constants/actionTypes';
//import { validateAll} from "indicative/validator"

class SettingsForm extends React.Component {
  constructor() {
    super();

    this.state = {
      image: '',
      username: '',
      bio: '',
      email: '',
      password: '',
      password_confirmation: '',
    };

   
    this.handleInputChange=(event)=>{
      console.log("testi")
      this.setState({
        [event.target.name]: this.state.pwd1
      })
    }


    this.updateState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };

    this.submitForm = ev => {
      ev.preventDefault();


      const user = Object.assign({}, this.state);
      if (!user.password) {
        delete user.password;
      }
      
      const data = this.state
      const rules = {
        password:'required|string|min:6|confirmed'  //confirmed will check for the password confirmation
      };

      /*validateAll(data, rules)
      .then(() => {
        console.log('success')
      })
      .catch(errors => {
        console.log(errors) 
        // show errors to user
        const formattedErrors = {}
        errors.forEach( error => formattedErrors[error.field] = error.message)
        this.setState({errors: formattedErrors})
      }) */


      const messages = {
        'password.confirmed': 'The password does not match'
      }

      this.props.onSubmitForm(user);
    }; 

   

  /*function matchPassword() {  
    var pw1 = document.getElementById("pswd1");  
    var pw2 = document.getElementById("pswd2");  
    if(pw1 != pw2)  
    {   
      alert("Passwords did not match");  
    } else {  
      alert("Password created successfully");  
    }  
  }  

 // var password = document.getElementById("pwd1")
 // , confirm_password = document.getElementById("pwd2");

this.validatePassword = () =>{
  if(this.password != this.confirm_password) {
    alert("Passwords did not match"); 
  } else {
    alert("Passwords OK"); 
  }
} */


}





  componentWillMount() {
    if (this.props.currentUser) {
      Object.assign(this.state, {
        image: this.props.currentUser.image || '',
        username: this.props.currentUser.username,
        bio: this.props.currentUser.bio,
        email: this.props.currentUser.email
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.setState(Object.assign({}, this.state, {
        image: nextProps.currentUser.image || '',
        username: nextProps.currentUser.username,
        bio: nextProps.currentUser.bio,
        email: nextProps.currentUser.email
      }));
    }






  }




 /* checkForm(e)
  {

    if (this.state.password !== this.state.password_confirmation) {
      e.preventDefault()
      alert("passwords don't match");
      return;
  }*/


  CheckPasswords (e) { 
    if (this.state.password !== this.state.password_confirmation){
        e.preventDefault()
        alert("passwords don't match");
        return;
    }
  /*    e.preventDefault()
        return (
            <label>Passwords don't match</label>
        )
    } else {
        return null
    } */


    

 
   /* if(this.state.username == "") {
      alert("Error: Username cannot be blank!");
      return false;
    }
    let re = /^\w+$/;
    if(!re.test(this.state.username)) {
      alert("Error: Username must contain only letters, numbers and underscores!");
      return false;
    }

    if(this.state.pwd1 != "" && this.state.pwd1 == this.state.pwd2) {
      //if(this.state.pwd1.len < 6) {
      //  alert("Error: Password must contain at least six characters!");
      //  return false;
      //}
      if(this.state.pwd1 == this.state.username) {
        alert("Error: Password must be different from Username!");
        return false;
      }
      let re = /[0-9]/;
      if(!re.test(this.state.pwd1)) {
        alert("Error: password must contain at least one number (0-9)!");
        return false;
      }
      re = /[a-z]/;
      if(!re.test(this.state.pwd1)) {
        alert("Error: password must contain at least one lowercase letter (a-z)!");
        return false;
      }
      re = /[A-Z]/;
      if(!re.test(this.state.pwd1)) {
        alert("Error: password must contain at least one uppercase letter (A-Z)!");
        return false;
      }
    } else {
      alert("Error: Please check that you've entered and confirmed your password!");
      return false;
    }

    alert("You entered a valid password: " + this.state.pwd1.value);
    return true;
    */
  }







  render() {
    return (
      <form onSubmit={this.submitForm}>
        <fieldset>

          <fieldset className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="URL of profile picture"
              value={this.state.image}
              onChange={this.updateState('image')} />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={this.updateState('username')} />
          </fieldset>

          <fieldset className="form-group">
            <textarea
              className="form-control form-control-lg"
              rows="8"
              placeholder="Short bio about you"
              value={this.state.bio}
              onChange={this.updateState('bio')}>
            </textarea>
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.updateState('email')} />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              //type="password"
              //type="newpassword" 
              //ref={register({ required: true })}
              id="pwd1" 
              //name="newpassword" 
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required
              //placeholder="New Password"
              //value={this.state.password} 
              //onChange={(e) => setNewPassword(e.target.value)}
              //    onBlur={onVerifyNewPassword}
              type="password"
              placeholder="New Password"
              name="password"
              onChange={this.updateState('password')}
               />
              
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
             // type="confirmpassword"
             // ref={register({ required: true })}
             id="pwd2"
             // name="confirmpassword"
             // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
             // oninput="setPasswordConfirmValidity()"
             // placeholder="Confirm New Password"
            //  value={this.state.confirm_password}
            // onkeyup={this.validatePassword}
            //onChange={(e) => setConfirmPassword(e.target.value)}
           // onBlur={onVerifyNewPassword}
           //  id="confirm_password" />
           type="password"
           placeholder="Confirm New Password"
           name="password_confirmation"
           onChange={this.updateState('password_confirmation')}
         />
          </fieldset>
 
          <button
            className="btn btn-lg btn-primary pull-xs-right"
           // type="submit"
            //onClick={this.checkForm}
            //onClick={this.checkForm.bind(this)}
           // onsubmit={this.checkForm}
           // onClick={e => this.checkForm(e)}
           onClick={e => this.CheckPasswords(e)}


            onChange={e => this.handleInputChange(e)}
            disabled={this.state.inProgress}>
            Update Settings
          </button>

        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
  onSubmitForm: user =>
    dispatch({ type: SETTINGS_SAVED, payload: agent.Auth.save(user) }),
  onUnload: () => dispatch({ type: SETTINGS_PAGE_UNLOADED })
});

class Settings extends React.Component {
  render() {
    return (
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">

              <h1 className="text-xs-center">Your Settings</h1>

              <ListErrors errors={this.props.errors}></ListErrors>

              <SettingsForm
                currentUser={this.props.currentUser}
                onSubmitForm={this.props.onSubmitForm} />

              <hr />
              <label></label>

              <button
                className="btn btn-outline-danger"
                onClick={this.props.onClickLogout}>
                Or click here to logout.
              </button>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
