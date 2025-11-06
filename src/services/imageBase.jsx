import axios from "axios";

const api = axios.create({
  baseURL: "https://magicshot-ai-backend.onrender.com/auth",
  // baseURL: "http://localhost:3000/auth",
  // baseURL: "http://192.168.1.21:3000/auth",
});

export const babyUploadAPI = async (imageFiles, otherData) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("parent1", imageFiles.parent1);
    formData.append("parent2", imageFiles.parent2);
    formData.append("gender", otherData.gender);

    const response = await api.post("/baby-generator", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const ageJourneyAPI = async (imageFiles, otherData) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("ageJourneyUpload", imageFiles.ageJourneyUpload);
    formData.append("age", otherData.selectAge);
    const response = await api.post("/age-journey", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const agePredictorAPI = async (imageFiles, otherData) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("agePredictorUpload", imageFiles.agePredictorUpload);
    formData.append("Predict_age", otherData.predictAge);

    const response = await api.post("/age-predictor", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error predicting age:", error);
    throw error;
  }
};


export const changeHairstyleAPI = async (imageFiles, otherData) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("HairuploadPhoto", imageFiles.parent1);
    formData.append("hairStyle", otherData.hairstyle);
    formData.append("hairColor", otherData.hairColor);
    formData.append("gender", otherData.gender);
    console.log("imageFiles:", imageFiles.parent1);
    const response = await api.post("/change-hairstyle", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

export const getUserProfileAPI = async (token) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const getImageHistoryAPI = async (token) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/image-history", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching image history:", error);
    throw error;
  }
};

export const getTransactionsAPI = async (token) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/transactions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export const updateUserProfileInfoAPI = async (token, cleanedData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post("/profile/usernameBio", cleanedData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cleanedData),
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

export const updateUserProfileImageAPI = async (token, imageFile) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("profileImage", imageFile);
    const response = await api.post("/profile/changeprofileimage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating profile image:", error);
    throw error;
  }
};

export const changePasswordAPI = async (token, passwordData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post("/profile/changepassword", passwordData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(passwordData),
    });
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};