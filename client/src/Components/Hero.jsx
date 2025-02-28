import React, { useContext, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { Autoplay, FreeMode } from "swiper/modules";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const locationsList = [
    "Mumbai", "Andheri", "Bandra", "Dadar", "Thane", "Navi Mumbai",
    "Pune", "Shivaji Nagar", "Hinjewadi", "Kothrud", "Viman Nagar",
    "Nagpur", "Dharampeth", "Sadar", "Sitabuldi", "Civil Lines",
    "Nashik", "Panchavati", "Gangapur", "Dwarka", "Satpur",
    "Bangalore", "Whitefield", "Koramangala", "Indiranagar", "Electronic City",
    "Mysore", "Lakshmipuram", "Vijayanagar", "Gokulam", "Nazarbad",
    "Hubli", "Keshwapur", "Vidya Nagar", "Deshpande Nagar",
    "New Delhi", "Connaught Place", "Saket", "Dwarka", "Karol Bagh",
    "South Delhi", "Hauz Khas", "Greater Kailash", "Vasant Kunj", "Lajpat Nagar",
    "North Delhi", "Rohini", "Pitampura", "Civil Lines", "Model Town",
    "Chennai", "T Nagar", "Anna Nagar", "Velachery", "Adyar",
    "Coimbatore", "Gandhipuram", "RS Puram", "Saibaba Colony",
    "Madurai", "Anna Nagar", "KK Nagar", "Tallakulam",
    "Kolkata", "Salt Lake", "Howrah", "Park Street", "Dumdum",
    "Siliguri", "Sevoke Road", "Hakim Para", "Pradhan Nagar",
    "Hyderabad", "Madhapur", "Banjara Hills", "Gachibowli", "Jubilee Hills",
    "Warangal", "Hanamkonda", "Kazipet", "Subedari",
    "Ahmedabad", "SG Highway", "Maninagar", "Satellite", "Bopal",
    "Surat", "Adajan", "Vesu", "Varachha",
    "Vadodara", "Alkapuri", "Manjalpur", "Gotri",
    "Lucknow", "Hazratganj", "Gomti Nagar", "Alambagh",
    "Noida", "Sector 62", "Sector 18", "Greater Noida",
    "Ghaziabad", "Indirapuram", "Raj Nagar Extension", "Vaishali",
    "Varanasi", "Assi Ghat", "Dashashwamedh Ghat", "Sigra",
    "Indore", "Vijay Nagar", "Palasia", "Rajwada",
    "Bhopal", "MP Nagar", "Arera Colony", "Kolar Road",
    "Gwalior", "Lashkar", "Morar", "Thatipur",
    "Jaipur", "Malviya Nagar", "Vaishali Nagar", "Tonk Road",
    "Udaipur", "Fateh Sagar", "Hiran Magri", "Sukher",
    "Jodhpur", "Sardarpura", "Paota", "Shastri Nagar",
    
    // Bihar - All Major Cities & Districts
    "Patna", "Kankarbagh", "Bailey Road", "Danapur", "Rajendra Nagar",
    "Gaya", "Bodh Gaya", "Magadh Colony", "Delha",
    "Bhagalpur", "Barari", "Tilka Manjhi", "Adampur",
    "Muzaffarpur", "Aghoria Bazar", "Mithanpura", "Kalambagh Chowk",
    "Purnia", "Line Bazar", "Khuskibagh", "Bhatta Bazar",
    "Darbhanga", "Laheriasarai", "Donar", "Benta",
    "Bettiah", "Narkatiaganj", "Chanpatia", "Bagaha",
    "Arrah", "Katira", "Mahadeva Road", "Pakri",
    "Begusarai", "Balia", "Naokothi", "Matihani",
    "Katihar", "Mirchaibari", "Barsoi", "Manihari",
    "Munger", "Jamalpur", "Kasim Bazar", "Safiyabad",
    "Samastipur", "Rosera", "Dalsinghsarai", "Shivaji Nagar",
    "Chapra", "Marhaura", "Parsa", "Garkha",
    "Motihari", "Raxaul", "Areraj", "Sugauli",
    "Sitamarhi", "Pupri", "Riga", "Dumra",
    "Siwan", "Mairwa", "Ziradei", "Guthani",
    "Saharsa", "Simri Bakhtiyarpur", "Mahishi", "Saur Bazar",
    "Kishanganj", "Thakurganj", "Bahadurganj", "Pothia",
    "Jehanabad", "Ghoshi", "Makhdumpur", "Kako",
    "Madhubani", "Jhanjharpur", "Laukaha", "Rajnagar",
    "Buxar", "Dumraon", "Itarhi", "Chausa",
    "Nalanda", "Rajgir", "Bihar Sharif", "Harnaut",
    "Lakhisarai", "Surajgarha", "Barahiya", "Halasi",
    "Jamui", "Sikandra", "Jhajha", "Sono",
    "Arwal", "Karpi", "Kurtha", "Kaler",
    "Sheikhpura", "Barbigha", "Ghat Kusumbha", "Ariari",
    "Sheohar", "Dumri Katsari", "Piprarhi", "Purnahiya",
    "Banka", "Amarpur", "Belhar", "Barahat"
  ];
const Hero = () => {
    const { setSearchFilter, setIsSearched } = useContext(AppContext);
    const titleRef = useRef(null);
    const locationRef = useRef(null);
    const [locationInput, setLocationInput] = useState("");
    const [filteredLocations, setFilteredLocations] = useState([]);

    const onSearch = () => {
        const searchCriteria = {
            title: titleRef.current?.value || "",
            location: locationRef.current?.value || "",
        };
        setSearchFilter(searchCriteria);
        setIsSearched(true);
        console.log(searchCriteria);
    };

    // Handle location input change
    const handleLocationChange = (e) => {
        const value = e.target.value;
        setLocationInput(value);

        // Filter locations based on input
        if (value.length > 0) {
            const filtered = locationsList.filter((loc) => loc.toLowerCase().includes(value.toLowerCase()));
            setFilteredLocations(filtered);
        } else {
            setFilteredLocations([]);
        }
    };

    // Select location from the suggestions
    const selectLocation = (location) => {
        setLocationInput(location);
        setFilteredLocations([]);
    };

    return (
        <div className="container px-4 sm:px-6 lg:px-20 mx-auto my-10">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-purple-800 to-purple-950 text-white py-12 sm:py-16 text-center mx-2 rounded-xl">
                <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-3 sm:mb-4 px-4">
                    Over 1000+ JOBS ARE POSTED
                </h2>
                <p className="mb-5 sm:mb-8 max-w-xl mx-auto text-xs sm:text-sm font-light px-5">
                    🔍 Explore thousands of job opportunities from top companies. Whether you’re looking for your first job, a career switch, or a freelance gig, we’ve got you covered. Start your journey now!
                </p>

                {/* Search Bar */}
                <div className="flex flex-col sm:flex-row items-center bg-white rounded-lg text-gray-600 px-3 sm:px-4 py-2 sm:py-3 shadow-md max-w-lg sm:max-w-2xl mx-auto gap-3 sm:gap-6 relative">
                    <div className="flex items-center w-full sm:w-1/2 border-b sm:border-b-0 sm:border-r border-gray-300 pr-2 mb-2 sm:mb-0">
                        <img src={assets.search_icon} alt="Search Icon" className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                        <input
                            type="text"
                            placeholder="Search for jobs"
                            className="w-full px-2 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm rounded outline-none"
                            ref={titleRef}
                        />
                    </div>

                    <div className="flex items-center w-full sm:w-1/2 pl-2 relative">
                        <img src={assets.location_icon} alt="Location Icon" className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                        <input
                            type="text"
                            placeholder="Location"
                            className="w-full px-2 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm rounded outline-none"
                            ref={locationRef}
                            value={locationInput}
                            onChange={handleLocationChange}
                        />

                        {/* Location Suggestions Dropdown */}
                        {filteredLocations.length > 0 && (
                            <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-40 overflow-y-auto">
                                {filteredLocations.map((loc, index) => (
                                    <li
                                        key={index}
                                        className="px-3 py-2 hover:bg-gray-200 cursor-pointer text-sm"
                                        onClick={() => selectLocation(loc)}
                                    >
                                        {loc}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <button
                        onClick={onSearch}
                        className="bg-blue-600 text-white font-medium px-4 sm:px-6 py-2 rounded-full mt-2 sm:mt-0 sm:ml-2 hover:bg-blue-700 transition w-full sm:w-auto"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Trusted By Section with Fixed Autoplay */}
            <div className="border border-gray-300 shadow-md mx-2 mt-5 p-4 sm:p-6 rounded-md flex flex-col items-center">
                <p className="font-bold mb-4 sm:mb-4">TRUSTED BY</p>

                <Swiper
                    spaceBetween={30}
                    slidesPerView={2}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 5 },
                    }}
                    freeMode={true}
                    speed={8000} // Smooth slow scrolling
                    loop={true}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false, // Prevents stopping on click
                        pauseOnMouseEnter: false, // Prevents stopping on hover
                    }}
                    modules={[Autoplay, FreeMode]}
                    className="w-full"
                >
                    <SwiperSlide>
                        <img className="h-6 sm:h-8" src={assets.microsoft_logo} alt="Microsoft" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className="h-6 sm:h-8" src={assets.walmart_logo} alt="Walmart" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className="h-6 sm:h-8" src={assets.walmart_logo} alt="Google" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className="h-6 sm:h-8" src={assets.accenture_logo} alt="Accenture" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className="h-6 sm:h-8" src={assets.samsung_logo} alt="Samsung" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className="h-6 sm:h-8" src={assets.amazon_logo} alt="Amazon" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default Hero;