import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postAdded } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";


const AddPostForm = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')

    const users = useSelector(selectAllUsers)

    const onTitleChanged =(e) => setTitle(e.target.value)
    const onContentChanged =(e) => setContent(e.target.value)
    const onAuthorChanged =(e) => setUserId(e.target.value)

    const onSavePostClicked =()=>{
        if(title && content){
            dispatch(
                postAdded(title,content, userId)

            )
            setTitle('')
            setContent('')
        }
    }
    const canSave =[title, content, userId].every(Boolean)
    const userOptions = users.map(user =>(
        <option key ={user.id} value={user.id}>
            {user.name}
        </option>
    ))
    return (
   <section>
    <h3>Add New Post</h3>
    <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}

        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
            <option value = ''></option>
            {userOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
            id="postCOntent"
            name="postContent"
            value={content}
            onChange={onContentChanged}

        />
        <button 
        type="button"
        onClick={onSavePostClicked}
        disabled ={!canSave}
        >Submit</button>
    </form>
   </section>
  )
}

export default AddPostForm