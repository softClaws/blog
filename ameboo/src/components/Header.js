import { Link } from "react-router-dom"
const Header = () => {
  return (
   <header>
    <h3 fontSize ={1}>Ameboo Blog</h3>
    <nav>
        <ul>
            <li><Link to ="/"> Home</Link></li>
            <li><Link to ="post"> Post</Link></li>
            <li><Link to ="user"> Users</Link></li>
        </ul>
    </nav>
   </header>
  )
}

export default Header