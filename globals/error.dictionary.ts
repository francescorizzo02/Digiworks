export default (code: string, errorData: string = "") => {
  let error: errorInterface = {
    "000": {
      status: 500,
      description: `Unexpected Exception ${errorData}`,
    },
    "001": {
      status: 400,
      description: `Unexpected error ${errorData}`,
    },
    "100": {
      status: 400,
      description: "generic api error",
    },
    "101": {
      status: 405,
      description: "Requested http is not supported",
    },
    "200": {
      status: 400,
      description: "generic data error",
    },
    "201": {
      status: 400,
      description: `missing or invalid ${errorData}`,
    },
    "202": {
      status: 404,
      description: `${errorData} not found`,
    },
  };

  return error[code];
};

interface errorInterface {
  [key: string]: { status: number; description: string };
}
