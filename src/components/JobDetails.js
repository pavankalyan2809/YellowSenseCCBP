import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import '../styles/JobDetails.css';  // Import the CSS file

const JobDetail = () => {
  const { id } = useParams();  // Get the job ID from the route parameter
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate();
  const back=()=>{
    navigate('/jobs')
  }
  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await fetch(`https://testapi.getlokalapp.com/common/jobs?page=1`); 
        const data = await response.json();

        console.log('Fetched Job Detail:', data); 

        if (data.results && Array.isArray(data.results)) {
          const foundJob = data.results.find(job => job.id === parseInt(id, 10)); 

          if (foundJob) {
            setJob(foundJob);
          } else {
            throw new Error('Job not found');
          }
        } else {
          throw new Error('Job data is not in the expected format');
        }
      } catch (error) {
        console.error('Error fetching job detail:', error);
        setError('Error fetching job details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetail();
  }, [id]);

  if (isLoading) {
    return <p className="loading">Loading job details...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="job-detail-container">
      <h1>{job?.title || 'Job title not available'}</h1>
      <p><strong>Location:</strong> {job?.primary_details?.Place || 'N/A'}</p>
      <p><strong>Salary:</strong> {job?.primary_details?.Salary || 'N/A'}</p>
      <p><strong>Job_Type:</strong> {job?.primary_details?.Job_Type || 'N/A'}</p>
      <p><strong>Experience:</strong> {job?.primary_details?.Experience || 'N/A'}</p>
      <p><strong>Fees_Charged:</strong> {job?.primary_details?.Fees_Charged || 'N/A'}</p>
      <p><strong>Qualification:</strong> {job?.primary_details?.Qualification || 'N/A'}</p>
      <p><strong>Phone:</strong> {job?.whatsapp_no || 'N/A'}</p>
      <p><strong>Company:</strong> {job?.company_name || 'N/A'}</p>
      <button onClick={back}>Back</button>
    </div>
  );
};

export default JobDetail;
