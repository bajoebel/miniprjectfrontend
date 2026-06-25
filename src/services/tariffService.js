import api from "./api";
export const getData = (params) => api.get("/tariffs", { params });
export const createData = (data) => api.post("/tariffs", data);
export const updateData = (id, data) => api.put(`/tariffs/${id}`, data);
export const deleteData = (id) => api.delete(`/tariffs/${id}`);
export const getAll = (params) => api.get("/tariffs/all", { params });
export const getById = (id) => api.get(`/tariffs/${id}`);