import React, { Component } from "react";
import { TextInput, Textarea, Button, Row } from "react-materialize";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createPost, getUserPosts, getPosts } from "../../store/actions";

class CreatePost extends Component {
  state = {
    caption: "",
    first_name: "",
    last_name: "",
    location: "",
    message: "",
    imageURL: ""
  };

  onSubmit = e => {
    e.preventDefault();

    const { caption, location, message, imageURL } = this.state;

    const post = {
      caption,
      location,
      message,
      imageURL
    };

    this.props
      .createPost(post)
      .then(() => {
        this.props
          .getPosts()
          .then(() => {
            this.props
              .getUserPosts()
              .then(() => {
                this.props.history.push("/dashboard");
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="create-post container">
        <h4>Create a new post:</h4>
        <form onSubmit={this.onSubmit} className="container">
          <Row>
            <TextInput
              s={6}
              type="text"
              name="city"
              label="City *"
              value={this.state.city}
              onChange={this.onChange}
              required
              validate
            />
            <TextInput
              s={6}
              type="text"
              name="location"
              label="Location *"
              value={this.state.location}
              onChange={this.onChange}
              required
              validate
            />
          </Row>
          <Row>
            <TextInput
              s={12}
              type="text"
              name="caption"
              label="Caption *"
              value={this.state.caption}
              onChange={this.onChange}
              required
              validate
            />
            <TextInput
              s={12}
              type="url"
              name="imageURL"
              label="Image URL *"
              value={this.state.imageURL}
              onChange={this.onChange}
              required
              validate
            />
            <Textarea
              s={12}
              type="text"
              name="message"
              label="Message *"
              value={this.state.message}
              onChange={this.onChange}
              required
              validate
            />
            <Button type="submit">Create Post</Button>
          </Row>
        </form>
      </div>
    );
  }
}

export default withRouter(
  connect(null, { createPost, getUserPosts, getPosts })(CreatePost)
);
