import React from 'react';
import MyCard from '../../components/github-card/github-card';

const MyCardPage: React.FC = () => {
  return (
    <div style={{ width: '400px', height: '600px' }}>
      <MyCard dataUser="varshithvhegde" dataTheme="dark" />
    </div>
  );
};

export default MyCardPage;
