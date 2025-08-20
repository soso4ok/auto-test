import React from 'react';
import { Link } from 'react-router-dom';

const topics = [
  {
    id: 'azure-az900',
    title: 'Azure AZ-900: Microsoft Azure Fundamentals',
    description: 'Practice quiz for Microsoft Azure Fundamentals certification exam.',
    sections: [
      { name: 'Describe cloud concepts', weight: '25-30%' },
      { name: 'Describe Azure architecture and services', weight: '35-40%' },
      { name: 'Describe Azure management and governance', weight: '30-35%' }
    ]
  }
];

function HomePage() {
  return (
    <div>
      <h2>Select an Exam Topic</h2>
      <div className="topic-list">
        {topics.map(topic => (
          <Link to={`/topics/${topic.id}/setup`} key={topic.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card">
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
              <div className="sections">
                <h4>Exam Sections:</h4>
                <ul>
                  {topic.sections.map((section, index) => (
                    <li key={index}>{section.name} ({section.weight})</li>
                  ))}
                </ul>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;