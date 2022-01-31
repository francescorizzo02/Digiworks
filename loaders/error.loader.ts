import errorDictionary from "../globals/error.dictionary";

export default class Henry extends Error {
  public code: string;
  public error: string;
  public status: number;
  public description: string;
  public isOperational: boolean;

  constructor(code: string, errorData?: string, isOperational = true) {
    try {
      //declaration spot
      let error = errorDictionary(code, errorData);
      //calling error contractor
      super();
      Object.setPrototypeOf(this, new.target.prototype);
      //inizialaicing
      this.status = error.status;
      this.code = code;
      this.error = this._setErrorFromStatusCode(this.status);
      this.description = error.description;
      this.isOperational = isOperational;
      //Create the stackTrace on Henry object
      Error.captureStackTrace(this);
    } catch (error) {
      throw error;
    }
  }
  private _setErrorFromStatusCode(status: number) {
    switch (status) {
      case 400:
        return "Bad request";
      case 401:
        return "UnatHorized";
      case 404:
        return "Not found";
      case 405:
        return "Method not allowed";
      case 500:
        return "Internal server error";

      default:
        return "Undefined error";
    }
  }
}
