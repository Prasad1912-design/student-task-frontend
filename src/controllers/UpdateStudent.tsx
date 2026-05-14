import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { decryptFrontend, encryptFrontend } from '../utils/crypto';
import "./css/Register.css";

export default function UpdateStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    dob: "",
    gender: "",
    address: "",
    courseEnrolled: "",
  });

  // 🔄 Fetch existing student
const fetchStudent = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/studentData/${id}`);

    const data = res.data.data;
    // ✅ format date for input type="date"
    const formatDate = (dateString) => {
      if (!dateString) return "";
      return new Date(dateString).toISOString().split("T")[0];
    };

    const decryptedData = {
      fullName: decryptFrontend(data.fullName || ""),
      email: data.email,
      phoneNumber: data.phoneNumber || "",
      dob: formatDate(data.dob), // ✅ FIXED HERE
      gender: decryptFrontend(data.gender || ""),
      address: decryptFrontend(data.address || ""),
      courseEnrolled: decryptFrontend(data.courseEnrolled || ""),
    };

    setFormData(decryptedData);

  } catch (err) {
    console.log("Error fetching student", err);
  }
};

  useEffect(() => {
    fetchStudent();
  }, [id]);

  // ✏️ Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🚀 Update submit
  const handleUpdate = async (e) => {
    e.preventDefault();

    const encryptedData = {
    fullName: encryptFrontend(formData.fullName),
    email: formData.email,
    phoneNumber: formData.phoneNumber,
    dob: formData.dob, // keep as-is (date issue)
    gender: encryptFrontend(formData.gender),
    address: encryptFrontend(formData.address),
    courseEnrolled: encryptFrontend(formData.courseEnrolled),
  };

    try {
      const res = await axios.put(
        `http://localhost:5000/updateStudent/${id}`,
        encryptedData
      );

      if (res.data.success) {
        alert("Student Updated Successfully");
        navigate("/dashboard");
      }
    } catch (err) {
      console.log("Update failed", err);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h1>Update Student</h1>
        <p className="sub-heading">
          Edit student details and save changes
        </p>

        <form onSubmit={handleUpdate}>

          {/* FULL NAME */}
          <div className="input-group">
            <label>Full Name</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              type="text"
            />
          </div>

          {/* EMAIL */}
          <div className="input-group">
            <label>Email Address</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
            />
          </div>

          {/* PHONE */}
          <div className="input-group">
            <label>Phone Number</label>
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              type="text"
            />
          </div>

          {/* DOB */}
          <div className="input-group">
            <label>Date of Birth</label>
            <input
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              type="date"
            />
          </div>

          {/* GENDER */}
          <div className="input-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* ADDRESS */}
          <div className="input-group">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          {/* COURSE */}
          <div className="input-group">
            <label>Course Enrolled</label>
            <input
              name="courseEnrolled"
              value={formData.courseEnrolled}
              onChange={handleChange}
              type="text"
            />
          </div>

          {/* BUTTON */}
          <button type="submit" className="register-btn">
            Update Student
          </button>

        </form>

      </div>
    </div>
  );
}