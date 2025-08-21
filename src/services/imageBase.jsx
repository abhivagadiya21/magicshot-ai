// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/auth",
});

export const babyuploadeAPI = async (imageFiles, otherData) => {
  try {
    const formData = new FormData();
    // Send actual File objects, not blob URLs
    formData.append("parent1", imageFiles.parent1);
    formData.append("parent2", imageFiles.parent2);
    formData.append("userid", otherData.userid);
    formData.append("gender", otherData.gender);
    formData.append("transactionId", otherData.transactionId);

    const response = await api.post("/baby-generator", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
