"use client"

import { useRouter, useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

// import Profile from '@components/Profile';
import Profile from '@components/Profile';

const UserProfile = () => {
  // const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();

  const params = useParams();

  const username = params.username;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/${username}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    fetchUser();
  }, [username]);
  // dependency array is a way to control when the effect runs. in this case, this will run whenever username changes

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (user && user._id) {
          const response = await fetch(`/api/users/${user._id}/posts`);
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error('Error fetching posts data:', error);
      }
    };

    fetchPosts();
  }, [user]);

  return (
    <Profile
      name={user?.username}
      desc={'This is ' + user?.username + ' personalized profile'}
      data={posts}
    />
  )
}

export default UserProfile