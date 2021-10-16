import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../components/firebase';

import { useAuth } from '../contexts/AuthContext'
import axios from 'axios';

const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);


    const handleLogout = async () => {
        await auth.signOut();

        history.push('/')

    }
    const getFile = async (URL) => {
        const response = await fetch(URL);
        const data = await response.blob();


        return new File([data], "userPhoto.jpg", { type: 'image/jpeg' })
    }

    useEffect(() => {
        if (!user) {
            history.post('/');

            return;
        }
        axios.get('https://api.chatengine.io/users/me/', {
            headers: {
                "project-ID": "3f24da98-be94-4e47-8fa3-24141d153733",
                "user-name": user.email,
                "user-secret": user.uid,

            }
        })
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                let formdata = new FormData();
                formdata.append('email', user.email);
                formdata.append('username', user.email);
                formdata.append('secret'.user.Uid);

                getFile(user.photoURL)
                    .then((avatar) => {
                        formdata.append('avatar', avatar, avatar.name);

                        axios.post('https://api.chatengine.io/users/',
                            formdata,
                            {
                                headers: { "private-Key": "65b43d22-d02e-4b7d-956e-cca0bed1749b" }
                            }
                        )
                            .then(() => setLoading(false))
                            .catch((error) => console.log(error))
                    })
            })
    }, [user, history]);

    if (!user || loading) return 'Loading...';
    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Go-Chat

                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>
            <ChatEngine
                height="calc(100vh - 66px)"
                projectID="3f24da98-be94-4e47-8fa3-24141d153733"
                userName={user.email}
                userSecret={user.Uid}

            />
        </div>
    )
}


export default Chats;


