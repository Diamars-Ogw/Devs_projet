import api from './api';

export const assignmentService = {
  getAll: (params = {}) => api.get('/assignments', { params }),
  assignIndividual: (workId, studentIds) => api.post('/assignments/individual', { workId, studentIds }),
  assignGroup: (workId, groupIds) => api.post('/assignments/group', { workId, groupIds }),
  remove: (id) => api.delete(`/assignments/${id}`),
  getByStudent: (studentId) => api.get(`/students/${studentId}/assignments`),
  getByWork: (workId) => api.get(`/works/${workId}/assignments`)
};

export default {
  assignmentService,
  }