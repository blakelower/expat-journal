import React, { Component } from "react";
import { TextInput, Textarea, Button, Row } from "react-materialize";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { editPost, getPosts, getUserPosts } from "../../store/actions";

class EditPost extends Component {
  state = {
    caption: "",
    location: "",
    message: "",
    imageURL: ""
  };

  componentDidMount() {
    const posts = JSON.parse(localStorage.getItem("posts"));

    const post = posts.filter(post => {
      return post.id === Number(this.props.match.params.id);
    });

    const { caption, location, message, imageURL } = post[0];
    this.setState({
      caption,
      location,
      message,
      imageURL
    });
  }

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
      .editPost(post)
      .then(() => {
        this.props.getUserPosts().then(() => {
          this.props.getPosts();
          this.props.history.push("/dashboard");
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
        <h4>Update post:</h4>
        <form onSubmit={this.onSubmit} className="container">
          <Row>
            <TextInput
              s={6}
              type="text"
              name="caption"
              label="Caption *"
              value={this.state.caption}
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
              name="title"
              label="Title *"
              value={this.state.title}
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
            <Button type="submit">Update Post</Button>
          </Row>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.postsReducer.userPosts
});

export default withRouter(
  connect(mapStateToProps, { editPost, getPosts, getUserPosts })(EditPost)
);
