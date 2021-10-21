import { extname } from "path";
import * as fs from 'fs';

export class ImagesHelper {
  private static _dir = './storage/app/images'
  static createDir() {
    if (!fs.existsSync(this._dir)) {
      fs.mkdirSync(this._dir, { recursive: true });
    }
  }
  /**
   * Edits file name
   * @param req 
   * @param file 
   * @param callback 
   */
  static editFileName(req, file, callback) {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(8)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
  }
  /**
   * Gets path
   * @returns  
   */
  static getPath() {
    return this._dir;
  }
  /**
   * Images file filter
   * @param req 
   * @param file 
   * @param callback 
   * @returns  
   */
  static onlyImagesFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  }
}