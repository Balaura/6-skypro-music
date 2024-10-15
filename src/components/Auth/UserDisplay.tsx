import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const UserDisplay: React.FC = () => {
     const [isClient, setIsClient] = useState(false);
     const username = useSelector((state: RootState) => state.auth.username);

     useEffect(() => {
          setIsClient(true);
     }, []);

     if (!isClient) {
          return <>Гость</>;
     }

     return <>{username || 'Гость'}</>;
};

export default UserDisplay;