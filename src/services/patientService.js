import api from "./api";
export const getData = (params) => api.get("/patients", { params });
export const createData = (data) => api.post("/patients", data);
export const updateData = (id, data) => api.put(`/patients/${id}`, data);
export const deleteData = (id) => api.delete(`/patients/${id}`);
export const getLastRegistration = (id) => api.get(`/patients/${id}/last-registration`);
export const getPatientById = (id) => api.get(`/patients/${id}`);