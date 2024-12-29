import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axiosInstance from "/frontend/axiosConfig";

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { contentType } = useContentStore();

  useEffect(() => {
    const getTrendingContent = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error before the request
        const res = await axiosInstance.get(`/api/v1/${contentType}/trending`);

        // Ensure that the response contains the expected data
        if (res.data?.content) {
          setTrendingContent(res.data.content);
        } else {
          throw new Error("No content found");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch trending content");
      } finally {
        setLoading(false);
      }
    };

    getTrendingContent();
  }, [contentType]);

  return { trendingContent, loading, error };
};

export default useGetTrendingContent;
