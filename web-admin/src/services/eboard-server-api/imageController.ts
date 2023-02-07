// @ts-ignore
/* eslint-disable */
import request from '@/plugins/globalRequest';

/** uploadPicture GET /api/upload/uploadPic */
export async function uploadPictureUsingGET(options?: { [key: string]: any }) {
  return request<string>('/api/upload/uploadPic', {
    method: 'GET',
    ...(options || {}),
  });
}

/** uploadPicture POST /api/upload/uploadPic */
export async function uploadPictureUsingPOST(options?: { [key: string]: any }) {
  return request<string>('/api/upload/uploadPic', {
    method: 'POST',
    ...(options || {}),
  });
}
