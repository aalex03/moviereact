import React, { useEffect, useState } from 'react';
import { ListGroup, Image } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from "../firebaseApp";
import {getAuth, getUser} from "firebase/auth";

const Comment = ({ comment }) => {
    const user = 'bozo';
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    // Fetch additional user data from Firebase Auth
    if (user) {
      const { displayName, photoURL } = user;
      setUserData({ displayName, photoURL });
    }
  }, [user]);

  return (
    <ListGroup.Item>
      <div>
        {userData && (
          <div>
            <Image src={userData.photoURL} alt="User Photo" roundedCircle width={30} height={30} />
            <span>{userData.displayName}</span>
          </div>
        )}
        <p>{comment.Content}</p>
        <small className='text-muted'>{comment.Timestamp.toDate().toLocaleDateString()}</small>
      </div>
    </ListGroup.Item>
  );
};

export default Comment;
