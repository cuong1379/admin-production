import request from '@/utils/request';
export async function accountLogin(username, password) {
  return request('http://localhost:5555/users/login', {
    method: 'POST',
    data: { username, password },
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
