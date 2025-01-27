import { selectCurrentStatus } from "@/app/slices/authSlice";
import {
  clearPostsState,
  getPosts,
  incrementPage,
  resetPage,
  selectError,
  selectPage,
  selectPosts,
  seleteHasMore,
} from "@/app/slices/postSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "./PostCard";

const PostFeed = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectCurrentStatus);
  const posts = useSelector(selectPosts);
  const hasMore = useSelector(seleteHasMore);
  const error = useSelector(selectError);
  const page = useSelector(selectPage);
  const elementRef = useRef(null);

  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasMore && !loading) {
        setLoading(true);
        if (debounceTimeout) clearTimeout(debounceTimeout);
        let time = 0;
        if (error) {
          time = 3000;
        }
        // Debounce the dispatch
        const newTimeout = setTimeout(() => {
          dispatch(getPosts({ page, limit: 4 }))
            .unwrap()
            .then(() => {
              dispatch(incrementPage());
              setLoading(false);
            })
            .catch((err) => {
              console.error("Failed to fetch videos:", err);
              setLoading(false);
            });
        }, time);

        setDebounceTimeout(newTimeout);
      }
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [dispatch, page, hasMore, loading, debounceTimeout, error]);

  useEffect(() => {
    dispatch(clearPostsState());

    return () => {
      dispatch(clearPostsState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!hasMore) dispatch(resetPage());
  }, [hasMore, dispatch]);
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard
          image={post?.image}
          key={post?._id}
          _id={post?._id}
          author={post?.owner}
          content={post?.content}
          likes={post?.likes}
          isLiked={post?.isLiked}
          time={post?.createdAt}
          isAuthenticated={isAuthenticated}
        />
      ))}
      {hasMore && (
        <div ref={elementRef} className="w-full text-center py-4">
          Loading...
        </div>
      )}
    </div>
  );
};
export default PostFeed;
