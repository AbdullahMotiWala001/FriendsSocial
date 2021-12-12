export const sentPost = () => {
    return {
        type: 'sentPost'
    }
}

export const authState = () => {
    return {
        type: 'authState'
    }
}

export const snapShot = () => {
    return {
        type: 'snapShot'
    }
}

export const signIn = (email, pass) => {
    return {
        type: 'signIn',
        payload: {
            email, pass
        }
    }
}

export const authStateNav = () => {
    return {
        type: 'authStateNav'
    }
}
