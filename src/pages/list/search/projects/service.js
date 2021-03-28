import request from '@/utils/request';
export async function queryListProduct(params) {
  return request('https://product-production-123.herokuapp.com/productions', {
    params,
  });
}
export async function addProduct(params) {
  return request('https://product-production-123.herokuapp.com/productions', {
    method: 'POST',
    data: params,
  });
}
export async function updateProduct(id, params) {
  return request(`https://product-production-123.herokuapp.com/productions/${id}`, {
    method: 'PUT',
    data: params,
  });
}
export async function deleteProduct(id) {
  console.log('day la id o servee :' , id)
  return request(`https://product-production-123.herokuapp.com/productions/${id}`, {
    method: 'DELETE'
  });
}

