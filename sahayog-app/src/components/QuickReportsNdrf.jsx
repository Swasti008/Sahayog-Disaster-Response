import React, { useState } from "react";
import { Clock, CheckCircle, AlertTriangle, NotepadText, Send } from "lucide-react";

function QuickReports({ alert }) {
  const [status, setStatus] = useState('');
  const [comments, setComments] = useState('');
  const [teamMessage, setTeamMessage] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handleTeamMessageChange = (event) => {
    setTeamMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!status || !comments || !teamMessage) {
      setError("All fields are required.");
      return;
    }

    const formObject = {
      disasterId: alert._id,
      status: status,
      comments: comments,
      teamMessage: teamMessage
    };

    try {
      const response = await fetch("http://localhost:3000/track-report/postReport", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formObject),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Quick Report added successfully!");
        setError('');
        // Reset form fields
        setStatus('');
        setComments('');
        setTeamMessage('');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to add the quick report.");
    }
  };

  // Status configurations
  const statusConfig = {
    'In Progress': { 
      color: 'text-yellow-600 bg-yellow-50 border-yellow-200', 
      icon: Clock 
    },
    'Completed': { 
      color: 'text-green-600 bg-green-50 border-green-200', 
      icon: CheckCircle 
    },
    'Pending': { 
      color: 'text-blue-600 bg-blue-50 border-blue-200', 
      icon: Clock 
    },
    'Delayed': { 
      color: 'text-red-600 bg-red-50 border-red-200', 
      icon: AlertTriangle 
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-blue-500 text-white px-6 py-4 flex items-center">
        <NotepadText className="h-6 w-6 mr-3" />
        <h2 className="text-xl font-bold">Quick Notes</h2>
      </div>

      <div className="p-6 space-y-5">
        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg flex items-center">
            <CheckCircle className="h-5 w-5 mr-3 text-green-500" />
            <span className="font-medium">{successMessage}</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg flex items-center">
            <AlertTriangle className="h-5 w-5 mr-3 text-red-500" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Status Update */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status Update
            </label>
            <div className="relative">
              {status && statusConfig[status] && React.createElement(statusConfig[status].icon, {
                className: `absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${statusConfig[status].color}`
              })}
              <select
                value={status}
                onChange={handleStatusChange}
                className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  status ? statusConfig[status].color : 'text-gray-500'
                }`}
              >
                <option value="">Select Status 📝</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Delayed">Delayed</option>
              </select>
            </div>
          </div>

          {/* Comments */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Add Comments
            </label>
            <textarea
              value={comments}
              onChange={handleCommentsChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Enter any additional comments or observations..."
            ></textarea>
          </div>

          {/* Team Communication */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Message to Team
            </label>
            <textarea
              value={teamMessage}
              onChange={handleTeamMessageChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Communicate with your team here..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center space-x-2"
          >
            <Send className="h-5 w-5" />
            <span>Submit Report</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default QuickReports;