import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../store/actions";
import { TextInput, Button } from "react-materialize";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props
      .login(email, password)
      .then(() => {
        this.setState({
          email: "",
          password: ""
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

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="authorization">
        <div className="content-wrapper">
          <div className="content">
            <h2>Login</h2>
            <form onSubmit={e => this.onSubmit(e)}>
              <TextInput
                onChange={this.onChange}
                type="text"
                label="Email"
                name="email"
                value={email}
              />
              <TextInput
                onChange={this.onChange}
                type="password"
                label="Password"
                name="password"
                value={password}
              />
              <Button type="submit">Login</Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = () => {
};

export default connect(mapDispatchToProps, {login})(Login);
