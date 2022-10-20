<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// files needed to connect to database
include_once '../config/database.php';
include_once '../objects/admin.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// instantiate user object
$admin = new Admin($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set product property values
$admin->ann_name = $data->ann_name;
$admin->ann_date = $data->ann_date;
$admin->ann_time = $data->ann_time;
$admin->ann_description = $data->ann_description;
$admin->ann_address = $data->ann_address;

// generate json web token
include_once '../config/core.php';
include_once '../libs/php-jwt-master/src/BeforeValidException.php';
include_once '../libs/php-jwt-master/src/ExpiredException.php';
include_once '../libs/php-jwt-master/src/SignatureInvalidException.php';
include_once '../libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;

//get jwt
$jwt=isset($data->jwt) ? $data->jwt : "";
 
// check if email exists and if password is correct
if($jwt){

    try {
        
        if (!empty($admin->ann_name) && !empty($admin->ann_date) && !empty($admin->ann_time) && !empty($admin->ann_description) && !empty($admin->ann_address) && $admin->addAnnouncement()) 
        {
            // set response code
            http_response_code(200);
        
            // display message: job was created
            // echo json_encode(array("message" => "Job created successfully"));
            echo json_encode(array("message" => "Event/Announcement Added!"));
        
        } else {
            // set response code
            http_response_code(400);
        
            // display message: unable to create user
            echo json_encode(array("message" => "Unable to add announcement. Please try again later."));
        }

    } catch (Exception $e){
    
        // set response code
        http_response_code(401);
    
        // tell the user access denied  & show error message
        echo json_encode(array(
            "message" => "Access denied.",
            "error" => $e->getMessage()
        ));
    }
    
} else {
 
    // set response code
    http_response_code(401);
 
    // tell the user login failed
    echo json_encode(array("message" => "You are not logged in."));
}
?>