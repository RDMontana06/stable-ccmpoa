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
    include_once '../objects/admin.php';
    
    // get database connection
    $database = new Database();
    $db = $database->getConnection();
    
    // instantiate user object
    $admin = new Admin($db);
    
    // get posted data
    $data = json_decode(file_get_contents("php://input"));
    
    // get jwt
    $jwt=isset($data->jwt) ? $data->jwt : "";
    
    // if jwt is not empty
    if($jwt){
    
        // if decode succeed, show user details
        try {
    
            // decode jwt
            $decoded = JWT::decode($jwt, $key, array('HS256'));


            $stmt = $admin->readAllAnnouncement();
            $announcement_arr = array();

            $announcement_arr["announcements"] = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $announcement_item = array(
                    "ann_id" =>  $row['ann_id'],
                    "ann_name" => $row['ann_name'],
                    "ann_date" =>  $row['ann_date'],
                    "ann_time" =>  $row['ann_time'],
                    "ann_description" =>  $row['ann_description'],
                    "ann_address" =>  $row['ann_address']
                );
        
                array_push($announcement_arr["announcements"], $announcement_item);
            }

            // set response code
            http_response_code(200);
                
            // show jobs data in json format
            echo json_encode($announcement_arr);

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