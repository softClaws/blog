import { useSelector } from "react-redux"
import { selectAllUsers } from "./usersSlice"
import { Link } from "react-router-dom"

const UsersList = () => {
    const users = useSelector(selectAllUsers)

    const renderUsers = users.map(user =>(
        <li key ={user.id}>
            <Link to ={`/user/${user.id}`}>{user.name}</Link>
        </li>
    ))

  return (
    <section className = "userList">
        <h3> Users</h3>
        <h3>{renderUsers}</h3>
    </section>
  )
}

export default UsersList