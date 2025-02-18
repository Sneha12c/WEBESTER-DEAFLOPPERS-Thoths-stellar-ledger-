import React from 'react';
import Card from './Card.jsx'; // Import the Card component

const Features = ({ isabovelarge }) => {
  const featuresData = [
    {
      title: 'Record of Daily Expenses',
      description:
        'Effortlessly monitor and manage your financial health with our expense tracking feature, allowing you to record, categorize, and analyze your expenditures in real-time.',
      bgColor: 'bg-blue',
      buttonText: 'Lets Explore',
      navigate: '/userpage',
    },
    {
      title: 'Reports and Analytics',
      description:
        'Unlock financial clarity with robust reports and analytics, providing visual insights into your spending patterns, trends, and personalized financial analytics to empower informed decision-making.',
      bgColor: 'bg-red',
      buttonText: 'View Reports',
      navigate: '/dashboard',
    },
    {
      title: 'Invoice Automation & Smart Data Extraction',
      description:
        'Simplify your operations with our automated data extraction and invoice management system. Automatically capture and process invoice details, reducing manual effort and errors while improving efficiency.',
      bgColor: 'bg-yellow',
      buttonText: 'Set Reminder',
      navigate: '/extract',
    },
  ];

  return (
    <div className='m-10'>
    <div className={` md:justify-between md:gap-16 mt-32`}>
    <h4 className={`font-playfair font-bold text-red text-5xl`}>
        Features
    </h4>
    <div className={`h-0.5 w-48 bg-gradient-rainblue`}></div>
 </div>
    <div
      className={`${
        isabovelarge ? 'flex' : 'grid'
      } md:justify-between items-center mt-16 gap-10 `}
    >
      {featuresData.map((feature, index) => (
        <Card
          key={index}
          title={feature.title}
          description={feature.description}
          bgColor={feature.bgColor}
          buttonText={feature.buttonText}
          navigate={feature.navigate}
        />
      ))}
    </div>
    </div>
  );
};

export default Features;
