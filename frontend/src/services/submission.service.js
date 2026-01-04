import api from './api';

const submissionService = {
  // Soumet un travail
  async submit(submissionData) {
    const response = await api.post('/submissions', submissionData);
    return response.data;
  },

  // Upload un fichier (avec FormData)
  async uploadFile(file, assignmentId) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('assignmentId', assignmentId);
    
    const response = await api.post('/submissions/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Récupère les soumissions d'un travail
  async getByWork(workId) {
    const response = await api.get(`/works/${workId}/submissions`);
    return response.data;
  },

  // Récupère les soumissions d'un étudiant
  async getByStudent(studentId) {
    const response = await api.get(`/students/${studentId}/submissions`);
    return response.data;
  },
};

export default submissionService;