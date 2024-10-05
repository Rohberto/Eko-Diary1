"use client"
import Award from "../Images/award_star.svg";
import Brightness from "../Images/brightness.svg";
import Confirmation from "../Images/confirmation_number.svg";
import List from "../Images/list.svg";
import { FaPlusCircle } from "react-icons/fa";
import { useRouter } from 'next/navigation';
const Menu = () => {
  const navigate = useRouter();
  return (
    <div className='menu-container'>
        <ul className="menu">
            <li className="menu_list"><img src={Brightness} alt="brightness icon" className="menu_icon" /></li>
            <li className="menu_list"><img src={Confirmation} alt="confirmation Icon" className="menu_icon" /></li>
            <li className="menu_list" onClick={() => navigate.replace("/create-event")}><FaPlusCircle className='menu_icon' style={{color: "#E4ECFE", fontSize: "18px"}}/></li>
            <li className="menu_list"><img src={List} alt="list icon" className="menu_icon" /></li>
            <li className="menu_list">
<img src={Award} alt="award icon" className="menu_icon" />
</li>
        </ul>
    </div>
  )
}

export default Menu
