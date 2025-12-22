import api from './api';

export const groupService = {
  getAll: (params = {}) => api.get('/groups', { params }),
  getById: (id) => api.get(`/groups/${id}`),
  create: (data) => api.post('/groups', data),
  update: (id, data) => api.put(`/groups/${id}`, data),
  delete: (id) => api.delete(`/groups/${id}`),
  addMember: (id, studentId) => api.post(`/groups/${id}/members`, { studentId }),
  removeMember: (id, studentId) => api.delete(`/groups/${id}/members/${studentId}`),
  getByWork: (workId) => api.get(`/works/${workId}/groups`)
};

export default {
  groupService,
  }