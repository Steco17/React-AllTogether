import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddUser extends Component {
  	//state defining user and his existence
  	state = {
      user: {
        firstName: '',
        lastName: '',
        username: '',
      },
      userExists: false,
    };

//checking if user exists already but username
	userExistence = currentUsername => {
      const users = this.props.users;
      //checking for every user if user exists
      for (let user of users){
        if(user.username === currentUsername){
          return true;
        }
      }
      return false;
    };

//adding user to Array if he doesn't exists
	submitUser = event => {
      	event.preventDefault();
      	const userExists = this.userExistence(this.state.user.username);
		
		if(!userExists){
          this.props.onAddUser(this.state.user);
        }
		 this.setState(() => ({
           userExists
         }));
	  
    };

//
  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState(currState => ({
      ...currState,
      user: {
        ...currState.user,
        [name]: value,
      },
    }));
  };
//disable button if no first name last name and username given
isDisabled = () => {
    const { firstName, lastName, username } = this.state.user;
    return firstName === '' || lastName === '' || username === '';
  };

  render() {
    const { firstName, lastName, username } = this.state.user;

    return (
      <div>
        <h1>New User</h1>
        <form onSubmit={this.submitUser}>
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              value={firstName}
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={username}
              onChange={this.handleInputChange}
            />
          </div>
          <button disabled={this.isDisabled()}>Add</button>
        </form>
        {this.state.userExists ? (
          <p className="error">You cannot add a user that already exists.</p>
        ) : (
          ''
        )}
      </div>
    );
  }
}

AddUser.propTypes = {
  onAddUser: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
};

export default  AddUser;