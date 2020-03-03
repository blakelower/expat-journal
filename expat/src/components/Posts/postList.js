import React, { Component } from "react";
import { Preloader, Card } from "react-materialize";
import { Pagination } from "react-materialize";


//this page just goes into the context of the posts.
class PostList extends Component {
  state = {
    chunkedPosts: [],
    page: 1,
    totalPages: ""
  };

  componentDidMount() {
    const { posts } = this.props; //gets post from props

    const chunkedPosts = this.chunk(posts, 18); //chunk method to break post into chunks
    const totalPages = chunkedPosts.length;
    this.setState({
      chunkedPosts,
      totalPages
    });
  }
  chunk = (arr, len) => {
    let chunks = [],
      i = 0,
      n = arr.length;
    while (i < n) {
      chunks.push(arr.slice(i, (i += len)));
    }
    return chunks; //break list of item into chunks
  };

  getPage = page => {
    this.setState({
      page
    });
    window.scrollTo(0, 0);
  };

  render() {
    const { page, chunkedPosts, totalPages } = this.state;

    if (chunkedPosts.length) {
      return (
        <div className="post-list">
          <div className="row">
            <div className="post-grid">
              {chunkedPosts[page - 1].map(post => {
                // const createdDate = new Date(post.created_at);
                // const updatedDate = new Date(post.updated_at);
                // let adjustImageURL = post.imageURL;

                // if (post.imageURL.includes("picsum")) {
                //   adjustImageURL = `https://picsum.photos/id/${post.id +
                //     50}/300`;
                // }
                return (
                  <Card
                    className="hoverable"
                    key={post.id}
                    header={
                      <div className="card-image">
                        {/* <img
                          className="activator"
                        //   src={adjustImageURL}
                          alt={post.title}
                        /> */}
                        <span className="card-title activator">
                          {post.title}
                        </span>
                      </div>
                    }
                    reveal={
                      <>
                        <header>
                          <h6>{post.caption}</h6>
                          <span>
                            {post.location}
                          </span>
                        </header>
                        <p>{post.message}</p>
                        <footer>
                        </footer>
                      </>
                    }
                  >
                    {/* <p>
                      {post.city}
                      {", "}
                      {post.country}
                    </p> */}
                  </Card>
                );
              })}
            </div>
          </div>
          {totalPages > 1 && (
            <Pagination
              items={totalPages}
              maxButtons={8}
              onSelect={this.getPage}
            />
          )}
        </div>
      );
    }
    return (
      <div className="post-list">
        <div className="row">
          <div id="preloader">
            <Preloader />
          </div>
        </div>
      </div>
    );
  }
}

export default PostList;
