export const getProfile = async () => {
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");

  if (!ACCESS_TOKEN) {
    console.error("No access token found.");
    return null;
  }

  const url =
    "https://advancedweb-finalproject-educat-be.onrender.com/auth/profileUser";

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const user = await response.json();

    return user;
  } catch (error) {
    console.error("Error getting user profile:", error);
    return null;
  }
};
