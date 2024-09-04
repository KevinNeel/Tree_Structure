export const registerError = (setError, backendError) => {
    setError((prev) => ({
        ...prev,
        name: backendError ? backendError?.name || "" : "",
        email: backendError ? backendError?.email || "" : "",
        password: backendError ? backendError?.password || "" : "",
    }));
};
