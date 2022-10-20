<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// files needed to connect to database
include_once '../config/database.php';
include_once '../objects/marketplace.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// instantiate user object
$marketplace = new Marketplace($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set product property values
$marketplace->mp_name = $data->mp_name;
$marketplace->mp_description = $data->mp_description;
$marketplace->mp_price = $data->mp_price;
$marketplace->mp_location = $data->mp_location;
$marketplace->mp_image = $data->mp_image;

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
        $decoded = JWT::decode($jwt, $key, array('HS256'));
        $json = json_encode($decoded);
        $marketplace->mp_ownerID = json_decode($json)->data->id;
        $marketplace->mp_ownerName = json_decode($json)->data->firstname . ' ' . json_decode($json)->data->lastname;
        
        if (!empty($marketplace->mp_name) && !empty($marketplace->mp_description) && !empty($marketplace->mp_price) && !empty($marketplace->mp_image) && !empty($marketplace->mp_location) && $marketplace->createPropertyListing()) 
        {
            // set response code
            http_response_code(200);
        
            // display message: job was created
            // echo json_encode(array("message" => "Job created successfully"));
            echo json_encode(array("message" => "Posted!"));
        
        } else {
            // set response code
            http_response_code(400);
        
            // display message: unable to create user
            echo json_encode(array("message" => "Unable to create post."));
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