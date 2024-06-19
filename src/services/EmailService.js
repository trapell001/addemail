import axios from 'axios';

const EMAIL_API_BASE_URL = 'http://66.23.232.230/api/email';

class EmailService {
  getEmail() {
    return axios.get(EMAIL_API_BASE_URL);
  }

  createEmployee(email) {
    return axios.post(EMAIL_API_BASE_URL, email);
  }

  updateEmail(emailId, email) {
    return axios.put(`${EMAIL_API_BASE_URL}/${emailId}`, email);
  }

  deleteEmail(emailId) {
    return axios.delete(`${EMAIL_API_BASE_URL}/${emailId}`);
  }
}

export default new EmailService();
