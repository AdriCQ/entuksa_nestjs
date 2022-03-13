/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * IImage
 */
export namespace IImage {
  /**
   * Type
   */
  type Type = 'OFFER' | 'STORE' | 'USER';
  interface Uploaded {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: 'image/jpeg' | 'image/png';
    destination: string;
    filename: string;
    path: string;
    size: number;
  }
}