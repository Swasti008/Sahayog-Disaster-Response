const data = {
    "_id": { "$oid": "6753f626910c6a65862472d8" },
    "id": "6753f615142f5588af12d23d",
    "type": "building-collapse",
    "location": {
      "city": "Bhopal",
      "state": "Madhya Pradesh",
      "country": "India",
      "coordinates": {
        "latitude": { "$numberDouble": "23.259933" },
        "longitude": { "$numberDouble": "77.412615" }
      }
    },
    "timestamp": "2024-12-07T07:15:34.020Z",
    "description": "Building collapse in Bhopal, Madhya Pradesh. Condolences to the affected families.",
    "criticality": {
      "magnitude": null,
      "severity": null
    },
    "media": {
      "percentage": null,
      "attachments": []
    },
    "status": {
      "reviewedByNDRF": null,
      "reviewDate": null
    },
    "embedding": [
      [{ "$numberDouble": "0.036761053" }, { "$numberDouble": "-0.048275694" }]
    ],
    "numberOfPosts": { "$numberInt": "1" },
    "trackedReports": [
      {
        "reportId": "R001",
        "location": {
          "city": "Bhopal",
          "state": "Madhya Pradesh",
          "country": "India"
        },
        "type": "Building Collapse",
        "timestamp": "2024-12-07T07:15:34.020Z",
        "status": "In Progress",
        "actionsTaken": [
          {
            "actionType": "Rescue Operations",
            "timestamp": "2024-12-07T07:45:00Z",
            "details": "Rescue teams deployed to search for survivors in the collapsed building."
          },
          {
            "actionType": "Emergency Medical Aid",
            "timestamp": "2024-12-07T08:00:00Z",
            "details": "Medical teams dispatched for treatment and triage of injured victims."
          }
        ],
        "media": [
          {
            "type": "Image",
            "url": "https://example.com/images/building-collapse.jpg",
            "description": "Collapsed building in Bhopal",
            "timestamp": "2024-12-07T07:20:00Z"
          }
        ],
        "appDetails": {
          "activeUsers": 800,
          "features": [
            "Real-time Rescue Updates",
            "Victim Identification",
            "Live Media Feed"
          ]
        }
      },
      {
        "reportId": "R002",
        "location": {
          "city": "Bhopal",
          "state": "Madhya Pradesh",
          "country": "India"
        },
        "type": "Building Collapse",
        "timestamp": "2024-12-07T07:20:00Z",
        "status": "Resolved",
        "actionsTaken": [
          {
            "actionType": "Debris Removal",
            "timestamp": "2024-12-07T09:00:00Z",
            "details": "Debris removal teams started clearing the collapsed structure for investigation."
          }
        ],
        "media": [
          {
            "type": "Video",
            "url": "https://example.com/videos/building-collapse-action.mp4",
            "description": "Rescue operation in progress in Bhopal",
            "timestamp": "2024-12-07T08:30:00Z"
          }
        ]
      }
    ],
    "graphData": {
      "labels": ["Rescue Teams Deployed", "Victims Rescued", "Medical Aid Provided"],
      "datasets": [
        {
          "label": "Operational Progress",
          "data": [20, 50, 30], // Example data points
          "backgroundColor": ["#FF6384", "#36A2EB", "#FFCE56"]
        }
      ]
    }
  };
  
  export default data;
  