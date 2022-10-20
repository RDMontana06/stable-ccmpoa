<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// files needed to connect to database
include_once '../config/database.php';
include_once '../objects/user.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// instantiate user object
$user = new User($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set product property values
$user->userEmail = $data->email;
 
// check if email exists and if password is correct
if ($user->checkEmail()){
    if($user->resetRequest()){
 
        // set response code
        http_response_code(200);
     
        // tell the user login failed
        echo json_encode(array("message" => "Success"));
     
    } else {
     
        // set response code
        http_response_code(401);
     
        // tell the user login failed
        echo json_encode(array("message" => "Something went wrong. Please try again later."));
    }
} else {
    // set response code
    http_response_code(401);
     
    // tell the user login failed
    echo json_encode(array("message" => "Your email does not exist. Please try another email!"));
}
?>