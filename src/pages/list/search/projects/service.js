import request from '@/utils/request';
export async function queryListProduct(params) {
  return request('http://localhost:5555/productions', {
    params,
  });
}
export async function addProduct(params) {
  return request('http://localhost:5555/productions', {
    method: 'POST',
    data: params,
  });
}
export async function updateProduct(id, params) {
  return request(`http://localhost:5555/productions/${id}`, {
    method: 'PUT',
    data: params,
  });
}
export async function deleteProduct(id) {
  console.log('day la id o servee :', id);
  return request(`http://localhost:5555/productions/${id}`, {
    method: 'DELETE',
  });
}
