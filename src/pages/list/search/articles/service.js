import request from '@/utils/request';
export async function queryListCustomer(params) {
  return request('http://localhost:5555/customers?page=1&limit=12', {
    params,
  });
}
export async function addCustomer(params) {
  return request('http://localhost:5555/customers', {
    method: 'POST',
    data: params,
  });
}
export async function updateCustomer(id, params) {
  return request(`http://localhost:5555/customers/${id}`, {
    method: 'PUT',
    data: params,
  });
}
export async function deleteCustomer(id) {
  return request(`http://localhost:5555/customers/${id}`, {
    method: 'DELETE',
  });
}
