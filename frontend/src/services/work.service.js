import api from './api';

export const workService = {
  getAll: (params = {}) => api.get('/works', { params }),
  getById: (id) => api.get(`/works/${id}`),
  create: (data) => api.post('/works', data),
  update: (id, data) => api.put(`/works/${id}`, data),
  delete: (id) => api.delete(`/works/${id}`),
  getBySpace: (spaceId) => api.get(`/spaces/${spaceId}/works`),
  getStats: (id) => api.get(`/works/${id}/stats`)
};

export default workService;