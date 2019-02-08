
const respondJSON = (request, response, status, object, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(JSON.stringify(object));
  response.end();
};

const XML = (responseJSON) => {
  let responseXML = '<response>';
  responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
  responseXML = `${responseXML} </response>`;
  return responseXML;
};


const typechec = (request, response, number, type, responseJSON) => {
  if (type[0] === 'text/xml') {
    return respondJSON(request, response, number, XML(responseJSON), type);
  }
  return respondJSON(request, response, number, responseJSON, type);
};
const success = (request, response, type) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  typechec(request, response, 401, responseJSON, type[0]);
};

const badRequest = (request, response, type) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  typechec(request, response, 400, responseJSON, type[0]);
  typechec(request, response, 200, responseJSON, type[0]);
};

const unauthorized = (request, response, type) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  typechec(request, response, 401, responseJSON, type[0]);
};
const internal = (request, response, type) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong',
    id: 'internalError',
  };
  typechec(request, response, 500, responseJSON, type[0]);
};

const forbidden = (request, response, type) => {
  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };
  typechec(request, response, 403, responseJSON, type[0]);
};

const notImplemented = (request, response, type) => {
  const responseJSON = {
    message: 'A get request for this page has not yet been implemented yet. Check again later for updated content',
    id: 'notImplemented',
  };

  typechec(request, response, 501, responseJSON, type[0]);
};

const notFound = (request, response, type) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  typechec(request, response, 404, responseJSON, type[0]);
};


module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
  typechec,
};
