import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

import PostAuthor from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import ReactionButton from "./ReactionButton";

import { useParams, Link } from "react-router-dom";

const SinglePostPage = () => {

    const {postId} = useParams()

    const post = useSelector((state) => selectPostById(state, Number(postId)))
    if(!post){
        return(
            <section> 
                <h2>Post not Found</h2>
            </section>
        )
    }
    return (
        <article>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <p className="postCredit">
            <Link to ={`/post/edit/${post.id}`}>Edit Post </Link>
            <PostAuthor userId={post.userId}/>
            <TimeAgo timeStamp={post.date}/>
        </p>
        <p><ReactionButton post ={post}/></p>
    </article>
      )
}

export default SinglePostPage