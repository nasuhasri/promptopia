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
    setSearchText(e.target.value)

    const result = searchFilter();

    setSearchResult(result);
  }

  const searchFilter = () => {
    return posts.filter(
      (post) => 
        post.tag.includes(searchText) ||
        post.prompt.includes(searchText) ||
        post.creator.username.includes(searchText)
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
          onChange={handleSearchChange}
          onKeyUp={searchFilter}
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