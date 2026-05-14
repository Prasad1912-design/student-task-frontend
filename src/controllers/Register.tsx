import { useRef } from 'react';
import './css/Register.css';
import axios from 'axios';
import { encryptFrontend } from '../utils/crypto';

export default function Register({logSuccess}) {

  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const dobRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);
  const courseRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    const studentData = {

      fullName: encryptFrontend(fullNameRef.current?.value),
      email: emailRef.current?.value,
      phoneNumber: phoneNumberRef.current?.value,  // Due to type number can't  ncrypt
      dob: dobRef.current?.value,   // Due to type date can't encrypt
      gender: encryptFrontend(genderRef.current?.value),
      address: encryptFrontend(addressRef.current?.value),
      courseEnrolled: encryptFrontend(courseRef.current?.value),
      password: passwordRef.current?.value

    }

    // Validation

    if (
      !studentData.fullName ||
      !studentData.email ||
      !studentData.phoneNumber ||
      !studentData.dob ||
      !studentData.gender ||
      !studentData.address ||
      !studentData.courseEnrolled ||
      !studentData.password
    ) {

      alert("All fields are mandatory");

      return;

    }

    const response = await axios.post('http://localhost:5000/insertStudent',studentData);
    if(response.data.success)
    {
      logSuccess();
    }
    else
    {
      console.log("Failed");
    }

  }

  return (

    <div className="register-container">

      <div className="register-card">

        <h1>
          Student Registration
        </h1>

        <p className="sub-heading">
          Fill all details to create student account
        </p>

        <form onSubmit={handleSubmit}>

          {/* FULL NAME */}

          <div className="input-group">

            <label>Full Name</label>

            <input
              ref={fullNameRef}
              type="text"
              placeholder="Enter full name"
            />

          </div>

          {/* EMAIL */}

          <div className="input-group">

            <label>Email Address</label>

            <input
              ref={emailRef}
              type="email"
              placeholder="Enter email"
            />

          </div>

          {/* PHONE */}

          <div className="input-group">

            <label>Phone Number</label>

            <input
              ref={phoneNumberRef}
              type="number"
              placeholder="Enter phone number"
            />

          </div>

          {/* DOB */}

          <div className="input-group">

            <label>Date of Birth</label>

            <input
              ref={dobRef}
              type="date"
            />

          </div>

          {/* GENDER */}

          <div className="input-group">

            <label>Gender</label>

            <select ref={genderRef}>

              <option value="">
                Select Gender
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

            </select>

          </div>

          {/* ADDRESS */}

          <div className="input-group">

            <label>Address</label>

            <textarea
              ref={addressRef}
              placeholder="Enter address"
            ></textarea>

          </div>

          {/* COURSE */}

          <div className="input-group">

            <label>Course Enrolled</label>

            <input
              ref={courseRef}
              type="text"
              placeholder="Enter course"
            />

          </div>

          {/* PASSWORD */}

          <div className="input-group">

            <label>Password</label>

            <input
              ref={passwordRef}
              type="password"
              placeholder="Enter password"
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="register-btn"
          >
            Register Student
          </button>

        </form>

      </div>

    </div>

  )

}