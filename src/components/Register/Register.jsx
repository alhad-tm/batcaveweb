import React, { useState ,useEffect} from "react";
import css from "./Register.module.css";
import Tick from "../../assets/Tick.svg";
import { motion } from "framer-motion";
import Hclose from "../../assets/close-hexagon.svg"
import { Link, useNavigate } from "react-router-dom";
import RegImgMobile from "../../assets/reg-image.svg" 
import RegImg from "../../assets/formtextimage3.png"
import { useFormContext } from '../FormContext/FormContext';

import { useParams} from 'react-router-dom';
import DOBInput from "../DOBInput/DOBInput";
// import DateofBirth from "../Dateofbirthpicker/DateofBirth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundImage from "../../assets/registerbgwithlogo.png"
const Register = () => { 
    

  const screenWidth = window.innerWidth;

  // Define breakpoint widths
  const mobileBreakpoint = 768; // Adjust as needed
  const tabletBreakpoint = 1024; // Adjust as needed

  const notify1 = () =>
    toast.error(
      "Apologies, our membership is exclusively available to individuals aged 18 and above.",
      { containerId: "container1" }
    );
  const notify2 = () =>
    toast.error("Email address already registered.", { containerId: "container2" });
  const notify3 = () =>
    toast.error("Mobile number already registered.", { containerId: "container3" });

  const notify4 = () =>
    toast.error("Car registration number already exist", { containerId: "container3" });

  const navigate = useNavigate(); 

  

  const [state, setState] = useState(1);
 
  const[openedt,setOpenedt]=useState(false)
  const[openedp,setOpenedp]=useState(false)

  const { showFirstForm, showSecondForm, setShowFirstForm, setShowSecondForm } = useFormContext();
  const { formId } = useParams(); // Get the URL parameter


  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : {
      full_name: "",
      email: "",
      mobile: "", 
      address: "",
      dob: "",
      gender: "",
      city: "",
    };
  });



  const handleSubmitFirstForm = (e) => {
    e.preventDefault();
    setShowFirstForm(false);
    setShowSecondForm(true);
  };

  
  const sendEmail2 = (e) => {
    e.preventDefault();
    navigate('/checkout')
  };
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [number, setNumber] = useState('');
  const [isValidNumber, setIsValidNumber] = useState(true);


  const [date, setDate] = useState('');
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    // Check if the input email is in a valid format
    // const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[a-zA-Z]{2,}$/i;  

   

    // const emailPattern =  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    
    setIsValidEmail(emailPattern.test(inputEmail));    



   
  };
// dob autofill / oct4 night
  const handleDateChange = (e) => {
    const inputDate = e.target.value;
    const numericDate = inputDate.replace(/[^0-9]/g, '');


    if (numericDate.length <= 8) {
      setDate(
        `${numericDate.slice(0, 2)}/${numericDate.slice(2, 4)}/${numericDate.slice(4, 8)}`
      );
       // Store the value in local storage
       localStorage.setItem("dob", numericDate);
    }
  }

  // dob local storage

// Add this useEffect to save the date value (dob) to local storage
useEffect(() => {
  localStorage.setItem("date", date);
}, [date]);

// ...

 // Load the date value (dob) from local storage on component mount
 useEffect(() => {
  const storedDob = localStorage.getItem("dob");
  if (storedDob) {
    console.log("DOB loaded from local storage:", storedDob);
    setDate(
      `${storedDob.slice(0, 2)}/${storedDob.slice(2, 4)}/${storedDob.slice(4, 8)}`
    );
  } else {
    console.log("DOB not found in local storage");
  }
}, []);

  
  function isFormFilled(formData) {
  
    const {
      full_name,
      email,
      address,
      mobile,
      dob,
      gender,
      city 
    } = formData;
    // return (
    //   full_name.trim() !== "" &&
    //   email.trim() !== "" &&
    //   mobile.length !== "" &&
    //   address.trim() !== "" &&
    //   dob.trim() !== "" &&
    //   gender.trim() !== "" &&
    //   city.trim() !== "" 
      
    // );
  }

  // Usage:
  const formFilled = isFormFilled(formData);

  const [isChecked, setIsChecked] = useState(false);

  const handleToggleChange = () => {
    setIsChecked(!isChecked);
  };


  const progressBarStyle = {
    // width: '400px', 
    width: showFirstForm === true ? '50%' : showSecondForm  === true ? '100%' : '0',
    background: 'linear-gradient(to bottom, rgba(0, 122, 255, 1) 0%, rgba(0, 66, 137, 1) 50%, rgba(0, 25, 52, 1) 100%)',
    transition: 'height 0.3s', // Add a smooth transition effect
    transformOrigin: 'bottom',
    height:"4px", borderRadius:"10px" 
  }

  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  useEffect(() => {
    // Depending on the URL parameter, set the form state
    if (formId === '1') {
      setShowFirstForm(true);
      setShowSecondForm(false);
    } else if (formId === '2') {
      setShowFirstForm(false);
      setShowSecondForm(true);
    }
  }, [formId, setShowFirstForm, setShowSecondForm]);

  const [isMobileValid, setIsMobileValid] = useState(false);

  const [formDate, setFormDate] = useState({
    dob: "",
  });

 
//  car reg oct4

const [carData, setCarData] = useState({
  carOwnership: isChecked, // Store the checkbox value
  registrationNumber: "",
  // Add other car-related fields as needed
});



 // Load form data and checkbox state from localStorage on component mount
 useEffect(() => {
  const storedFormData = JSON.parse(localStorage.getItem("formData"));
  const storedCheckboxState = JSON.parse(localStorage.getItem("checkboxState"));
  
  if (storedFormData) {
    setFormData(storedFormData);
  }

  if (storedCheckboxState) {
    setIsChecked(storedCheckboxState);
  }
}, []);

// Save form data and checkbox state to localStorage whenever they change
useEffect(() => {
  localStorage.setItem("formData", JSON.stringify(formData));
}, [formData]);

useEffect(() => {
  localStorage.setItem("checkboxState", JSON.stringify(isChecked));
}, [isChecked])




 // Load the car input field value from localStorage on component mount
  useEffect(() => {
    const storedInputValue = localStorage.getItem("carInputValue");
    if (storedInputValue) {
      setInputValue(storedInputValue);
    }
  }, []);

  // Save the car input field value to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("carInputValue", inputValue);
  }, [inputValue]);



   // Load the car registration number value from localStorage on component mount
   useEffect(() => {
    const storedCarRegistrationNumber = localStorage.getItem("carRegistrationNumber");
    if (storedCarRegistrationNumber) {
      setCarData({
        ...carData,
        registrationNumber: storedCarRegistrationNumber,
      });
    }
  }, []);

  // Save the car registration number value to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("carRegistrationNumber", carData.registrationNumber);
  }, [carData.registrationNumber]);

// form1 local storage



useEffect(() => {
  const storedFormData = JSON.parse(localStorage.getItem("formData"));

  if (storedFormData) {
    setFormData(storedFormData);
  }
}, []);



// Save Form 1 data to localStorage whenever it changes

useEffect(() => {
  localStorage.setItem("formData", JSON.stringify(formData));
}, [formData]);


 // Remove the local storage item for form1 when the page is refreshed
 useEffect(() => {
  const handleBeforeUnload = (e) => {
    localStorage.removeItem("formData");
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}, []); 




// Handle the page refresh event for form2
  const handleRefresh = () => {
    // Clear the data in localStorage
    localStorage.clear();

    // Clear the React state
    setFormData({});
    setIsChecked(false);
    setInputValue("");
    setCarData({ carOwnership: false, registrationNumber: "" });
    
  };

  // Add an event listener for the beforeunload event to trigger handleRefresh
  useEffect(() => {
    window.addEventListener("beforeunload", handleRefresh);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleRefresh);
    };
  }, []);



// t-shirt handling, local storage,  clear on refresh

  // Initialize the state for the selected size and retrieve it from local storage
  const [selectedSize, setSelectedSize] = useState(
    localStorage.getItem('selectedSize') || ''
  );

  // Define the handleChange event handler
  const handleChangeSize = (e) => { 
    const newSize = e.target.value;
    setSelectedSize(newSize);

    // Store the selected size in local storage
    localStorage.setItem('selectedSize', newSize);
  };

  // Use the useEffect hook to clear the input data on page refresh
  useEffect(() => {
    const clearLocalStorage = () => {
      localStorage.removeItem('selectedSize');
    };

    window.addEventListener('beforeunload', clearLocalStorage);

    return () => {
      window.removeEventListener('beforeunload', clearLocalStorage);
    };
  }, []);



  // before image loading, control whitespace

  const [imageLoaded, setImageLoaded] = useState(false);


  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  useEffect(() => {
    const image = new Image();
    image.src = backgroundImage;
    image.onload = handleImageLoad;
  }, []);

  
 
  return (
    <div onLoad={handleImageLoad} className={`${css.container} ${imageLoaded? css.loaded:""}`}>
      <div className={css.wrap}>
        {/* <div className={css.left}>
         
        {screenWidth < mobileBreakpoint && (
        <img src={RegImgMobile} alt="Mobile Image" />
      )}
      {screenWidth >= mobileBreakpoint && screenWidth < tabletBreakpoint && (
        <img src={RegImg} alt="Tablet Image" />
      )}
      {screenWidth >= tabletBreakpoint && (
        <p>This is the content for larger screens (e.g., desktop).</p>
      )}
        </div> */}

        <div className={css.right}>
          <div className={css.relativediv}>
          <div className={css.rotate}>
 
            <div className={css.rotatehead}> 
            <span className={showFirstForm ? css.p1: css.p2}  onClick={() => { setShowFirstForm(true); setShowSecondForm(false); }}>Personal info</span>
            <span className={showSecondForm ? css.c1: css.c2}  >car & social info</span>
            </div>

            <div className={css.progresscontainer}> 
            <div className={css.progress} style={progressBarStyle}></div>   
            </div>
          
          </div>

          <div className={css.formdiv}> 

            {/* form-1 */}
            {showFirstForm && (
              <form className={css.form1} action="" onSubmit={handleSubmitFirstForm}>
                <div className={css.inputset}>
                  <input
                   required
                    name="full_name"
                    onChange={handleChange} 
                    value={formData.full_name}
                    className={css.contactinp}
                    type="text"
                   
                   
                  />
                  <label className={css.label}>
                  <span className={css.char} style={{ transitionDelay: '00ms' }}>F</span>
        <span className={css.char} style={{ transitionDelay: '50ms' }}>U</span> 
        <span className={css.char} style={{ transitionDelay: '100ms' }}>L</span>
        <span  className={css.char}style={{ transitionDelay: '150ms' }}>L</span>
        <span  className={css.char}style={{ transitionDelay: '150ms' }}></span>
        <span className={css.char} style={{ transitionDelay: '200ms' }}>N</span>
        <span className={css.char} style={{ transitionDelay: '250ms' }}>A</span>
        <span className={css.char} style={{ transitionDelay: '300ms' }}>M</span>
        <span className={css.char} style={{ transitionDelay: '350ms' }}>E</span>
      
    </label>
                  {/* <div className={css.inputline}></div> */}
                </div>

                <div className={`${css.inputset} ${formData.email ? css.hasContent : ""}`}>
                  <input style={{textTransform:"lowercase"}}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={css.contactinp}
                    type="email"
                    required
                    placeholder=""
                  />
                             <label className={css.label}>
        <span className={css.char} style={{ transitionDelay: '00ms' }}>E</span>
        <span className={css.char} style={{ transitionDelay: '50ms' }}>M</span> 
        <span className={css.char} style={{ transitionDelay: '100ms' }}>A</span>
        <span  className={css.char}style={{ transitionDelay: '150ms' }}>I</span>
        <span className={css.char} style={{ transitionDelay: '200ms' }}>L</span>
        <span className={css.char} style={{ transitionDelay: '250ms' }}></span>
        <span className={css.char} style={{ transitionDelay: '300ms' }}>I</span>
        <span className={css.char} style={{ transitionDelay: '350ms' }}>D</span>
      
    </label>
                  {/* <div className={css.inputline}></div> */}
                </div>

                <div className={`${css.inputset} ${formData.number ? css.hasContent : ""}`}>
                  <input
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    className={ css.contactinp}
                    type="text"
                    pattern="[1-9]{1}[0-9]{9}"
                    required
                    placeholder=""
                    // pattern="[0-9]{10}" 
                    minLength={10}
                    maxLength="10"
                    title="Enter numbers(10 digit)"
                    //  onBlur={handleMobileNumberBlur}
                   
                  />
                                         <label className={css.label}>
        <span className={css.char} style={{ transitionDelay: '00ms' }}>M</span>
        <span className={css.char} style={{ transitionDelay: '50ms' }}>O</span> 
        <span className={css.char} style={{ transitionDelay: '100ms' }}>B</span>
        <span  className={css.char}style={{ transitionDelay: '150ms' }}>I</span>
        <span className={css.char} style={{ transitionDelay: '200ms' }}>L</span>
        <span className={css.char} style={{ transitionDelay: '250ms' }}>E</span>
        <span className={css.char} style={{ transitionDelay: '300ms' }}></span>
        <span className={css.char} style={{ transitionDelay: '350ms' }}>N</span>
        <span className={css.char} style={{ transitionDelay: '400ms' }}>U</span>
        <span className={css.char} style={{ transitionDelay: '450ms' }}>M</span> 
        <span className={css.char} style={{ transitionDelay: '500ms' }}>B</span>
        <span className={css.char} style={{ transitionDelay: '550ms' }}>E</span>
        <span className={css.char} style={{ transitionDelay: '600ms' }}>R</span>
      
    </label>
                  {/* <div className={css.inputline}></div> */}
                </div>

                <div className={css.inputset}>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={css.contactinp}
                    type="text"
                    required
                    placeholder=""
                  />
                                                   <label className={css.label}>
        <span className={css.char} style={{ transitionDelay: '00ms' }}>R</span>
        <span className={css.char} style={{ transitionDelay: '50ms' }}>E</span> 
        <span className={css.char} style={{ transitionDelay: '100ms' }}>S</span>
        <span  className={css.char}style={{ transitionDelay: '150ms' }}>I</span>
        <span className={css.char} style={{ transitionDelay: '200ms' }}>D</span>
        <span className={css.char} style={{ transitionDelay: '250ms' }}>E</span>
        <span className={css.char} style={{ transitionDelay: '300ms' }}>N</span>
        <span className={css.char} style={{ transitionDelay: '350ms' }}>T</span>
        <span className={css.char} style={{ transitionDelay: '400ms' }}>I</span>
        <span className={css.char} style={{ transitionDelay: '450ms' }}>A</span>
        <span className={css.char} style={{ transitionDelay: '500ms' }}>L</span>
        <span className={css.char} style={{ transitionDelay: '550ms' }}></span>
        <span className={css.char} style={{ transitionDelay: '600ms' }}>A</span>
        <span className={css.char} style={{ transitionDelay: '650ms' }}>D</span>
        <span className={css.char} style={{ transitionDelay: '700ms' }}>D</span>
        <span className={css.char} style={{ transitionDelay: '750ms' }}>R</span>
        <span className={css.char} style={{ transitionDelay: '800ms' }}>E</span>
        <span className={css.char} style={{ transitionDelay: '850ms' }}>S</span>
        <span className={css.char} style={{ transitionDelay: '900ms' }}>S</span>
        <span className={css.char} style={{ transitionDelay: '970ms' }}>(With Pincode)</span>
      
    </label>
                  {/* <div className={css.inputline}></div> */}
                </div>
 
                <div className={`${css.inputset} ${date ? css.hasContent : ""}`}>
                  <input
                    name="dob"
                    // value={formatDOB(formDate.dob)}
                    // value={formData.dob}
                    value={date} 
                    // onChange={handleInputChangeDate}
                    onChange={handleDateChange}
                    className={css.contactinp}
                    type="text"
                    required 
                    placeholder=""
                    maxLength="10"
                    pattern="\d{2}/\d{2}/\d{4}"
                  />
                                                     <label className={css.label}>
        <span className={css.char} style={{ transitionDelay: '00ms' }}>D</span>
        <span className={css.char} style={{ transitionDelay: '50ms' }}>A</span> 
        <span className={css.char} style={{ transitionDelay: '100ms' }}>T</span>
        <span  className={css.char}style={{ transitionDelay: '150ms' }}>E</span>
        <span className={css.char} style={{ transitionDelay: '200ms' }}></span>
        <span className={css.char} style={{ transitionDelay: '250ms' }}>O</span>
        <span className={css.char} style={{ transitionDelay: '300ms' }}>F</span>
        <span className={css.char} style={{ transitionDelay: '350ms' }}></span>
        <span className={css.char} style={{ transitionDelay: '400ms' }}>B</span>
        <span className={css.char} style={{ transitionDelay: '450ms' }}>I</span>
        <span className={css.char} style={{ transitionDelay: '500ms' }}>R</span>
        <span className={css.char} style={{ transitionDelay: '550ms' }}>T</span>
        <span className={css.char} style={{ transitionDelay: '600ms' }}>H</span>
        <span className={css.char} style={{ transitionDelay: '600ms' }}></span>
        <span className={css.char} style={{ transitionDelay: '600ms' }}> (dd/mm/yyyy)</span>

      
    </label>
    <DOBInput />
    {/* <DateofBirth selectedDate={dob} handleDateChange={handleDateChange} /> */}
                  {/* <div className={css.inputline}></div> */}
                </div>

                <div className={css.inputset}>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className={css.contactinp}
                    id=""
                    placeholder=""
                    style={{
                      color:
                      formData.gender === "" ? "#666" :
                      formData.gender === "MALE" ? "#fff" :
                      formData.gender === "FEMALE" ? "#fff" : // Replace with the desired color for "Female"
                      formData.gender === "OTHER" ? "#fff" : // Replace with the desired color for "Other"
                      "#666", // Default color
                    }}
                  >
                    <option  className={`${css.opt} ${css.optgender}`} value="" >
                      {" "}
                      Gender
                    </option>
                    <option className={css.opt} value="MALE">
                      Male
                    </option>
                    <option className={css.opt} value="FEMALE">
                      female
                    </option>
                    <option className={css.opt} value="OTHER">
                      other
                    </option>
                  </select>
        
                  {/* <div className={css.inputline}></div> */}
                </div>

                <div className={css.inputset}>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className={css.contactinp}
                    id=""
                    style={{
                      color: 
                      formData.city === "" ? "#666" :
                      formData.city === "Andrapradesh" ? "#fff" :
                      formData.city === "Karnataka"? "#fff" : 
                      formData.city === "Kerala" ? "#fff" : 
                      formData.city === "TamilNadu" ? "#fff" : 
                      formData.city === "Telangana" ? "#fff" : 
                      "#666", // Default color
                    }}
                  >
                    <option className={css.opt} value="" >
                      {" "}
                      state
                    </option>

                    {/* <option className={css.opt} value="Bengaluru">
                      Bengaluru
                    </option> */}
                     <option className={css.opt} value="Andrapradesh">
                   Andra pradesh
                    </option>
                    <option className={css.opt} value="Karnataka">
                    karnataka
                    </option>
                    <option className={css.opt} value="Kerala">
                     kerala
                    </option>
                    <option className={css.opt} value="TamilNadu">
                      Tamil Nadu
                    </option>
                    
                   
                   
                    <option className={css.opt} value="Telangana">
                   telangana
                    </option>
                   
                  </select>
                 
                </div>

                <button
                  type="submit"
                  onClick={() => (formFilled ? setState(2) : "")}
                  className={css.proceedbtn}
                >
                  PROCEED
                </button>
              </form>
            )}

            {/* form_2 */}

            {showSecondForm  && (
              <form className={css.form2} action="" onSubmit={sendEmail2}>

                <div className={css.form2top}>
                
                <div className={css.carinputset}>
            
                  <div className={css.togglediv}>
                    <input style={{border:"none"}} 
                      className={css.carinput}
                      type="text"
                      name=""
                      id=""
            
                      placeholder="do you own a car?"
                    /> 
                    <input
                      className={css.checkinput}
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleToggleChange}
                      id="switch"
                    />
                  </div>
                  <div className={css.descript}>
                    <span>
                      Your membership will cover one car. You can add more cars
                      later in the Batcave Mobile App.
                    </span>{" "}
                  </div>
                </div> 

                <div className={`${css.carinputsets} ${carData.registrationNumber ? css.hasContent : ""}`}>
                  <div className={!isChecked? css.regnumbboxinactive :css.regnumbbox}>
                    <input
                      className={!isChecked ? css.inactive : css.carinput}
                      // className={ `${css.carinput} ${css.forfade}`}
                      disabled={!isChecked}
                      
                      type="text"
                      name="registrationNumber"
                    value={carData.registrationNumber}
               onChange={(e) =>
              setCarData({
                 ...carData,
            registrationNumber: e.target.value,
                   })
              } 
                     
                      id=""
                      placeholder=""
                      required
                      maxLength="10"
                      minLength="8"
                      //  pattern="[A-Za-z]{2}\d{2}[A-Za-z]{1,2}\d{4}
                      //  "
               
                    />
                             <label className={css.label}>
        <span className={`${css.char} ${css.forfade}`} style={{ transitionDelay: '00ms' }}>C</span>
        <span className={`${css.char} ${css.forfade}`}  style={{ transitionDelay: '50ms' }}>A</span> 
        <span className={`${css.char} ${css.forfade}`}  style={{ transitionDelay: '100ms' }}>R</span>
        <span  className={`${css.char} ${css.forfade}`}style={{ transitionDelay: '150ms' }}></span>
        <span className={`${css.char} ${css.forfade}`} style={{ transitionDelay: '200ms' }}>R</span>
        <span className={`${css.char} ${css.forfade}`} style={{ transitionDelay: '250ms' }}>E</span>
        <span className={`${css.char} ${css.forfade}`} style={{ transitionDelay: '300ms' }}>G</span>
        <span className={`${css.char} ${css.forfade}`} style={{ transitionDelay: '350ms' }}>I</span>
        <span className={`${css.char} ${css.forfade}`} style={{ transitionDelay: '400ms' }}>S</span>
        <span className={`${css.char} ${css.forfade}`} style={{ transitionDelay: '450ms' }}>T</span>
        <span className={`${css.char} ${css.forfade}`} style={{ transitionDelay: '500ms' }}>R</span>
        <span className={`${css.char} ${css.forfade}`} style={{ transitionDelay: '550ms' }}>A</span>
        <span className={`${css.char} ${css.forfade}`} style={{ transitionDelay: '600ms' }}>T</span>
        <span className={`${css.char} ${css.forfade}`} style={{ transitionDelay: '650ms' }}>I</span>
        <span className={`${css.char} ${css.forfade}`} style={{ transitionDelay: '700ms' }}>O</span>
        <span className={`${css.char} ${css.forfade}`}style={{ transitionDelay: '750ms' }}>N</span>
        <span className={`${css.char} ${css.forfade}`} style={{ transitionDelay: '800ms' }}></span>
        <span className={`${css.char} ${css.forfade}`} style={{ transitionDelay: '800ms' }}>N</span>
        <span className={`${css.char} ${css.forfade}`}style={{ transitionDelay: '850ms' }}>U</span>
        <span className={`${css.char} ${css.forfade}`}style={{ transitionDelay: '880ms' }}>M</span>
        <span className={`${css.char} ${css.forfade}`} style={{ transitionDelay: '900ms' }}>B</span>
        <span className={`${css.char} ${css.forfade}`} style={{ transitionDelay: '950ms' }}>E</span>
        <span className={`${css.char} ${css.forfade}`}style={{ transitionDelay: '999ms' }}>R</span>
      
    </label>
                    <img className={css.regtick} src={Tick} alt="" />
                  </div>
         
                  {/* <div className={css.inputline}> </div> */}
                  <div className={css.dummy}>
                  <span className={!isChecked? css.dummyspanfade : css.dummyspan}>Should be a max of 10 digits(TN05YY1234)</span>
                </div>
                </div>
                

                <div className={`${css.carinputsets} ${inputValue ? css.hasContent : ""}`}>
                  <input
                    className={ css.carinput}
                    // className={css.carinputoptional}
                    type="text"
                    name=""
                    id=""
                    placeholder=""
                    onFocus={handleInputFocus}
                    onChange={handleInputChange}
                    value={inputValue}
                  //  required
                  />
                               <label className={`${css.label} ${isFocused || inputValue ? css.labelFocused : ''}`}>
        <span className={css.char} style={{ transitionDelay: '00ms' }}>I</span>
        <span className={css.char} style={{ transitionDelay: '50ms' }}>N</span> 
        <span className={css.char} style={{ transitionDelay: '100ms' }}>S</span>
        <span  className={css.char}style={{ transitionDelay: '150ms' }}>T</span>
        <span className={css.char} style={{ transitionDelay: '200ms' }}>A</span>
        <span className={css.char} style={{ transitionDelay: '250ms' }}>G</span>
        <span className={css.char} style={{ transitionDelay: '300ms' }}>R</span>
        <span className={css.char} style={{ transitionDelay: '350ms' }}>A</span>
        <span className={css.char} style={{ transitionDelay: '400ms' }}>M</span>
        <span className={css.char} style={{ transitionDelay: '450ms' }}></span>
        <span className={css.char} style={{ transitionDelay: '500ms' }}>I</span>
        <span className={css.char} style={{ transitionDelay: '550ms' }}>D</span>
        <span className={css.char} style={{ transitionDelay: '600ms' }}></span>
        <span className={css.char} style={{ transitionDelay: '600ms' }}>(0ptional)</span>
       
      
    </label>
                  {/* <div className={css.inputline}> </div> */}
                </div>

                <div style={{marginTop:"1rem"}} className={css.carinputset}>
                  <select style={{borderBottom:"1px solid blue",color:
                  selectedSize===""? "#666":
                 selectedSize==="xs"? "#fff":
                 selectedSize==="s"? "#fff":
                 selectedSize==="m"? "#fff":
                 selectedSize==="l"? "#fff":
                 selectedSize==="xl"? "#fff":
                 selectedSize==="xxl"? "#fff":
                               "#666", }}
                    name="size"
                    required
                    className={css.carinput}
                    id=""
                    placeholder="t - shirt size"
                    // defaultValue="" 
                    value={selectedSize}
                    onChange={handleChangeSize}
                  >
                    <option className={css.opt} value="" disabled>
                      {" "}
                      t - shirt size
                    </option>
                    <option className={css.opt} value="xs">
                      XS
                    </option>
                    <option className={css.opt} value="s">
                      S
                    </option>
                    <option className={css.opt} value="m">
                      M
                    </option>
                    <option className={css.opt} value="l">
                      L
                    </option>
                    <option className={css.opt} value="xl">
                      xl
                    </option>
                    <option className={css.opt} value="xxl">
                      xxl
                    </option>
                  </select>
                  {/* <div className={css.inputline}></div> */}
                </div>

                {/* <div className={css.btns}>
                  <button className={css.yrbtn}>yearly subscription</button>
                  <button className={css.labtn}>Lifetime access</button>
                </div> */}

                </div>


                <div className={css.form2bottom}>
                <div className={css.agree}>
                  <span>
                    by clicking, i agree WITH THE{" "}
                    <span onClick={()=>setOpenedp(!openedp)} className={css.underline}> privacy policy</span> and{" "}
                    <span onClick={()=>setOpenedt(!openedt)} className={css.underline}>TERMS & CONDITIONS </span>
                  </span>
                </div>

              <button  onClick={()=>window.scrollTo(0,0)} 
              type="submit"
               className={`${css.proceedbtn} ${css.buttonWithZIndex}`}> proceed to checkout</button> 
                </div>
              </form> 
            )}
          </div>
          </div> 
        </div> 
      </div>

      {/* terms and conditions */}

      {openedt && <motion.div className={css.tandc}
       initial={{x:130}}
       whileInView={{ x:0}}
       transition={{duration:0.8}}
      ><div className={css.head}>
      <span>Terms & conditions</span>
      <img onClick={()=>setOpenedt(false)} src={Hclose} alt="" />
  </div>
  <div className={css.content}>
<span className={css.thead}>Batcave Membership Terms and Conditions</span>

<span className={css.tcontent}>These terms and conditions ("Terms") govern your membership with Batcave ("Club"). By registering and becoming a member, you agree to comply with these Terms. Please read them carefully.</span>

<span className={css.thead}>1. Membership Eligibility:</span>
 <span className={css.tcontent}>- Membership is open to individuals who meet the Club's criteria.</span>
<span className={css.tcontent}>- Members must be at least 18 years old.</span>

<span className={css.thead}>2. Membership Benefits:</span>
<span className={css.tcontent}>- Members gain access to exclusive Club events, discounts, and privileges as outlined by the Club.</span>
<span className={css.tcontent}>- Benefits may be subject to change at the discretion of the Club.</span>

<span className={css.thead}>3. Membership Duration:</span>
 <span className={css.tcontent}>- Membership duration for Batcave OGs is Lifetime from the date of registration.</span>
 <span className={css.tcontent}>- Memberships are only transferable to the heir for the holder and attract a nominal transfer fee.</span>

<span className={css.thead}>4. Registration and Fees:</span>
 <span className={css.tcontent}>- Membership registration requires payment of the specified fee.</span>
 <span className={css.tcontent}>- Membership fees are non-refundable.</span>

<span className={css.thead}>5. Code of Conduct:</span>
<span className={css.tcontent}>- Members must adhere to the Club's code of conduct during Club events and interactions.</span>
 <span className={css.tcontent}>- Inappropriate behaviour may result in membership termination.</span>

<span className={css.thead}>6. Privacy and Data:</span>
 <span className={css.tcontent}>- The Club will handle your personal information in accordance with its privacy policy.</span>
 <span className={css.tcontent}>- Your information may be used for Club communications and promotions.</span>

<span className={css.thead}>7. Termination:</span>
 <span className={css.tcontent}>- The Club reserves the right to terminate or suspend a membership for violation of these Terms or any disruptive behaviour.</span>

<span className={css.thead}>8. Disclaimers:</span>
 <span className={css.tcontent}>- The Club is not responsible for any accidents, damage, or loss that may occur during Club events.</span>
 <span className={css.tcontent}>- Members are responsible for their own safety and the safety of their property.</span>

<span className={css.thead}>9. Changes to Terms:</span>
 <span className={css.tcontent}>- The Club may modify these Terms at any time. Members will be notified of changes.</span>

<span className={css.thead}>10. Governing Law and Jurisdiction:</span>
 <span className={css.tcontent}>- These Terms are governed by the laws of the State of Tamil Nadu, India.</span>
 <span className={css.tcontent}>- Any disputes or legal proceedings arising from these Terms will be subject to the exclusive jurisdiction of the courts located in Coimbatore, Tamil Nadu, India.</span>
�
<span className={css.tcontent}>By registering for Batcave OGs membership, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.</span>
</div>
        </motion.div>}


{/* privacy */} 
{openedp && <motion.div className={css.privacypolicy}
       initial={{x:130}}
       whileInView={{ x:0}}
       transition={{duration:0.8}}
      >
        <div className={css.head}>
      <span>privacy policy</span>
      <img onClick={()=>setOpenedp(false)} src={Hclose} alt="" />
  </div>
  <div className={css.content}>
  <span className={css.phead}>Effective Date: 10-10-2023</span>

<span className={css.phead}>1. Introduction:</span>

<span className={css.pcontent}>Welcome to Batcave ("Club"). This Privacy Policy outlines how we collect, use, and protect your personal information. By becoming a member of our club, you agree to the terms and practices described in this policy.</span>

<span className={css.phead}>2. Information We Collect:</span>

<span className={css.pcontent}>We may collect the following types of personal information:</span>
<span className={css.pcontent}>- Contact Information: Name, email address, phone number, and address.</span>
<span className={css.pcontent}>- Membership Information: Details related to your membership, including payment information and details relevant to your car.</span>
<span className={css.pcontent}>- Communication Preferences: Your preferences for receiving communications from the Club.</span>
<span className={css.pcontent}>- Event Participation: Information related to your participation in club events and activities.</span>

<span className={css.phead}>3. How We Use Your Information:</span>

<span className={css.pcontent}>We use your personal information for the following purposes:</span>
<span className={css.pcontent}>- To manage and administer your club membership.</span>
<span className={css.pcontent}>- To communicate with you about club events, news, and updates.</span>
<span className={css.pcontent}>- To personalise your club experience.</span>
<span className={css.pcontent}>- To process payments for membership fees and event registrations.</span>
<span className={css.pcontent}>- To comply with legal obligations.</span>

<span className={css.phead}>4. Data Security:</span>

<span className={css.pcontent}>We take reasonable measures to protect your personal information from unauthorised access, disclosure, alteration, or destruction.</span>

<span className={css.phead}>5. Third-Party Disclosure:</span>

<span className={css.pcontent}>We do not sell or share your personal information with third parties for marketing purposes.</span>

<span className={css.phead}>6. Your Choices:</span>

<span className={css.pcontent}>You can update your communication preferences or request the deletion of your personal information by contacting us at support@batcave.co.in.</span>

<span className={css.phead}>7. Changes to Privacy Policy:</span>

<span className={css.pcontent}>We may update this Privacy Policy to reflect changes in our data practices. The revised policy will be effective from the date posted on our website.</span>

<span className={css.phead}>8. Contact Us:</span>

<span className={css.pcontent}>If you have any questions or concerns about our Privacy Policy or data practices, please contact us at support@batcave.co.in.</span>

  </div>
  </motion.div>}
  <button className={css.bt1} onClick={notify1}>Show Toast 1</button>
      <button className={css.bt2} onClick={notify2}>Show Toast 2</button>
      <button className={css.bt3} onClick={notify3}>Show Toast 3</button>
      <button className={css.bt4} onClick={notify4}>Show Toast 4</button>

      <ToastContainer className={css.customtoastcontainer}
      bodyClassName={css.customtoastbody}
        toastClassName="custom-toast-container"
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={3} // Set a limit of 3 toasts per container
        containerId="container1"
        
      />
     
    </div>
  );
};

export default Register;
