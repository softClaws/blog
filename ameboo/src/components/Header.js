import { Link } from "react-router-dom"

const Header = () => {
  return (
   <header>
    <h2>Ameboo Blog</h2>
    <nav>
        <ul>
            <li><Link to ="/"/> Home</li>
            <li><Link to ="post"/> Posts</li>
        </ul>
    </nav>
   </header>
  )
}

export default Header