import React, { useEffect, useState } from 'react';
import { ListGroup, Image } from 'react-bootstrap';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from "../firebaseApp";


const Comment = ({ comment }) => {
  const [userData, setUserData] = useState({
    Username: '',
    PhotoUrl: '',
  });
  useEffect(() => {
    const getUserData = async () => {
      const userRef = doc(db, 'profiles', comment.UserId);
      const user = await (await getDoc(userRef)).data();

      setUserData({
        Username: user.Username,
        PhotoUrl: user.PhotoUrl,
      });
    };
    getUserData();
  }, [comment.UserId]);
  return (
    <ListGroup.Item>
      <div>
        {userData && (
          <div>
            <Image src={userData.PhotoUrl} alt="User Photo" roundedCircle width={30} height={30} />
            <span>{userData.Username}</span>
          </div>
        )}
        {comment && (
          <div>
            <p>{comment.Content}</p>
            <small className='text-muted'>{comment.Timestamp?.toDate().toLocaleDateString()}</small>
          </div>
        )}

      </div>
    </ListGroup.Item>
  );
};

export default Comment;
