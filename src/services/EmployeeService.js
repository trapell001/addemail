import axios from "axios";

const EMAIL_URL = "http://66.23.232.230/api/email";

class EmployeeService {
  getEmployees() {
    return axios.get(EMAIL_URL);
  }

  createEmployee(employee) {
    return axios.post(EMAIL_URL, employee);
  }

  getEmployeeById(employeeId) {
    return axios.get(EMAIL_URL + "/" + employeeId);
  }

  updateEmployee(employee, employeeId) {
    return axios.put(EMAIL_URL + "/" + employeeId, employee);
  }

  deleteEmployee(employeeId) {
    return axios.delete(EMAIL_URL + "/" + employeeId);
  }
}

export default new EmployeeService();
