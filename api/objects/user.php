<?php
// 'user' object
class User{
 
    // database connection and table name
    private $conn;
    private $table_name = "users";
    private $company_info = "company_info";
    private $memberCode_table = "member_code";
 
    // object properties
    public $id;
    public $user_id;
    public $firstname;
    public $lastname;
    public $email;
    public $password;
    public $phone;
    public $address_2;
    public $zip_code_1;
    public $zip_code_2;
    public $website;
    public $fax;
    public $role;
    public $profile_img;

    // password reset
    public $userEmail;
    public $selector;
    public $validator;

    // memberCode
    public $user_role = "Affiliate";
    public $member_code;

    // account requests
    public $message;
 
    // constructor
    public function __construct($db){
        $this->conn = $db;
    }

    // read all users
    function readAllUsers() {
        $query = "SELECT users.id as id, users.name as name, users.email as email, company_info.company_name as companyName, users.status as status FROM users LEFT JOIN company_info ON users.id = company_info.user_id";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        if ($stmt->execute()) {
            return $stmt;
        }
    }

    function readActiveUsers() {
        $query = "SELECT users.id as id, users.name as name, users.email as email, company_info.company_name as companyName FROM users LEFT JOIN company_info ON users.id = company_info.user_id WHERE users.status = 0 AND users.role != 'admin'";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        if ($stmt->execute()) {
            return $stmt;
        }
    }

    function readSingleActiveUser() {
        $query = "SELECT users.id as id, users.name as name, users.email as email, company_info.company_name as companyName, company_info.address_1 as address, company_info.phone_number as phone, company_info.telephone_number as telephone, company_info.website as website FROM users LEFT JOIN company_info ON users.id = company_info.user_id WHERE users.status = 0 AND users.id = :job_client_id";

        // prepare the query
        $stmt = $this->conn->prepare($query);
        $this->id  = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':job_client_id', $this->id);

        if ($stmt->execute()) {
            return $stmt;
        }
    }

    function verifyUserRole() {
        $query = "SELECT * FROM users WHERE id = :id AND role != 'Affiliate' AND role != 'Homeowner'";

        // prepare the query
        $stmt = $this->conn->prepare($query);
        $this->id  = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()) {
            return $stmt;
        }
    }

    function getUserEmail() {
        $query = "SELECT email FROM users WHERE id = :id";

        // prepare the query
        $stmt = $this->conn->prepare($query);
        $this->id  = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()) {
            return $stmt;
        }
    }

    function readInactiveUsers() {
        $query = "SELECT users.id as id, users.name as name, users.email as email, company_info.company_name as companyName FROM users LEFT JOIN company_info ON users.id = company_info.user_id WHERE users.status = 1";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        if ($stmt->execute()) {
            return $stmt;
        }
    }
 
    // create new user record
    function create(){
    
        // insert query
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    email = :email,
                    password = :password,
                    role = :user_role,
                    profile_img = :profile_img,
                    status = 0";

        // prepare the query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->email     = htmlspecialchars(strip_tags($this->email));
        $this->password  = htmlspecialchars(strip_tags($this->password));
        $this->profile_img = htmlspecialchars(strip_tags($this->profile_img));
        $this->user_role = htmlspecialchars(strip_tags($this->user_role));
        
        // bind the values
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':profile_img', $this->profile_img);
        $stmt->bindParam(':user_role', $this->user_role);
        
        // hash the password before saving to database
        $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
        $stmt->bindParam(':password', $password_hash);
    
        // execute the query, also check if query was successful
        if($stmt->execute()){
            $this->user_id = $this->conn->lastInsertId();

            $query2 = "INSERT INTO company_info " . "
                SET
                    user_id = :user_id,
                    firstname = :firstname,
                    lastname = :lastname,
                    email = :email,
                    phone = :phone";
            
            // prepare query
            $stmt2 = $this->conn->prepare($query2);

            // sanitize
            $this->user_id      = htmlspecialchars(strip_tags($this->user_id));
            $this->firstname     = htmlspecialchars(strip_tags($this->firstname));
            $this->lastname  = htmlspecialchars(strip_tags($this->lastname));
            $this->email      = htmlspecialchars(strip_tags($this->email));
            $this->phone     = htmlspecialchars(strip_tags($this->phone));
        
            // bind the values
            $stmt2->bindParam(':user_id', $this->user_id);
            $stmt2->bindParam(':firstname', $this->firstname);
            $stmt2->bindParam(':lastname', $this->lastname);
            $stmt2->bindParam(':email', $this->email);
            $stmt2->bindParam(':phone', $this->phone);

            if ($stmt2->execute()) {
                return true;
            }
        }
    
        return false;
    }


    // approve user
    public function approveUser(){
    
        // if no posted password, do not update the password
        $query = "UPDATE " . $this->table_name . "
                SET
                    status = 0
                WHERE id = :id";
    
        // prepare the query
        $stmt = $this->conn->prepare($query);
    
        // unique ID of record to be edited
        $stmt->bindParam(':id', $this->id);
    
        // execute the query
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }
    
    // check if given email exist in the database
    function emailExists(){
    
        // query to check if email exists
        $query = "SELECT id, password, role, profile_img
                FROM " . $this->table_name . "
                WHERE email = ?
                LIMIT 0,1";
    
        // prepare the query
        $stmt = $this->conn->prepare( $query );
    
        // sanitize
        $this->email=htmlspecialchars(strip_tags($this->email));
    
        // bind given email value
        $stmt->bindParam(1, $this->email);
    
        // execute the query
        $stmt->execute();
    
        // get number of rows
        $num = $stmt->rowCount();
    
        // if email exists, assign values to object properties for easy access and use for php sessions
        if($num>0){
    
            // get record details / values
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // assign values to object properties
            $this->id = $row['id'];
            $this->password = $row['password'];
            $this->role = $row['role'];
            $this->profile_img = $row['profile_img'];

            $queryCompanyInfo = "SELECT firstname, lastname, phone FROM " . $this->company_info . " WHERE user_id = " . $this->id . '';
            $stmt2 = $this->conn->prepare( $queryCompanyInfo );
            $stmt2->execute();
    
            // get number of rows
            $num2 = $stmt2->rowCount();
            if($num2>0){
    
                // get record details / values
                $row2 = $stmt2->fetch(PDO::FETCH_ASSOC);
                $this->firstname = $row2['firstname'];
                $this->lastname = $row2['lastname'];
                $this->phone = $row2['phone'];

                // return true because email exists in the database
                return true;
            }
            
        }
    
        // return false if email does not exist in the database
        return false;
    }


    // check if given email exist in the database
    function checkStatus(){
    
        // query to check if email exists
        $query = "SELECT status
                FROM " . $this->table_name . "
                WHERE email = ?
                LIMIT 0,1";
    
        // prepare the query
        $stmt = $this->conn->prepare( $query );
    
        // sanitize
        $this->email=htmlspecialchars(strip_tags($this->email));
    
        // bind given email value
        $stmt->bindParam(1, $this->email);
    
        // execute the query
        $stmt->execute();
    
        // get number of rows
        $num = $stmt->rowCount();
    
        // if email exists, assign values to object properties for easy access and use for php sessions
        if($num>0){
    
            // get record details / values
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($row['status'] == 1) {
                return false;
            } else {
                return true;
            }
        }
    
        // return false if email does not exist in the database
        return false;
    }
    
    // update a user record
    public function update(){
    
        // if password needs to be updated
        $password_set=!empty($this->password) ? "password = :password" : "";
    
        // if no posted password, do not update the password
        $query = "UPDATE " . $this->table_name . "
                SET
                    name = :name,
                    email = :email,
                    {$password_set}
                WHERE id = :id";
    
        // prepare the query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->email = htmlspecialchars(strip_tags($this->email));
    
        // bind the values from the form
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':email', $this->email);
    
        // hash the password before saving to database
        if(!empty($this->password)){
            $this->password=htmlspecialchars(strip_tags($this->password));
            $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
            $stmt->bindParam(':password', $password_hash);
        }
    
        // unique ID of record to be edited
        $stmt->bindParam(':id', $this->id);
    
        // execute the query
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }


    public function checkEmail() {
        // query to check if email exists
        $query = "SELECT id, password, role
                FROM " . $this->table_name . "
                WHERE email = ?
                LIMIT 0,1";
    
        // prepare the query
        $stmt = $this->conn->prepare( $query );
    
        // sanitize
        $this->userEmail=htmlspecialchars(strip_tags($this->userEmail));
    
        // bind given email value
        $stmt->bindParam(1, $this->userEmail);
    
        // execute the query
        $stmt->execute();
    
        // get number of rows
        $num = $stmt->rowCount();
    
        // if email exists, assign values to object properties for easy access and use for php sessions
        if($num>0){
            return true;
        }
    
        // return false if email does not exist in the database
        return false;
    }

    public function requestAccount() {
        $sql = "INSERT INTO account_requests (email, message) VALUES (?, ?);";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(1, $this->userEmail);
        $stmt->bindParam(2, $this->message);

        // execute the query
        if(!$stmt->execute()){
            return false;
        }

        $to = $this->userEmail;

        $subject = 'We Received Your Request!';

        $message = '<p>We have received your request for an account. Our team will review your request and will update you within 24 hours of receiving this email.</p>';
        $message .= '<p>Thank you so much and have a nice day!<br>';

        $headers = "From: CCMPOA <no-reply@ccmpoa.org>\r\n";
        $headers .= "Content-type: text/html\r\n";

        mail($to, $subject, $message, $headers);

        $to = "cpelitones@ad-voca.com";

        $subject = 'Someone Requested An Account';

        $message = '<p>Someone sent a new account request. Please review their message and their email.</p>';
        $message .= '<p>You can go to <a href="https://ccmpoa.org/admin/">your admin portal</a> to approve the request.</p><br>';
        $message .= '<p>Email: <b>'. $this->userEmail .'</b> </p><br>';
        $message .= '<p>Message: <b>'. $this->message .'</b> </p><br>';

        $headers = "From: CCMPOA <no-reply@ccmpoa.org>\r\n";
        $headers .= "Content-type: text/html\r\n";

        mail($to, $subject, $message, $headers);

        return true;
    }


    public function resetRequest() {

        $selector = bin2hex(random_bytes(8));
        $token = random_bytes(32);

        $url = "https://ccmpoa.org/create-new-password.html?selector=" . $selector . "&validator=" . bin2hex($token);

        $expires = date("U") + 1800;

        $sql = "DELETE FROM pwdreset WHERE pwdResetEmail=?";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(1, $this->userEmail);

        // execute the query
        if(!$stmt->execute()){
            return false;
        }

        $sql = "INSERT INTO pwdreset (pwdResetEmail, pwdResetSelector, pwdResetToken, pwdResetExpires) VALUES (?, ?, ?, ?);";
        $stmt = $this->conn->prepare($sql);

        $hashedToken = password_hash($token, PASSWORD_DEFAULT);

        $stmt->bindParam(1, $this->userEmail);
        $stmt->bindParam(2, $selector);
        $stmt->bindParam(3, $hashedToken);
        $stmt->bindParam(4, $expires);

        // execute the query
        if(!$stmt->execute()){
            return false;
        }

        $to = $this->userEmail;

        $subject = 'Reset your password';

        $message = '<p>We received a password reset request. The link to reset your password is below. If you did not make this request, please contact us immediately.</p>';
        $message .= '<p>Here is your password reset link: <br>';
        $message .= '<a href="'. $url .'">'. $url .'</a></p>';

        $headers = "From: CCMPOA <no-reply@ccmpoa.org>\r\n";
        $headers .= "Content-type: text/html\r\n";

        mail($to, $subject, $message, $headers);

        return true;

    }

    public function resetPassword() {
        $currentDate = date("U");

        $sql = "SELECT * FROM pwdreset WHERE pwdResetSelector=? AND pwdResetExpires >= ?";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(1, $this->selector);
        $stmt->bindParam(2, $currentDate);

        if (!$stmt->execute()) {
            return false;
        }

        // get number of rows
        $num = $stmt->rowCount();

        if ($num < 0) {
            return false;
        }

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $tokenBin = hex2bin($this->validator);
        $tokenCheck = password_verify($tokenBin, $row["pwdResetToken"]);

        if ($tokenCheck === false) {
            return false;
        } elseif ($tokenCheck === true) {
            $tokenEmail = $row['pwdResetEmail'];

            $sql = "SELECT * FROM users WHERE email=?";
            $stmt = $this->conn->prepare($sql);

            $stmt->bindParam(1, $tokenEmail);

            if (!$stmt->execute()) {
                return false;
            }

            $num = $stmt->rowCount();
            if ($num < 0) {
                return false;
            }

            $sql = "UPDATE users SET password=? WHERE email=?";
            $stmt = $this->conn->prepare($sql);

            $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
            $stmt->bindParam(1, $password_hash);
            $stmt->bindParam(2, $tokenEmail);

            if (!$stmt->execute()) {
                return false;
            }

            $sql = "DELETE FROM pwdreset WHERE pwdResetEmail=?";
            $stmt = $this->conn->prepare($sql);

            $stmt->bindParam(1, $tokenEmail);

            if (!$stmt->execute()) {
                return false;
            }

            return true;

        }

    }

    public function addMemberCode() {
        // insert query
        $query = "INSERT INTO " . $this->memberCode_table . "
                SET
                    user_role = :user_role,
                    member_code = :member_code,
                    status = 0";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->user_role = htmlspecialchars(strip_tags($this->user_role));
        $this->member_code = htmlspecialchars(strip_tags($this->member_code));
    
        // bind the values from the form
        $stmt->bindParam(':user_role', $this->user_role);
        $stmt->bindParam(':member_code', $this->member_code);

        // execute the query
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    public function readAllActiveMemberCode() {
        $query = "SELECT * FROM member_code WHERE status = 0";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        if ($stmt->execute()) {
            return $stmt;
        }

        return false;
    }

    public function readUsedMemberCodeTable() {
        $query = "SELECT * FROM member_code WHERE status = 1";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        if ($stmt->execute()) {
            return $stmt;
        }

        return false;
    }

    public function checkMemberCode() {
        $query = "SELECT * FROM member_code WHERE status = 0 AND member_code = :member_code";

        $stmt = $this->conn->prepare($query);
        
        $this->member_code = htmlspecialchars(strip_tags($this->member_code));
    
        // bind the values from the form
        $stmt->bindParam(':member_code', $this->member_code);

        $stmt->execute();
    
        // get number of rows
        $num = $stmt->rowCount();

        if ($num > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->user_role = $row['user_role'];
            return true;
        }

        return false;
    }

    public function useMemberCode() {
        // if no posted password, do not update the password
        $query = "UPDATE " . $this->memberCode_table . "
                SET
                    user_name = :user_name,
                    user_email = :user_email,
                    status = 1
                WHERE member_code = :member_code";
    
        // prepare the query
        $stmt = $this->conn->prepare($query);
        $fullname = $this->firstname . " " . $this->lastname;
        // unique ID of record to be edited
        $stmt->bindParam(':member_code', $this->member_code);
        $stmt->bindParam(':user_name', $fullname);
        $stmt->bindParam(':user_email', $this->email);

        // execute the query
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

}