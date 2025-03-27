import React, { useState, useRef, useEffect } from "react";
import { FileText, Users } from "lucide-react";
import { useParams } from "react-router-dom";
import { apiClient } from "@/app/api/axiosInstance";

const SearchResultsPage = () => {
  const { query } = useParams();
  const [activeSection, setActiveSection] = useState("All");
  const [searchResults, setSearchResults] = useState({
    users: [],
    posts: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const sectionRefs = {
    Posts: useRef(null),
    People: useRef(null),
  };

  const sections = [
    { name: "Posts", icon: FileText },
    { name: "People", icon: Users },
  ];

  const scrollToSection = (sectionName) => {
    setActiveSection(sectionName);
    sectionRefs[sectionName].current?.scrollIntoView({ behavior: "smooth" });
  };

  const search = async () => {
    try {
      setIsLoading(true);
      const searchResult = await apiClient.get(`/search?query=${query}`);
      console.log(searchResult);
      setSearchResults({
        users: searchResult.data.data.users || [],
        posts: searchResult.data.data.posts || [],
      });
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults({
        users: [],
        posts: [],
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    search();
  }, [query]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-gray-600 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full bg-gray-100 dark:bg-gray-900 justify-between">
      {/* Floating Sidebar (Desktop) */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 hidden md:block">
        <div className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.name}
              onClick={() => scrollToSection(section.name)}
              className={`
                flex items-center justify-center w-10 h-10 rounded-full transition-all
                ${
                  activeSection === section.name
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }
              `}
            >
              {section.icon ? <section.icon className="w-5 h-5" /> : "All"}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 shadow-md p-2 flex justify-around items-center md:hidden">
        {sections.map((section) => (
          <button
            key={section.name}
            onClick={() => scrollToSection(section.name)}
            className={`flex flex-col items-center justify-center p-2 text-sm
              ${
                activeSection === section.name
                  ? "text-blue-600 dark:text-blue-300"
                  : "text-gray-600 dark:text-gray-300"
              }`}
          >
            {section.icon ? <section.icon className="w-5 h-5 mb-1" /> : "All"}
            <span className="text-xs">{section.name}</span>
          </button>
        ))}
      </div>

      {/* Scrollable Content */}
      <div className="w-full max-w-4xl mt-20 mx-auto">
        {/* Posts Section */}
        <section ref={sectionRefs.Posts} id="posts-section" className="py-4">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">Posts</h2>
          <div className="space-y-4">
            {searchResults.posts.length > 0 ? (
              searchResults.posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={post.owner.avatar}
                      alt={post.owner.fullName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold dark:text-white">
                          {post.owner.fullName}
                        </h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mt-2">
                        {post.content}
                      </p>
                      {post.image && (
                        <img
                          src={post.image}
                          alt="Post"
                          className="mt-4 rounded-lg max-w-full h-auto"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <p className="text-gray-500 dark:text-gray-400">
                  No posts matching your search.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* People Section */}
        <section
          ref={sectionRefs.People}
          id="people-section"
          className="py-4 mb-20 md:mb-2"
        >
          <h2 className="text-2xl font-bold mb-6 dark:text-white">People</h2>
          <div className="space-y-4">
            {searchResults.users.length > 0 ? (
              searchResults.users.map((user) => (
                <div
                  key={user._id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center space-x-4"
                >
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold dark:text-white">
                      {user.fullName}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      @{user.userName}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <p className="text-gray-500 dark:text-gray-400">
                  No people matching your search.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SearchResultsPage;
