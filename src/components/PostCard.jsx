import { timeAgo } from "@/app/helpers/timeAgo";
import { clearPostsState, toggleLike } from "@/app/slices/postSlice";
import { MoreHorizontal, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const PostContent = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LINES = 4;

  // Preserve line breaks while limiting initial view
  const renderContent = () => {
    const lines = content.split('\n');

    if (!isExpanded && lines.length > MAX_LINES) {
      return (
        <>
          {lines.slice(0, MAX_LINES).map((line, index) => (
            <p key={index} className="line-clamp-1">{line}</p>
          ))}
          <button
            onClick={() => setIsExpanded(true)}
            className="text-blue-600 hover:text-blue-800 text-sm mt-1"
          >
            See More
          </button>
        </>
      );
    }

    return lines.map((line, index) => (
      <p key={index} className="whitespace-pre-wrap">{line}</p>
    ));
  };

  return (
    <div className="my-4 text-gray-800 dark:text-gray-200">
      {renderContent()}
      {isExpanded && content.split('\n').length > MAX_LINES && (
        <button
          onClick={() => setIsExpanded(false)}
          className="text-blue-600 hover:text-blue-800 text-sm mt-1"
        >
          Show Less
        </button>
      )}
    </div>
  );
};

const PostCard = ({
  image,
  _id,
  author,
  content,
  likes,
  isLiked,
  time,
  isAuthenticated,
}) => {
  time = timeAgo(time);
  return (
    <div
      key={_id}
      className="bg-white dark:bg-gray-800 rounded-lg shadow transition-colors duration-200"
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <Link to={`/profile/${author._id}`} className="flex space-x-3">
            <img
              src={author?.avatar}
              alt={`${author?.fullName}'s avatar`}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {author?.fullName} .{" "}
                <span className="text-gray-400 text-xs">
                  @{author?.userName}
                </span>
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {author?.title} react devloper devloping web application
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-xs">{time}</p>
            </div>
          </Link>
          <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
        {image && <PostContent content={content} />}
        {!image && <p className="">{content}</p>}
        {image && (
          <img src={image} className="max-h-[30rem] object-cover w-full" />
        )}
      </div>
      <div className="px-4 py-3 border-t dark:border-gray-700 flex justify-between">
        <Like
          isAuthenticated={isAuthenticated}
          likes={likes}
          isLiked={isLiked}
          postId={_id}
        />
      </div>
    </div>
  );
};

const Like = ({ isAuthenticated, likes, isLiked, postId }) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(isLiked);
  const handleLike = async () => {
    await dispatch(toggleLike({ postId })).unwrap();
    setLiked((l) => !l);
  };
  return (
    <button
      onClick={() => handleLike()}
      className={` flex items-center space-x-2 ${isAuthenticated
          ? "text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
          : "text-gray-300 dark:text-gray-600 cursor-not-allowed"
        } `}
    >
      <ThumbsUp
        className={`h-5 w-5 ${liked ? "fill-blue-600 text-blue-600" : "bg-transparent"}`}
      />
      <span>{isLiked == liked ? likes : liked ? ++likes : likes}</span>
    </button>
  );
};

export default PostCard;
