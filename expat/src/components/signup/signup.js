import React, { Component } from "react";
import { connect } from "react-redux";
import { signup } from "../../store/actions";
import { TextInput, Button } from "react-materialize";

class Signup extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: ""
  };
  onSubmit = e => {
    e.preventDefault();
    debugger
    const {
      first_name,
      last_name,
      email,
      password,
      confirm_password
    } = this.state;
    console.log(this.props.name)
    this.props
      .signup(first_name, last_name, email, password, confirm_password)
      .then(() => {
        this.setState({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          confirm_password: ""
        });
        setTimeout(() => {
          this.props.history.push("/dashboard");
        }, 1000);
      })
      .catch(err => console.log(err));
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const {
      first_name,
      last_name,
      email,
      password,
      confirm_password
    } = this.state;

    return (
      <div className="authorization">
        <div className="content-wrapper">
          <div className="content">
            <h2>Sign Up</h2>
            <form onSubmit={e => this.onSubmit(e)}>
              <TextInput
                onChange={this.onChange}
                type="text"
                label="first_name"
                name="first_name"
                value={first_name}
              />
              <TextInput
                onChange={this.onChange}
                type="text"
                label="last_name"
                name="last_name"
                value={last_name}
              />
              <TextInput
                onChange={this.onChange}
                type="email"
                label="email"
                name="email"
                value={email}
              />
              <TextInput
                onChange={this.onChange}
                type="password"
                label="password"
                name="password"
                value={password}
              />
              <TextInput
                onChange={this.onChange}
                type="password"
                label="confirm_password"
                name="confirm_password"
                value={confirm_password}
              />
              <Button type="submit">Sign Up</Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (state) => {
  return{
    name: "blake"
  }
}

export default connect(mapDispatchToProps, {signup})(Signup);
