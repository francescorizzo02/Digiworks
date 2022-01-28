import errorDictionary from "../globals/error.dictionary";

export default class Henry extends Error {
  public _code: string;
  public _error: string;
  public _status: number;
  public _description: string;
  public _isOperational: boolean;

  constructor(code: string, errorData?: string, isOperational = true) {
    try {
      //declaration spot
      let error = errorDictionary(code, errorData);
      //calling error contractor
      super();
      Object.setPrototypeOf(this, new.target.prototype);
      //inizialaicing
      this._status = error.status;
      this._code = code;
      this._error = this._setErrorFromStatusCode();
      this._description = error.description;
      this._isOperational = isOperational;
      //Create the stackTrace on Henry object
      Error.captureStackTrace(this);
    } catch (error) {
      throw error;
    }
  }
  private _setErrorFromStatusCode() {
    switch (this._status) {
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
