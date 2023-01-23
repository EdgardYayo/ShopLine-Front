const { user, isAuthenticated, isLoading } = useAuth0();
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
  
  const Profile = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);

    useEffect(() => {
        const getUserMetadata = async () => {
          const domain = process.env.REACT_APP_AUTH0_DOMAIN;
      
          try {
            const accessToken = await getAccessTokenSilently({
              authorizationParams: {
                audience: `https://dev-4zbd8xzwtn8q8w80.us.auth0.com/api/v2/`,
                scope: "read:current_user",
              },
            });
      
            const userDetailsByIdUrl = `https://dev-4zbd8xzwtn8q8w80.us.auth0.com/api/v2/users/${user?.sub}`;
      
            const metadataResponse = await fetch(userDetailsByIdUrl, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
      
            const { user_metadata } = await metadataResponse.json();
      
            setUserMetadata(user_metadata);
          } catch (e:any) {
            console.log(e.message);
          }
        };
      
        getUserMetadata();
      }, [getAccessTokenSilently, user?.sub]);
  
    return (
      isAuthenticated && (
        <div>
          <img src={user?.picture} alt={user?.name} />
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
          <h3>User Metadata</h3>
          {userMetadata ? (
            <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
          ) : (
            "No user metadata defined"
          )}
        </div>
      )
    );
  };
  
  export default Profile;
