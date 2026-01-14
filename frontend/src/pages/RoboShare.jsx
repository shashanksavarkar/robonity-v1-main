import React from 'react';
import RoboShareItem from '../components/RoboShareItem'; // Import the component
import "../styles/RoboShare.css"

function RoboShare() {
  
  const fileData = [
    {
      id: 1,
      title: 'Rover_Chassis_v3.stl',
      description: '3D model for the main rover chassis.',
      url: '#' // Placeholder URL
    },
    {
      id: 2,
      title: 'Motor_Mount_Final.stl',
      description: 'Mount for 12V DC motors.',
      url: '#' // Placeholder URL
    },
    {
      id: 3,
      title: 'line_follower_code.ino',
      description: 'Arduino code for a simple line follower.',
      url: '#' // Placeholder URL
    },
    {
      id: 4,
      title: 'RoboArm_Schematic.pdf',
      description: 'Circuit schematic for the 6-axis arm.',
      url: '#' // Placeholder URL
    }
  ];

  return (
    <div>
      <h1 className="page-header">RoboShare</h1>
      <p style={{marginBottom: '2rem'}}>A place to share your code, design files, and project documentation with the community.</p>
      
      <div className="roboshare-grid">
        {fileData.map(item => (
          <RoboShareItem 
            key={item.id}
            title={item.title}
            description={item.description}
            url={item.url}
          />
        ))}
      </div>
    </div>
  );
}

export default RoboShare;