import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import '../styles/Bookmark.css';

const Bookmarks = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate();
  const jobs=()=>{
    navigate('/jobs')
  }
  const Home=()=>{
    navigate('/')
  }
  useEffect(() => {
    const fetchBookmarkedJobs = async () => {
      setIsLoading(true);

      try {
        // Retrieve bookmarked jobs from local storage
        const bookmarkedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
        setBookmarkedJobs(bookmarkedJobs);
      } catch (error) {
        console.error('Error fetching bookmarked jobs:', error);
        setError('Error fetching bookmarked jobs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarkedJobs();
  }, []);

  if (isLoading) {
    return <p>Loading bookmarks...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  

  return (
    <div className="bookmarks-container">
      <button onClick={jobs}>Jobs</button>
      <button onClick={Home}>Back To Home</button>
      <h1>Welcome To Bookmark</h1>
      {bookmarkedJobs.length > 0 ? (
        bookmarkedJobs.map((job) => (
          <div key={job.id} className="bookmark-card">
            <Link to={`/job/${job.id}`}>
            <h1>{job?.title || 'Job title not available'}</h1>
      <p><strong>Location:</strong> {job?.primary_details?.Place || 'N/A'}</p>
      <p><strong>Salary:</strong> {job?.primary_details?.Salary || 'N/A'}</p>
      <p><strong>Job_Type:</strong> {job?.primary_details?.Job_Type || 'N/A'}</p>
      <p><strong>Experience:</strong> {job?.primary_details?.Experience || 'N/A'}</p>
      <p><strong>Fees_Charged:</strong> {job?.primary_details?.Fees_Charged || 'N/A'}</p>
      <p><strong>Qualification:</strong> {job?.primary_details?.Qualification || 'N/A'}</p>
      <p><strong>Phone:</strong> {job?.whatsapp_no || 'N/A'}</p>
      <p><strong>Company:</strong> {job?.company_name || 'N/A'}</p>
            </Link>
          </div>
        ))
      ) : (
        <p>No bookmarked jobs.</p>
      )}
    </div>
  );
};

export default Bookmarks;
