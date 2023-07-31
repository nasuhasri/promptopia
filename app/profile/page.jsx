"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // to know whether we are logged in
import { useRouter } from "next/navigation"; // to route back to home

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

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

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        })

        // filter the post by checking if the individual post is not equal to the deleted post
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error)
      }
    }
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