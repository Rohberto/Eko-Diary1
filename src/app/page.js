"use client"
import React, {useEffect, useContext, useState} from 'react';
import  { Swiper, SwiperSlide } from 'swiper/react';
import {  Pagination, Navigation } from 'swiper/modules';
import { useSelector, useDispatch } from 'react-redux';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import Search from "./Images/search.svg";
import 'react-calendar/dist/Calendar.css';
import { useRouter } from 'next/navigation';
import Slider from './Components/Slider';
import { addEvent, updateDeletedEvent } from './Store/EventsSlice';
import axios from 'axios';
import DataContext from './Context/datacontext';
import Image from 'next/image';
const Home = () => { 
  const navigate = useRouter();
  const {socket} = useContext(DataContext);
  const date = new Date();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const {events, loading} = useSelector((state) => state.events);
const {user} = useSelector((state) => state.user);
  const [query, setQuery] = useState('');
const [filteredData, setFilteredData] = useState([]);
const [category, setCategory] = useState("all");
const [current_slide, setCurrentSlide] = useState({});
const updateModal = () => {
  setModal(true);
}
const setCurrent = (slide) => {
  setCurrentSlide(slide);
}
  useEffect(() => {
   if(!loading){
    setFilteredData(events);
   }
  }, [loading, events]);



  useEffect(() => {
    // console.log('SOCKET IO', socket);
    socket.on('new-event', (events) => {
      console.log(events);
      dispatch(addEvent(events));
    })
    socket.on("event-deleted", (events) => {
      console.log(events);
     dispatch(updateDeletedEvent(events));
    })
}, []);
  
  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    filterData(value);
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategory(value);
    filterCategory(value);
}
  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (!lowercasedValue) {
      setFilteredData(events);
      return;
    }

    const filtered = filteredData.filter((item) =>
      item.name.toLowerCase().includes(lowercasedValue)
    );
    setFilteredData(filtered);
  };

  const filterCategory = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (!lowercasedValue) {
      setFilteredData(events);
      return;
    }
    if(lowercasedValue == "all"){
      setFilteredData(events);
      return;
    }

    const filtered = events.filter((item) =>
      item.category.toLowerCase().includes(lowercasedValue)
    );
    setFilteredData(filtered);
  };

  const deleteEvent = async (_id) => {
    try{
      const request = await axios.delete(`https://eko-server.onrender.com/events/${_id}/${user._id}`);
      const response = request.data;
      socket.emit("delete-event", response.data);
      setModal(false);
    }catch(err){
      console.log(err.message);
    }
      
  }
return (
    <div className='homepage-container'>
      {loading ? <div className='hour'><div class="lds-hourglass"></div></div> : (
        <>

    {
      events ? (
        <>
        <p className='current-date'>{date.toDateString()}</p>
        <div class="slider__controls">

<div className="slider__pagination"></div>
</div>
{filteredData.length > 0 ? (
    <Swiper 
    grabCursor={true}
    centeredSlides={true}
    loop={true}
    slidesPerView={3}
    spaceBetween={20}
    breakpoints={{
      200: {
        slidesPerView: 1
      },
      400: {
        slidesPerView: 1.3
      },
      600: {
        slidesPerView: 1.5
      },
      900: {
        slidesPerView: 2
      },
      1200: {
        slidesPerView: 3
      }
    }}
    pagination={{el: '.slider__pagination', clickable: true, type: 'bullets' }}
    navigation={{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      clickable: true,
    }}
    modules={[Pagination, Navigation]}
    className="swiper_container">
      {filteredData.map((slide, i) => (
        <>
           <SwiperSlide key={slide._id} >
            <div className="slide_img_container" onClick={() => navigate.push(`/event/${slide._id}`)}>
            <img src={slide.image} alt="slide_image" className='slider-img'/>
            </div>
          <p className="eventName">{`${slide.name} : ${slide.state}`}</p>
         {!slide.location.isOnline && (<><p className="location">{slide.location.event_location}</p></>)}
          <div className="slider_bottom_content">

            <div className="slider_pulse">
              <div className="pulse_bars">
                <span className="bar firstbar"></span>
                <span className="bar secondbar"></span>
                <span className="bar thirdbar"></span>
                <span className="bar fourthbar"></span>
                <span className="bar fifthbar"></span>
                <span className="bar sixthbar"></span>
                <span className="bar seventhbar"></span>
                <span className="bar eightbar"></span>
                <span className="bar ninthbar"></span>
                <span className="bar tenthbar"></span>
              </div>
              <p className="pulse_text">pulse</p>
            </div>

            <div className="bottom_date">
              <p>{new Date(slide.date).getDay()}</p>
            </div>

           <Slider slide={slide} setModal={updateModal} setCurrent={setCurrent}/>
          </div>
          <div className="slider-controler">
          <div className="swiper-pagination"></div>
        </div>
        </SwiperSlide>
        </>
      ))}
    </Swiper>
) :  (<div className='no-events'>
  <p>Couldn't find any event that matches your search</p>
</div>)}

    <div className="search_category">

      <div className="category">
      <select name="categories" id="event_categories" value={category} onChange={handleCategoryChange}>
  <option value="all">all</option>
  <option value="entertainment">Entertainment</option>
  <option value="Education">Educational</option>
  <option value="Festival">Festival</option>
  <option value="religion">Religion</option>
</select>
      </div>

      <div className="search">
        <span className="searchIcon"><Image src={Search} alt="" /></span>
        <input type="text" name="search" id="search" placeholder='Search Events' value={query} onChange={handleInputChange}/>
      </div>
    </div>

    {
  //Modal
modal && (
<div className="modal-dialog">

    <div className="modal-content">
      <button className="modal_close" onClick={() => setModal(false)}>&times;</button>
      <div class="page-body">
    <div class="head">  
      <h3>Are you sure you want to delete this event?</h3>
    </div>

      <div className="modal_buttons">
        <button onClick={() => deleteEvent(current_slide._id)}>Yes</button>
        <button onClick={() => setModal(false)}>No</button>
      </div>
</div>
</div>
    </div>


)
}
     </> ) : (<div className='no-events'>
        <p>Couldn't find any event, refresh your page and check internet connectivity.</p>
      </div>)
}
    </>)}
    </div> 
  )
}

export default Home;
