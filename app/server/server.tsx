// import "server-only"
const getUserData = async (dataUser:string, authToken:string) => {
    try {
      const userResponse = await fetch(`https://api.github.com/users/${dataUser}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const userData = await userResponse.json();
      
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error; // Rethrow the error to handle it in the calling code
    }
  };
  
export async function getRepoData(dataUser :string, authToken : string){
    try {
      const reposResponse = await fetch(`https://api.github.com/users/${dataUser}/repos?per_page=200`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const reposData = await reposResponse.json();
      console.log("reposData")
      return reposData;
    } catch (error) {
      console.error('Error fetching repository data:', error);
      throw error; // Rethrow the error to handle it in the calling code
    }
  };
  
//   // Example usage:
//   // Assuming authToken is the user's GitHub access token
//   const authToken = 'yourGitHubAccessToken';
//   const dataUser = 'desiredGitHubUsername';
  
//   getUserData(dataUser, authToken)
//     .then((userData) => {
//       console.log('User Data:', userData);
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
  
//   getRepoData(dataUser, authToken)
//     .then((repoData) => {
//       console.log('Repository Data:', repoData);
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
  