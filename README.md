Headers use:

'x-no-compression' : with this header, response not be compressed

/auth
Method: POST
use x-www-form-urlencoded or raw/json with content-type : application/json to authenticate
require field: login, password

/register
Method: POST
use x-www-form-urlencoded or raw/json with content-type : application/json to register
require field: login, password, email

/api/testdata
Method: GET - get all testdata
Accept: application/xml to get back response in xml format
Accept: text/html;json to get back response in json format


Method: POST - save new testdata
require field: name, description

/api/testdata/:id
Method: GET - get testdata by id
Method: DELETE - delete testdata by id
Mehod: PUT  - update testdata by id

/api/users
Method: GET  - get all users
Need Authorization header with 'Bearer token0'

/info
Method: GET - return request header

/info/setcookie
Method: GET - set name cookie

/info/getcookie
Method: GET - return cookie

