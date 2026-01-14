import React from 'react';
import ResourceItem from '../components/ResourceItem'; // Import the component
import "../styles/Resources.css"

function Resources() {
  
  const resourceData = [
    {
      id: 1,
      title: 'React Official Docs',
      url: 'https://react.dev/',
      description: 'The official documentation for React. The best place to start.'
    },
    {
      id: 2,
      title: 'Arduino Official Website',
      url: 'https://www.arduino.cc/',
      description: 'Find tutorials, documentation, and the software for Arduino microcontrollers.'
    },
    {
      id: 3,
      title: 'ROS (Robot Operating System) Wiki',
      url: 'http://wiki.ros.org/',
      description: 'The main hub for ROS, a flexible framework for writing robot software.'
    },
    {
      id: 4,
      title: 'Thingiverse',
      url: 'https://www.thingiverse.com/',
      description: 'A huge community for discovering and sharing 3D printable models.'
    }
  ];

  return (
    <div>
      <h1 className="page-header">Resources</h1>
      <p style={{marginBottom: '2rem'}}>A curated list of tutorials, articles, and tools to help you with your robotics projects.</p>
      
      <div className="resource-list">
        {resourceData.map(item => (
          <ResourceItem 
            key={item.id}
            title={item.title}
            url={item.url}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Resources;