import React, { useState, useEffect } from "react";

// Assuming `alert` is the object containing disaster details
// Example: { _id: "123abc" }

function QuickReports({ alert }) {
  const [status, setStatus] = useState('');
  const [comments, setComments] = useState('');
  const [teamMessage, setTeamMessage] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    console.log(status)
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
    console.log(comments)
  };

  const handleTeamMessageChange = (event) => {
    setTeamMessage(event.target.value);
    console.log(teamMessage)
  };


  // Handle form submission to create a new quick report
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!status || !comments || !teamMessage) {
      setError("All fields are required.");
      return;
    }
    console.log("alert._id:", alert._id);
console.log("status:", status);
console.log("comments:", comments);
console.log("teamMessage:", teamMessage);

const formObject = {
    disasterId: alert._id,
    status: status,
    comments: comments,
    teamMessage: teamMessage
  };
  console.log("Form Object:", formObject);
  try{
  
  const response = await fetch("http://localhost:3000/track-report/postReport", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formObject),
  });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Quick Report added successfully!");
        setError(''); // Clear any existing errors
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to add the quick report.");
    }
  };

  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Quick Reports</h2>

      {/* Display success message */}
      {successMessage && (
        <div className="bg-green-200 p-2 mb-4 rounded">
          {successMessage}
        </div>
      )}

      {/* Display error message */}
      {error && (
        <div className="bg-red-200 p-2 mb-4 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Status Update */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Status Update</label>
          <select
            value={status}
            onChange={handleStatusChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Delayed">Delayed</option>
          </select>
        </div>

        {/* Comments */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Add Comments</label>
          <textarea
            value={comments}
            onChange={handleCommentsChange}
            rows="4"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            placeholder="Enter any additional comments or observations..."
          ></textarea>
        </div>

        {/* Team Communication */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Message to Team</label>
          <textarea
            value={teamMessage}
            onChange={handleTeamMessageChange}
            rows="4"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            placeholder="Communicate with your team here..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
}

export default QuickReports;
