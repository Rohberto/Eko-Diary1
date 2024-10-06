"use client" 
import React from 'react';
import { useParams } from 'next/navigation';
import { useSelector} from 'react-redux'; 
import { BsCalendar3 } from "react-icons/bs";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import SVG from "../../Images/svg.svg";
import  Link from 'next/link';
import Image from 'next/image';


const EventDetail = () => {
    const {id} = useParams();
    const {events, loading} = useSelector((state) => state.events);
    const current_event = events.find((event) => event._id == id);

    
  return (
    <div className="event_detail_container">
      {
        loading ? (<div className='hour'><div className="lds-hourglass"></div></div>) : (
          <div className='detail-cont'>
         <div className="event_img_container">
       <img src={current_event.image} alt="Event Image" className="event_img" />
       <h1 className="event_name">{current_event.name}</h1>
       </div>
       <div className='detail-content'>
        <div className="event_date">
          <BsCalendar3 className='date_icon'/> <p>{new Date(current_event.date).toLocaleString()}</p>
        </div>
        <div className="event_time">
          <MdOutlineAccessTime className='time_icon'/> <p>{`${current_event.time.start_time} - ${current_event.time.end_time} WAT`}</p>
        </div>
        <div className="event_location">
          {!current_event.location.isOnline ? <><FaLocationDot className='location_icon'/> <p>{`${current_event.location.event_location}, ${current_event.state}`}</p></> : <p>This event is situated online, event link will be provided to you.</p>}
    </div>
   <hr/>
        <div className="event_about">
            <h4 className='event_about_heading'>About This Event</h4>
            <p className="event_about_info">{current_event.details}</p>
        </div>
<hr/>
        <div className="event_contact">
          <h4 className="event_contact_heading">
            Contact Us
          </h4>
          <a className="contact_link" href={`https://x.com/${current_event.twitter}`}><FaSquareXTwitter className='event_twitter_link'/></a>
          <a className="contact_link" href={`https://instagram.com/${current_event.instagram}`}><FaInstagram className='event_twitter_link'/></a>
          <a className="contact_link" href={`https://wa.me/${current_event.whatsapp}`}><FaWhatsapp className='event_twitter_link'/></a>
        </div>
        </div>
        <div className="event_buy">
        <Image src={SVG} alt="svg" className="svg" />
        <p><Link href={`/checkout/${current_event._id}`} className='buy_ticket'>Buy Ticket</Link></p>
        </div>
        </div>)
}
    </div>
  )
}

export default EventDetail;

