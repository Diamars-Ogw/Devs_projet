import api from './api';

export const spaceService = {
  getAll: (params = {}) => api.get('/spaces', { params }),
  getById: (id) => api.get(`/spaces/${id}`),
  create: (data) => api.post('/spaces', data),
  update: (id, data) => api.put(`/spaces/${id}`, data),
  delete: (id) => api.delete(`/spaces/${id}`),
  enrollStudents: (id, studentIds) => api.post(`/spaces/${id}/enroll`, { studentIds }),
  unenrollStudent: (id, studentId) => api.delete(`/spaces/${id}/students/${studentId}`),
  getEnrolledStudents: (id) => api.get(`/spaces/${id}/students`),
  addSecondaryTrainer: (id, trainerId) => api.post(`/spaces/${id}/trainers`, { trainerId }),
  removeSecondaryTrainer: (id, trainerId) => api.delete(`/spaces/${id}/trainers/${trainerId}`)
};

export default spaceService;