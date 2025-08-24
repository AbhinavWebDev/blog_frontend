const { default: authApi } = require("@/utils/authApi");
const {profileApi } = require("@/utils/profileApi");

const { create } = require("zustand");
const { persist, createJSONStorage } = require("zustand/middleware");

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            loading: false,
            error: null,

            login: async (values) => {
                set({ loading: true, error: null });
                try {
                    const { data } = await authApi.login(values);
                    set({ user: data.user, accessToken: data.accessToken, loading: false });
                } catch (err) {
                    const message = err.response?.data?.message || err.message || "Login failed";
                    set({ error: message, loading: false });
                    throw new Error(message);
                }
            },


            // Logout user
            logout: async () => {
                set({ loading: true, error: null });
                try {
                    await authApi.logout();
                    set({ user: null, accessToken: null, loading: false });
                } catch (err) {
                    set({ error: err.response?.data?.message || err.message || "Logout failed", loading: false });
                }
            },

            // Register new user
            register: async (values) => {
                set({ loading: true, error: null });
                try {
                    await authApi.register(values);
                    set({ loading: false });
                } catch (err) {
                    set({ error: err.response?.data?.message || err.message || "Registration failed", loading: false });
                    throw err;
                }
            },

            updateProfile: async (values) => {
                console.log('yeeesdaf');
                set({ loading: true, error: null });
                try {
                    const { data } = await profileApi.updateProfile(values);
                    set({ user: data.user, loading: false });
                } catch (err) {
                    const message = err.response?.data?.message || err.message || "Update failed";
                    set({ error: message, loading: false });
                    throw new Error(message);
                }
            },

        }),
        {
            name: "auth-store",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ user: state.user, accessToken: state.accessToken }),
        }
    )
);

export default  useAuthStore;
