"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // to know whether we are logged in
import { useRouter } from "next/navigation"; // to route back to home

import Profile from "@components/profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  // load at the start of the page as soon as page loads 
  useEffect(() => {
    // fetch data from backend
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    }

    if (session?.user.id) fetchPosts(); // if user exists, then fetchPosts()
  }, []);

  const handleEdit = () => {

  }

  const handleDelete = async () => {

  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile