import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Title from "../components/Title";

const Blog = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/posts`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token for authentication
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.text();
          console.error("Error fetching posts:", errorData);
          throw new Error(
            `Failed to fetch posts: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        setPosts(data.data); // Assuming your API response has a `data` field containing the posts
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token]); // Dependency on token to refetch if it changes

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
        <p className="mt-4 text-lg text-gray-600">Loading posts...</p>
      </div>
    ); // Loader while fetching
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="text-2xl text-center pt-8 border-b border-gray-200 mb-6">
        <Title text1={"OUR"} text2={"BLOGS"} />
      </div>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={post._id} className="mb-12 pb-8"> {/* Larger spacing */}
            <h3 className="text-4xl font-semibold text-gray-800 mb-4">
              {post.title}
            </h3>
            
            {post.imageUrl && (
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${post.imageUrl}`}
                alt={post.title}
                className="w-full max-w-md h-auto object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-4"
              />
            )}

            <p className="text-lg text-gray-600 mb-4">{post.content}</p>

            <p className="mt-2 text-gray-500 text-sm">
              Posted on {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <hr className="my-6 border-gray-300" /> {/* Larger divider */}
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">No posts available.</div>
      )}
    </div>
  );
};

export default Blog;
