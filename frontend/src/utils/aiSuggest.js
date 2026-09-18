import api from "./api";

export async function analyzePhotoWithAI(file) {
  const formData = new FormData();
  formData.append("photo", file);

  const res = await api.post("/api/ai/analyze-photo", formData);
  return res.data; // { title, description, quantity }
}
