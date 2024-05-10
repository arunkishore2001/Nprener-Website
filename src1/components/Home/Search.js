import { collection, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useUserAuth } from '../../context/UserAuthContext';
import { db } from '../../firebase';
import FollowUpdate from './FollowUpdate';
import './Home.css';
import SearchIcon from "./images/search.svg";

export default function Search() {

    const {user} = useUserAuth();
    const [searchActive,setSearchActive] = useState(false);
    const [inboxActive,setInboxActive] = useState(false);
    const [searchedProfiles,setSearchedProfiles] = useState([]);
    const [searchTerm,setSearchTerm] = useState();
    const [following, setfollowing] = useState();

    useEffect(()=>{
        userFollowing();
    },[]);

    function userFollowing() {
        const docRef = doc(db, "user", user.uid);
        onSnapshot(docRef, (snapshot) => {
          setfollowing(snapshot.data().following);
        });
      };

    useEffect(() => {
            const UsersRef = collection(db, "user");
            console.log(searchTerm);
            const searchProfile = async () => {
            const q = query(UsersRef, where("name", ">=", searchTerm),where("name", "<=", searchTerm + "\uf8ff"),orderBy("name"));
            console.log(searchTerm);
            onSnapshot(q, (snapshot) => {
                const SearchProfiles = snapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                }));
                setSearchedProfiles(SearchProfiles);
            }) }
            searchProfile();
            console.log(searchedProfiles);
    },[searchTerm]);

  return (
    <div>
    <div className={`searchbar`}>
    <img src={SearchIcon} />
    <input onFocus={(e) => {setSearchActive(true)}}
            type="text" id="searchbar" 
            name="searchbar" placeholder="Search for Entrepreneur and more..."
            onChange={(e) => {
                setSearchTerm(e.target.value);
              }} />
</div>

<div className={`search-box ${ searchActive && "enable-searched-profiles"}`}>
<div onClick={(e)=>{setSearchActive(false)}} className={`search-focus-back-blur ${ searchActive && "enable"}`}>
    </div>
<div className='search-box-center '>
    <div onClick={(e)=>{setInboxActive(true)}} className={`search-main-screen ${ searchActive && "enable-searched-profiles"}`}>

        {searchedProfiles.map(({name,id})=> (
            <div className='searched-profile-screen'>
            <div className='searched-profile-screen-left'>
                <div className="searched-avator">
                    <img src= "https://assets.materialup.com/uploads/087c90e2-1863-4090-a717-7eee34b1194d/preview.png" />
                </div>
                <div className="searched-details">
                    <h4>{name}</h4>
                    <h5>{id}</h5>
                </div>
                {user.uid!=id && <FollowUpdate followingUid={id} following={following}/>}
            </div>
            <div className='searched-profile-screen-right'>
                <img src={SearchIcon} />
            </div>
        </div>
        ))}

        </div>
        </div>
    </div>
</div>
)
}
