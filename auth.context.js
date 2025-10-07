import { useAuth, useUser } from '@clerk/clerk-expo';
import { StackActions, useNavigation } from '@react-navigation/native';
import { addDoc, collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { db } from './firebase.config';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {

    const navigation = useNavigation()

    const { user,isLoaded } = useUser();
    const [role, setRole] = React.useState();
    const [userId, setUserId] = React.useState();
    const [profile, setProfile] = React.useState();


    const { isSignedIn } = useAuth()

    const EnterUserToDb = async () => {

        if (!isSignedIn) return

        const q = query(collection(db, "users"), where("email", "==", user?.emailAddresses[0]?.emailAddress));
        const querySnapshot = await getDocs(q);


        if (querySnapshot.docs.length !== 0) {
            setProfile(querySnapshot.docs[0].data())
            setRole(querySnapshot.docs[0].data().role)
            setUserId(querySnapshot.docs[0].id)
            console.log('User already exists');
            return;
        }



        const data = {
            name: user.firstName + ' ' + user.lastName || '',
            email: user?.emailAddresses[0]?.emailAddress,
            role: 'user',
            photo: user.imageUrl,
        }

        try {
            const res = await addDoc(collection(db, "users"), data)
            setRole('user')
            setProfile(data)
            setUserId(res.id)
            console.log('Inserted document with ID: ', res.id);
        } catch (error) {
            console.log('Error adding document: ', error);
        }


    }

    useEffect(() => {

        if(!isLoaded) return

        let unsubscribe=null

        if (user) {

            EnterUserToDb()

            const q = query(collection(db, "users"), where("email", "==", user?.emailAddresses[0]?.emailAddress));
            unsubscribe = onSnapshot(q, (snapshot) => {

                if (snapshot.docs.length === 0) {
                    // navigation.navigate('SignIn')
                    return;
                }

                console.log('changed');
                const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setRole(data[0]?.role);
                setUserId(data[0]?.id);
                setProfile(data[0]);
                
                
                if(data[0] && data[0]?.role === 'admin'){
                    navigation.dispatch(StackActions.replace('HomeScreen'));
                }
                else if(data[0] && data[0]?.role === 'user' || data[0] && data[0]?.role === 'moderator'){
                    navigation.dispatch(StackActions.replace('Home'));
                }
            
            })
        }
        

        return () => unsubscribe && unsubscribe

    }, [user])

    return <AuthContext.Provider value={{ user, role, userId, profile,EnterUserToDb }}>{children}</AuthContext.Provider>;
}

export const useRole = () => {
    if (!React.useContext(AuthContext)) throw new Error('useAuth must be used within a AuthProvider');
    return React.useContext(AuthContext);
}