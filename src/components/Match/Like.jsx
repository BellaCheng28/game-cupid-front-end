import React, { useEffect, useState } from 'react';

const Like = () => {
    const [likedProfiles, setLikedProfiles] = useState([]);

    useEffect(() => {
        // Fetch liked profiles from the server
        const fetchLikedProfiles = async () => {
            try {
                const response = await fetch('/api/liked-profiles');
                const data = await response.json();
                setLikedProfiles(data);
            } catch (error) {
                console.error('Error fetching liked profiles:', error);
            }
        };

        fetchLikedProfiles();
    }, []);

    return (
        <div>
            <h1>Liked Profiles</h1>
            {likedProfiles.length > 0 ? (
                <ul>
                    {likedProfiles.map(profile => (
                        <li key={profile.id}>
                            <img src={profile.image} alt={profile.name} />
                            <p>{profile.name}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No liked profiles yet.</p>
            )}
        </div>
    );
};

export default Like;