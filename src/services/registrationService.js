import api from "./api";
export const getData = (params) => api.get("/registrations", { params });
export const createData = (data) => api.post("/patients/registrations", data);
export const updateData = (id, data) => api.put(`/registrations/${id}`, data);
export const deleteData = (id) => api.delete(`/registrations/${id}`);
export const getRegistrationById = (id) => api.get(`/registrations/${id}`);