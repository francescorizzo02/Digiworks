export default (code: string, errorData: string = "") => {
  let error: errorInterface = {
    "000": {
      status: 500,
      description: `Unexpected Exception ${errorData}`
    }
  };
  
  return error[code];

};

interface errorInterface {
  [key: string]: { status: number; description: string };
}


