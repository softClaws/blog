import { useSelector } from "react-redux"
import { selectUserById } from "../users/usersSlice"
import { selectAllPosts, selectPostByUser } from "../posts/postsSlice"
import { Link, useParams } from "react-router-dom"

const UserPage = () => {
    const {userId} = useParams()
    
    const user = useSelector(state => selectUserById(state, Number(userId)))
    const postsForUser =useSelector(state => selectPostByUser(state, Number(userId)))

    const postTitles = postsForUser.map(post =>(
        <p className = "userPostTitle" key ={post.id}>
            <Link to = {`/post/${post.id}`}>{post.title}</Link>
        </p>
    ))
  return (
    <section className = "userPage">
    <h2>{user?.name}</h2>
    <h3>{postTitles}</h3>
    </section>
  )
}

export default UserPage