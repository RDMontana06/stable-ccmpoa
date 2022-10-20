<?php
    // required headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    // required to encode json web token
    include_once '../config/core.php';
    include_once '../libs/php-jwt-master/src/BeforeValidException.php';
    include_once '../libs/php-jwt-master/src/ExpiredException.php';
    include_once '../libs/php-jwt-master/src/SignatureInvalidException.php';
    include_once '../libs/php-jwt-master/src/JWT.php';
    use \Firebase\JWT\JWT;
    
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
    $marketplace->mp_id = $data->mp_id;
    // get jwt
    $jwt=isset($data->jwt) ? $data->jwt : "";
    
    // if jwt is not empty
    if($jwt){
    
        // if decode succeed, show user details
        try {
    
            // decode jwt
            $decoded = JWT::decode($jwt, $key, array('HS256'));


            $stmt = $marketplace->readSinglePropertyListing();
            $marketplace_arr = array();

            $marketplace_arr["marketplace"] = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $marketplace_item = array(
                    "mp_id" =>  $row['mp_id'],
                    "mp_ownerID" => $row['mp_ownerID'],
                    "mp_ownerName" =>  $row['mp_ownerName'],
                    "mp_name" =>  $row['mp_name'],
                    "mp_description" =>  $row['mp_description'],
                    "mp_price" =>  $row['mp_price'],
                    "mp_location" =>  $row['mp_location'],
                    "mp_image" =>  $row['mp_image'],
                    "mp_date" =>  $row['mp_date']
                );
        
                array_push($marketplace_arr["marketplace"], $marketplace_item);
            }

            // set response code
            http_response_code(200);
                
            // show jobs data in json format
            echo json_encode($marketplace_arr);

        } catch (Exception $e){
        
            // set response code
            http_response_code(401);
        
            // show error message
            echo json_encode(array(
                "message" => "Access denied.",
                "error" => $e->getMessage()
            ));
        }
    } else {
    
        // set response code
        http_response_code(401);
    
        // tell the user access denied
        echo json_encode(array("message" => "Access denied."));
    }
?>