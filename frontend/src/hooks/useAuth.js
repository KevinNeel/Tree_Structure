export const useIsAuthenticated = () => {
    const token = localStorage.getItem('access_Token');
    const user = localStorage.getItem('user')
    const userDetails = user && token;
    let isAuthenticated = Boolean(userDetails);
    return { isAuthenticated, user: JSON.parse(user) };
};