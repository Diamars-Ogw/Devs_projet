import api from './api';

export const evaluationService = {
  getAll: (params = {}) => api.get('/evaluations', { params }),
  getById: (id) => api.get(`/evaluations/${id}`),
  create: (data) => api.post('/evaluations', data),
  update: (id, data) => api.put(`/evaluations/${id}`, data),
  delete: (id) => api.delete(`/evaluations/${id}`),
  getBySubmission: (submissionId) => api.get(`/submissions/${submissionId}/evaluation`),
  getByStudent: (studentId) => api.get(`/students/${studentId}/evaluations`),
  modify: (id, data) => api.patch(`/evaluations/${id}/modify`, data)
};

export default {
  evaluationService
};