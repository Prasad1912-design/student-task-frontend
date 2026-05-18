// Register.tsx

import { useState } from 'react';
import './css/Register.css';
import axios from 'axios';
import { encryptFrontend } from '../utils/crypto';

export default function Register({ logSuccess }) {

  const [students, setStudents] = useState([
    {
      fullName: "",
      email: "",
      phoneNumber: "",
      dob: "",
      gender: "",
      address: "",
      courseEnrolled: "",
      password: ""
    }
  ]);

  const [loading, setLoading] = useState(false);

  // ==========================================
  // EMAIL ERRORS
  // ==========================================

  const [emailErrors, setEmailErrors] =
    useState<{ [key: number]: string }>({});

  // ==========================================
  // HANDLE CHANGE
  // ==========================================

  const handleChange = (
    index: number,
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    const updatedStudents = [...students];

    updatedStudents[index] = {
      ...updatedStudents[index],
      [e.target.name]: e.target.value
    };

    setStudents(updatedStudents);

    // REMOVE ERROR WHILE TYPING

    setEmailErrors((prev) => ({
      ...prev,
      [index]: ""
    }));

  }

  // ==========================================
  // ADD STUDENT
  // ==========================================

  const addStudent = () => {

    setStudents([
      ...students,
      {
        fullName: "",
        email: "",
        phoneNumber: "",
        dob: "",
        gender: "",
        address: "",
        courseEnrolled: "",
        password: ""
      }
    ]);

  }

  // ==========================================
  // REMOVE STUDENT
  // ==========================================

  const removeStudent = (index: number) => {

    const updatedStudents =
      students.filter((_, i) => i !== index);

    setStudents(updatedStudents);

  }

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    // ==========================================
    // CLEAR OLD ERRORS
    // ==========================================

    setEmailErrors({});

    // ==========================================
    // VALIDATION
    // ==========================================

    for (let student of students) {

      if (
        !student.fullName ||
        !student.email ||
        !student.phoneNumber ||
        !student.dob ||
        !student.gender ||
        !student.address ||
        !student.courseEnrolled ||
        !student.password
      ) {

        alert("All fields are mandatory");

        return;

      }

    }

    // ==========================================
    // SAME PAGE DUPLICATE CHECK
    // ==========================================

    const errors:
      { [key: number]: string } = {};

    students.forEach((student, index) => {

      const duplicateIndex =
        students.findIndex((s, i) => {

          return (
            s.email === student.email
            &&
            i !== index
          );

        });

      if (duplicateIndex !== -1) {

        errors[index] =
          "Email already entered";

      }

    });

    // ==========================================
    // STOP IF DUPLICATE FOUND
    // ==========================================

    if (Object.keys(errors).length > 0) {

      setEmailErrors(errors);

      return;

    }

    // ==========================================
    // ENCRYPT DATA
    // ==========================================

    const encryptedStudents =
      students.map((student) => ({

        fullName:
          encryptFrontend(student.fullName),

        email:
          encryptFrontend(student.email),

        phoneNumber:
          encryptFrontend(student.phoneNumber),

        dob:
          student.dob,

        gender:
          encryptFrontend(student.gender),

        address:
          encryptFrontend(student.address),

        courseEnrolled:
          encryptFrontend(student.courseEnrolled),

        password:
          encryptFrontend(student.password)

      }));

    try {

      setLoading(true);

      const response = await axios.post(
        'http://localhost:5000/insertStudent',
        {
          students: encryptedStudents
        }
      );

      if (response.data.success) {

        alert(
          "Students Registered Successfully"
        );

        logSuccess();

      }

    }
    catch (error: any) {

      // ======================================
      // DATABASE DUPLICATE EMAILS
      // ======================================

      if (
        error.response?.data?.duplicateEmails
      ) {

        const dbErrors:
          { [key: number]: string } = {};

        students.forEach((student, index) => {

          if (
            error.response.data.duplicateEmails
            .includes(student.email)
          ) {

            dbErrors[index] =
              "Email already exists in database";

          }

        });

        setEmailErrors(dbErrors);

      }

      alert(
        error.response?.data?.message
        ||
        "Registration Failed"
      );

    }
    finally {

      setLoading(false);

    }

  }

  return (

    <div className="register-container">

      <div className="register-card">

        <h1>
          Student Registration
        </h1>

        <p className="sub-heading">
          Add single or multiple students
        </p>

        <form onSubmit={handleSubmit}>

          {
            students.map((student, index) => (

              <div
                className="student-box"
                key={index}
              >

                <div className="student-header">

                  <h2>
                    Student {index + 1}
                  </h2>

                  {
                    students.length > 1 &&
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() =>
                        removeStudent(index)
                      }
                    >
                      Remove
                    </button>
                  }

                </div>

                {/* FULL NAME */}

                <div className="input-group">

                  <label>Full Name</label>

                  <input
                    type="text"
                    name="fullName"
                    value={student.fullName}
                    onChange={(e) =>
                      handleChange(index, e)
                    }
                    placeholder="Enter full name"
                  />

                </div>

                {/* EMAIL */}

                <div className="input-group">

                  <label>Email Address</label>

                  <input
                    type="email"
                    name="email"
                    value={student.email}
                    onChange={(e) =>
                      handleChange(index, e)
                    }
                    placeholder="Enter email"
                    className={
                      emailErrors[index]
                      ?
                      "error-input"
                      :
                      ""
                    }
                  />

                  {
                    emailErrors[index]
                    &&
                    (
                      <p className="error-text">
                        {emailErrors[index]}
                      </p>
                    )
                  }

                </div>

                {/* PHONE */}

                <div className="input-group">

                  <label>Phone Number</label>

                  <input
                    type="tel"
                    name="phoneNumber"
                    value={student.phoneNumber}
                    onChange={(e) =>
                      handleChange(index, e)
                    }
                    placeholder="Enter phone number"
                  />

                </div>

                {/* DOB */}

                <div className="input-group">

                  <label>Date of Birth</label>

                  <input
                    type="date"
                    name="dob"
                    value={student.dob}
                    onChange={(e) =>
                      handleChange(index, e)
                    }
                  />

                </div>

                {/* GENDER */}

                <div className="input-group">

                  <label>Gender</label>

                  <select
                    name="gender"
                    value={student.gender}
                    onChange={(e) =>
                      handleChange(index, e)
                    }
                  >

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
                    name="address"
                    value={student.address}
                    onChange={(e) =>
                      handleChange(index, e)
                    }
                    placeholder="Enter address"
                  ></textarea>

                </div>

                {/* COURSE */}

                <div className="input-group">

                  <label>Course Enrolled</label>

                  <input
                    type="text"
                    name="courseEnrolled"
                    value={student.courseEnrolled}
                    onChange={(e) =>
                      handleChange(index, e)
                    }
                    placeholder="Enter course"
                  />

                </div>

                {/* PASSWORD */}

                <div className="input-group">

                  <label>Password</label>

                  <input
                    type="password"
                    name="password"
                    value={student.password}
                    onChange={(e) =>
                      handleChange(index, e)
                    }
                    placeholder="Enter password"
                  />

                </div>

              </div>

            ))
          }

          {/* ADD BUTTON */}

          <button
            type="button"
            className="add-btn"
            onClick={addStudent}
          >
            + Add More Student
          </button>

          {/* SUBMIT */}

          <button
            type="submit"
            className="register-btn"
            disabled={loading}
          >

            {
              loading
              ?
              "Registering..."
              :
              "Register Students"
            }

          </button>

        </form>

      </div>

    </div>

  )

}