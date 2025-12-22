import api from './api';

export const submissionService = {
  getAll: (params = {}) => api.get('/submissions', { params }),
  getById: (id) => api.get(`/submissions/${id}`),
  create: (data) => api.post('/submissions', data),
  update: (id, data) => api.put(`/submissions/${id}`, data),
  delete: (id) => api.delete(`/submissions/${id}`),
  getByAssignment: (assignmentId) => api.get(`/assignments/${assignmentId}/submissions`),
  getByStudent: (studentId) => api.get(`/students/${studentId}/submissions`),
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/uploads', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
};

export default submissionService;