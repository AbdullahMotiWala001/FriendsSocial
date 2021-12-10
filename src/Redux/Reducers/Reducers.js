import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, onSnapshot, getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import useState from "react-hook-use-state";

const initialState = null;
const auth = getAuth();
const navigate = useNavigate();

//Sign in
export const signIn = (state = initialState, action) => {
    if (action.type == 'signIn') {
        signInWithEmailAndPassword(auth, user.name, user.password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate("/");
            })
            .catch((error) => {
                alert(error.code);
            });
    }
}


//SignUp
export const signUp = (state = initialState, action) => {
    if (action.type == 'signUp') {
        createUserWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                alert("You have successfully Signup")
                uploadTask.on('state_changed',
                    (snapshot) => {
                    },
                    (error) => {
                        switch (error.code) {
                            case 'storage/unauthorized':
                                break;
                            case 'storage/canceled':
                                break;
                            case 'storage/unknown':
                                break;
                        }
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setDoc(doc(db, 'profile', user.uid), {
                                dpLink: downloadURL,
                                ...user
                            })
                            alert('Post added Successfully');
                            navigate('/')
                        })
                            .catch((error) => {
                                alert(error.code)
                            })
                    })
            })
    }
}


//AuthState 
export const authState = (state = initialState, action) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (action.type == 'authState') {
                setUserEmail(user.email);
            }
            else if (action.type == 'authStateNav') {
                const docRef = doc(db, "profile", user.email);
                getDoc(doc(db, "profile", user.email)).then(docSnap => {
                    if (docSnap.exists()) {
                        setUserName(docSnap.data().name);
                        setUserDp(docSnap.data().dpLink);


                    }
                })
            }
        }

        else {
            navigate('/login')
        }
    });
}


//sentPost

export const sentPost = (state = initialState, action) => {
    if (action.type == 'sentPost') {
        let time = new Date();
        let timeStampString = time.getTime().toString();
        let timeStamp = time.getTime();
        const postIamge = document.getElementById("postImage").files[0]
        const storageRef = ref(storage, 'postImages/' + userEmail + '/' + timeStampString);
        const uploadTask = uploadBytesResumable(storageRef, postIamge, metadata);
        uploadTask.on('state_changed',
            (snapshot) => {
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        break;
                    case 'storage/canceled':
                        break;
                    case 'storage/unknown':
                        break;
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setDoc(doc(db, 'posts', timeStampString), {
                        ...postDet,
                        postImage: downloadURL,
                        time: timeStamp,
                        author: userEmail
                    }).then(() => { alert('Post added Successfully'); navigate('/') })
                });
            }

        )
    }
}

//snapShot
export const snapShot = (state = initialState, action) => {
    if (action.type == 'snapShot') {
        onSnapshot(collection(db, 'posts'),
            (snapShot) => setPostArr(snapShot.docs.map((doc) => (doc.data()))))
    }
}