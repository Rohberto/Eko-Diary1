"use client"
import React, {useState} from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { HiStatusOnline } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '../Store/EventSlice';
import  Link  from 'next/link';

const CreateEvent = ({socket}) => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.user);
    const {loading, error} = useSelector((state) => state.event);
    const [name, setName] = useState("");
    const [details, setDetails] = useState("");
    const [date, setDate] = useState(new Date().toLocaleDateString());
    const [event_location, setLocation] = useState("");
    const [url, setUrl] =useState("");
    const [isOnline, setIsOnline] = useState(false);
    const [state, setState] = useState("");
    const [start_time, setStartTime] = useState("");
    const [end_time, setEndTime] = useState("")
    const [ticket_price, setTicketPrice] = useState(0);
    const [free, setFree] = useState(false);
    const [capacity, setCapacity] = useState(0);
    const [category, setCategory] = useState("entertainment");
    const [twitter, setTwitter] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [instagram, setInstagram] = useState("");
    const [modal, setModal] = useState(false); 
   const [image, setImage] = useState(null);

    const handleEventSubmit = async (e) => {
        e.preventDefault();
        let expiryDate = new Date(date);
        let expirySeconds = new Date(expiryDate.getTime() + (24 * 60 * 60 * 1000));
        console.log(expirySeconds);
        const body = new FormData();
        body.append("Image", image);
        body.append("creatorId", user._id);
        body.append("name", name);
        body.append("details", details);
        body.append("date", date);
   body.append("url", url);
   body.append("isOnline", isOnline);
   body.append("event_location", event_location);
        body.append("state", state);
        body.append("start_time", start_time);
        body.append("end_time", end_time);
        body.append("ticket_price", ticket_price);
        body.append("capacity", capacity);
        body.append("category", category);
        body.append("twitter", twitter);
        body.append("whatsapp", whatsapp);
        body.append("instagram", instagram);
        body.append("expireAt", expirySeconds);
        try{
    const result = await dispatch(createEvent(body));
    if(result.payload.status === "SUCCESS"){
    socket.emit("event", result.payload.data)
    setModal(true);
    setName("");
    setDetails("");
    setLocation("");
    setUrl("");
    setState("");
   setStartTime("");
   setEndTime("");
   setTwitter("");
    setWhatsapp("");
    setInstagram("");
  }
        }
        catch(err){
            console.log(err.message);
        }
    }

  return (
    <div className='create_event_container'>
        { !user || user.verified === false ? (<div className='verify_post'>
            <p>Can't create an event without logging in, Click on this <Link href="/login">Login</Link> to login or verify your account.</p>
        </div>) : (
            <>
        <h1 className="event_create_heading">Create an Event With Eko Diary</h1>
<form onSubmit={handleEventSubmit}>
        <div className="event_title_container">
            <h5>What's the name of your event?</h5>
            <p>This will be your event’s title.Your title will be used to help create your event’s summary, description, category, and tags, so be specific!</p>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder='Event Title'/>
        </div>
        
        <div className="event_description_container">
            <h5>Describe your event?</h5>
            <input type="text" required value={details} onChange={(e) => setDetails(e.target.value)} placeholder='Event Description'/>
        </div>

        <div className="event_image_banner">
            <h5>Share an Image of your Event</h5>
            <input type="file" name="Image" id="event_img"  
           accept="image/*" onChange={(e) => setImage(e.target.files[0])}/>
        </div>

        <div className='event_date_container'>
        <h5>When does your event start and end?</h5>
            <input type="date" name="event_date" id="event_date" value={date} onChange={(e) => {setDate(e.target.value)}} />
            <input type="time" name="event_start_time" id="event_start_time" placeholder='start_time' value={start_time} onChange={(e) => setStartTime(e.target.value)}/>
            <input type="time" name="event_end_time" id="event_end_time" placeholder='end_time' value={end_time} onChange={(e) => setEndTime(e.target.value)}/>
        </div>

        <div className="event_location_container">
            <div className="location_buttons">
                <button type='button' className={isOnline ? 'event_physical' : 'event_physical button_background'} onClick={() => setIsOnline(false)}><FaLocationDot className='location_icon'/> Venue</button>
                <button type='button' className={isOnline ? 'event_physical button_background' : 'event_physical' } onClick={() => setIsOnline(true)}><HiStatusOnline className='location_icon'/> Online Event </button>
            </div>

            <div className="event_location_input">
                {
                    isOnline ? (
                        <>
                            <input type="text" name="event_url" id="event_url" value={url} placeholder='Url Link to Livestream' onChange={(e) => {setUrl(e.target.value)}}/>
                        </>
                    ) : (
                        <>
                        <input type="text" name="event_location" id="event_location" value={event_location} onChange={(e) => setLocation( e.target.value)} placeholder='location' />
                        <input type="text" name="event_location" id="event_state_location" value={state} placeholder='state' onChange={(e) => setState(e.target.value)}/>
                        </>
                    )
                }
            </div>
            </div>

            <div className="event_price_container">
           {!free && (<><h5>How much do you want to charge for tickets?</h5>
            <p>Our tool can only generate one General Admission ticket for now. You can edit and add more ticket types later.</p>
            <input type="number" min="0.00" max="10000.00" step="0.01" required value={ticket_price} placeholder='Event Price' onChange={(e) => setTicketPrice(e.target.value)}/> </>)}
            {free && <> <p>Ticket's free</p></>}
            <span className="toggle_text">My tickets are free</span>
            <label class="switch">
            <input type="checkbox" id='event_checkbox' onChange={() => {setFree(!free)}}/>
            <span class="slider round"></span>
            </label>
     </div>

        <div className="event_capacity_container">
            <h5>What's the capacity for your event?</h5>
            <p>Event capacity is the total number of tickets you're willing to sell.</p>
            <input type="number" value={capacity} placeholder='Event Capacity' onChange={(e) => setCapacity(e.target.value)}/>
        </div>

     <div className="category">
     <h5>What category does your event belong to?</h5>
      <select name="categories" id="event_categories" onChange={(e) => {setCategory(e.target.value)}}>
  <option value="entertainment">Entertainment</option>
  <option value="Education">Educational</option>
  <option value="Festival">Festival</option>
  <option value="religion">Religion</option>
</select>
      </div>

        <div className="event_contact_container">
            <h5>What are your various social media handles?</h5>
            <p>This is how users can get to know more about your event</p>
            <input type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder='Twitter Username'/>
            <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder='Instagram Username'/>
            <input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder='Whatsapp Username'/>
        </div>
<div className="button_container">
<button type="submit">{loading ? "Loading" : "Create Event"}</button>
</div>
    </form>

    {
  //Modal
modal && (

  <div className="modal-dialog">

    <div className="modal-content">
      <button className="modal_close" onClick={() => setModal(false)}>&times;</button>
      <div class="page-body">
    <div class="head">  
      <h3>Event has been created Successfully.</h3>
    </div>

      <div className="modal_button">
        <button><Link href="/">Continue To Homepage</Link></button>
      </div>
</div>
</div>
    </div>


)
}
</>)
}
    </div>

  )
}

export default CreateEvent
