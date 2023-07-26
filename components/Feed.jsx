"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [posts, setPosts] = useState([]); // set to empty array

  // handle input search
  const handleSearchChange = (e) => {
    // setSearchText(e.target.value)

    const result = searchFilter();

    setSearchResult(result);
  }

  const searchFilter = () => {
    return posts.filter(
      (post) => 
        post.tag.toLowerCase().includes(searchText.toLowerCase()) ||
        post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
        post.creator.username.toLowerCase().includes(searchText.toLowerCase())
    )
  }

  // load at the start of the page as soon as page loads 
  useEffect(() => {
    // fetch data from backend
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          // onChange={handleSearchChange}
          // onKeyUp={searchFilter}
          onChange={(e) => setSearchText(e.target.value)} // get input text from user
          onKeyUp={handleSearchChange} // every time user key in character, we filter result
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchResult}
          handleTagClick={() => {}}
        />
      ) : (
        <PromptCardList
          data={posts}
          handleTagClick={() => {}} 
        />
      )}
      
    </section>
  )
}

export default Feed