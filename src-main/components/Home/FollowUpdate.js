import { async } from '@firebase/util';
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React from 'react'
import { useUserAuth } from '../../context/UserAuthContext';
import { db } from '../../firebase';

function FollowUpdate({ followingUid, following }) {

    const { user } = useUserAuth();

    const followerRef = doc(db, "user", user.uid);

    const updateFollowing = async () => {
        const followingRef = doc(db, "user", followingUid);
        await updateDoc(followingRef, {
            followers:
                arrayUnion(user.uid)
        }
        )
            .then(async () => {
                await updateDoc(followerRef, {
                    following:
                        arrayUnion(followingUid)
                })
            }).catch((e) => {
                console.log(e);
            })
    }

    const removeFollowing = async () => {
        const followingRef = doc(db, "user", followingUid);
        await updateDoc(followingRef, {
            followers:
                arrayRemove(user.uid)
        }
        )
            .then(async () => {
                await updateDoc(followerRef, {
                    following:
                        arrayRemove(followingUid)
                })
            }).catch((e) => {
                console.log(e);
            })
    }

    return (
        <div className='follow-btn'>
            {!following?.includes(followingUid) ? <button className='bt-2 bt-blue' onClick={updateFollowing}>+ follow</button> :
                <button className='bt-2' onClick={removeFollowing}>following</button>}
        </div>
    )
}

export default FollowUpdate;
