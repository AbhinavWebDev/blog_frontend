import { publicApi, privateApi } from "./api";

const postApi = {
    getposts: () => publicApi.get("/post"),

    getSinglePost: (postId) => publicApi.get(`/post/${postId}`),

    createPost: (data) => privateApi.post('/post', data),

    updatePost: (postId,data) => privateApi.put(`/post/${postId}`, data),

    deletePost: (postId) => privateApi.delete(`/post/${postId}`),


};

export default postApi;

