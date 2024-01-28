import React from 'react';
import MyCard from '../../components/github-card/github-card';

const MyCardPage: React.FC = () => {
  return (
    <div style={{ width: '400px', height: '600px' }}>
      <MyCard dataUser="varshithvhegde" authToken={process.env.NEXT_PUBLIC_GITHUB_TOKEN} dataTheme="dark" />
    </div>
  );
};

export default MyCardPage;
