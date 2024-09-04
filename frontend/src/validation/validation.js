export const checkWhiteSpace = (value, key, setError) => {
    // const regex = /^\s+/;
    // return regex.test(value);
    console.log(value, 'value');
    if (value == '') {
        setError((prev) => ({ ...prev, [key]: "Field Cannot be empty" }))
        return false

    } else {
        setError((prev) => ({ ...prev, [key]: "" }))
    }

};

export const emailValidation = (email, key, setError) => {

    if (!/\S+@\S+\.\S+/.test(email)) {
        setError((prev) => ({ ...prev, [key]: "Invalid Email Type" }))
        return false
    } else {
        setError((prev) => ({ ...prev, [key]: "" }))
        return true
    }

}

export const checkPassword = (password, key, setError) => {
    if (password.length <= 6) {
        setError((prev) => ({ ...prev, [key]: "Password must contain more than 6 characters" }))
        return false
    } else {
        setError((prev) => ({ ...prev, [key]: "" }))
        return true
    }
}

