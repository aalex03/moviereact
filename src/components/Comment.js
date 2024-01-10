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
    <ListGroup.Item style={{backgroundColor:'#1d2026'}}>
      <div>
        {userData && (
          <div>
            <Image src={userData.PhotoUrl} alt="User Photo" roundedCircle width={30} height={30} style={{marginRight: '10px'}} />
            <span style={{color:'white'}}>{userData.Username}</span>
          </div>
        )}
        {comment && (
          <div>
            <p style={{fontSize: '24px', color:"white"}}>
              {comment.Content}
              <br />
              <small style={{color:'white'}}>{comment.Timestamp?.toDate().toLocaleDateString()}</small>
            </p>
          </div>
        )}

      </div>
    </ListGroup.Item>
  );
};

export default Comment;
