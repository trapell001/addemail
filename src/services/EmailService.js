import axios from "axios";

const EMAIL_URL = "http://66.23.232.230/api/email";

class EmailService {
  getEmail() {
    return axios.get(EMAIL_URL);
  }

  createEmployee(employee) {
    return axios.post(EMAIL_URL, employee);
  }

  getEmployeeById(employeeId) {
    return axios.get(EMAIL_URL + "/" + employeeId);
  }

  updateEmail(employee, employeeId) {
    return axios.put(EMAIL_URL + "/" + employeeId, employee);
  }

  deleteEmployee(employeeId) {
    return axios.delete(EMAIL_URL + "/" + employeeId);
  }
  // _______________NOTI _________
}


export default new EmailService();
