import { privateApi } from "./api";

const userApi = {


    getAllProfile: () => privateApi.get('/user/'),
    getSingleProfile: (userId) => privateApi.get(`/user/${userId}`),
    updateProfile: (userId,data) => privateApi.put(`/user/${userId}`, data),
    deleteProfile: (userId) => privateApi.delete(`/user/${userId}`),




};

export default userApi;

