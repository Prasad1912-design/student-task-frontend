import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/StudentDashboard.css';
import { decryptFrontend } from '../utils/crypto';

export default function StudentDashboard({logFail}) {

  const navigate = useNavigate();

  const [students, setStudents] = useState([]);

  const handleLogout = () => {
    logFail();
    navigate("/");
  };

  const handleDelete = async (id) =>{
    try{
      const response = await axios.delete(`http://localhost:5000/deleteStudent/${id}`);
      
      if(response.data.success)
        {
          setStudents((data)=>data.filter((student)=>student._id!==id));
        }
    }
    catch(error)
    {
      console.log("error : ",error);
    }
  }


  const fetchStudents = async () => {
  try {
    const res = await axios.get("http://localhost:5000/students");

    const decryptedData = res.data.data.map((item) => ({
      ...item,
      fullName: decryptFrontend(item.fullName),
      email: decryptFrontend(item.email),
      phoneNumber : decryptFrontend(item.phoneNumber),
      gender: decryptFrontend(item.gender),
      address: decryptFrontend(item.address),
      courseEnrolled: decryptFrontend(item.courseEnrolled),
    }));

    setStudents(decryptedData);

  } catch (err) {
    console.error("Failed to fetch", err);
  }
};

  useEffect(() => { fetchStudents(); }, []);

  return (
    <div className="container">
      {/* Header Section */}
      <div className="header-flex">
        <div className="title-area">
          <h1>Student Information System</h1>
          <p>Database Management & Student Records</p>
        </div>
        <div className="action-buttons">
          <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Table Section */}
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Course</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((item) => (
              <tr key={item._id}>
                <td style={{ fontWeight: '600', color: '#1e293b' }}>{item.fullName}</td>
                <td>{item.email}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.dob}</td>
                <td>{item.gender}</td>
                <td>{item.address}</td>
                <td>{item.courseEnrolled}</td>
                <td>
                  <div className="icon-group" style={{ justifyContent: 'center' }}>
                    <button onClick={()=>navigate(`/updateStudent/${item._id}`)} className="action-btn edit-icon" title="Edit">✏️</button>
                    <button className="action-btn delete-icon" onClick={()=>handleDelete(item._id)} title="Delete">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
            
            {/* Fallback empty state */}
            {students.length === 0 && (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                  No student records found in the database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}