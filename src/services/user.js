import request from '@/utils/request';
export async function query() {
  return request('/api/users');
}
export async function queryMe(token) {
  return request(`http://localhost:5555/productions?page=1`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export async function queryNotices() {
  return request('/api/notices');
}
