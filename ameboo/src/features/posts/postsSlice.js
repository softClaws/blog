import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import {sub} from 'date-fns'
import axios from 'axios'

const POST_URL = 'https://jsonplaceholder.typicode.com/posts'

// const initialState =[
//     {
//         id: '1', 
//         title: ' Learning redux', 
//         content: 'blah blah blah...',
//         date: sub(new Date(), {minutes: 10}).toISOString(),
//         reactions:{
//             thumpsUp: 0,
//             heart: 0,
//             wow: 0,
//             happy: 0,
//             sad:0
//         }
        
//     },
//     {
//         id: '2', 
//         title: ' Learning cake',
//         content: 'tik tok cha...',
//         date: sub(new Date(), {minutes: 5}).toISOString(),
//         reactions:{
//             thumpsUp: 0,
//             heart: 0,
//             wow: 0,
//             happy: 0,
//             sad:0
//         }
//     },
    
// ]
const initialState= {
    posts: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ()=>{
    const response = await axios.get(POST_URL)
    return response.data
})


export const addNewPost = createAsyncThunk('posts/addNewPosts', async (initialPost)=>{
    const response = await axios.post(POST_URL, initialPost)
    return response.data
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        postAdded:{
            reducer(state, action){
                state.posts.push(action.payload)
            },
            prepare(title,content, userId){
                return{
                    payload:{
                        id: nanoid(),
                        title,
                        content,
                        userId,
                        date: new Date().toISOString(),
                        reactions:{
                            thumpsUp: 0,
                            heart: 0,
                            wow: 0,
                            happy: 0,
                            sad:0
                        }
                    }
                }
            }
        },
        reactionAdded(state, action){
            const {postId, reaction} = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if(existingPost){
                existingPost.reactions[reaction]++
            }
        }
    },
    extraReducers(builder){
        builder
            .addCase(fetchPosts.pending, (state, action)=>{
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) =>{
                state.status = 'succeeded'
                //adding date and reaction
                let min =1;
                const loadedPosts = action.payload.map(post =>{
                    post.date = sub(new Date(), {minutes: min++}).toISOString()
                    post.reactions ={
                        thumpsUp: 0,
                        heart: 0,
                        wow: 0,
                        happy: 0,
                        sad:0
                    }
                    return post
                })
                // state.posts = state.posts.concat(loadedPosts)
                state.posts = loadedPosts
            })
            .addCase(fetchPosts.rejected, (state, action) =>{
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action)=>{


                
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString()
                action.payload.reactions ={
                    thumpsUp: 0,
                    heart: 0,
                    wow: 0,
                    happy: 0,
                    sad:0
                }
                state.posts.push(action.payload)
            })
    }
})
export const selectAllPosts = (state) => state.posts.posts
export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error

export const selectPostById = (state, postId)=> state.posts.posts.find(post =>post.id === postId)


export const {postAdded, reactionAdded} = postsSlice.actions


export default postsSlice.reducer