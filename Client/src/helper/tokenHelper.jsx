export const setToken = (token) => {
    localStorage.setItem("token", token)
}

export const getToken = () => {
    return localStorage.getItem("token")
}

export const removeToken = () => {
    return localStorage.removeItem("token")
}

export const clearStorage = () => {
    localStorage.clear();
}
