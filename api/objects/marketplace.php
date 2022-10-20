<?php
// 'user' object
class Marketplace {
 
    // database connection and table name
    private $conn;
    private $table_name = "marketplace";
 
    // object properties
    public $mp_id;
    public $mp_name;
    public $mp_description;
    public $mp_price;
    public $mp_image;
    public $mp_ownerID;
    public $mp_ownerName;
 
    // constructor
    public function __construct($db){
        $this->conn = $db;
    }

    // create new post
    function createPropertyListing(){
    
        // insert query
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    mp_ownerID = :mp_ownerID,
                    mp_ownerName = :mp_ownerName,
                    mp_name = :mp_name,
                    mp_description = :mp_description,
                    mp_price = :mp_price,
                    mp_location = :mp_location,
                    mp_image = :mp_image";

        // prepare the query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->mp_ownerID  = htmlspecialchars(strip_tags($this->mp_ownerID));
        $this->mp_ownerName  = htmlspecialchars(strip_tags($this->mp_ownerName));
        $this->mp_name     = htmlspecialchars(strip_tags($this->mp_name));
        $this->mp_description  = htmlspecialchars(strip_tags($this->mp_description));
        $this->mp_price  = htmlspecialchars(strip_tags($this->mp_price));
        $this->mp_location  = htmlspecialchars(strip_tags($this->mp_location));
        $this->mp_image  = htmlspecialchars(strip_tags($this->mp_image));
    
        // bind the values
        $stmt->bindParam(':mp_ownerID', $this->mp_ownerID);
        $stmt->bindParam(':mp_ownerName', $this->mp_ownerName);
        $stmt->bindParam(':mp_name', $this->mp_name);
        $stmt->bindParam(':mp_description', $this->mp_description);
        $stmt->bindParam(':mp_price', $this->mp_price);
        $stmt->bindParam(':mp_location', $this->mp_location);
        $stmt->bindParam(':mp_image', $this->mp_image);
    
        // execute the query, also check if query was successful
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    // read all posts
    function readAllPropertyListing() {
        $query = "SELECT * FROM marketplace ORDER BY mp_date DESC";
        // prepare the query
        $stmt = $this->conn->prepare($query);

        if ($stmt->execute()) {
            return $stmt;
        }
    }

    // read all posts
    function readSinglePropertyListing() {
        $query = "SELECT * FROM marketplace WHERE mp_id = :mp_id";
        // prepare the query

        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(':mp_id', $this->mp_id);

        if ($stmt->execute()) {
            return $stmt;
        }
    }

    function countComments($postid) {
        $query = "SELECT COUNT(comment_id) as total FROM comments WHERE comment_postID = :comment_postID";

        // prepare the query
        $stmt = $this->conn->prepare($query);
    
        // unique ID of record to be edited
        $stmt->bindParam(':comment_postID', $postid);
    
        // execute the query
        if($stmt->execute()){
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            return $row['total'];
        }
    
        return false;
    }

    function likePost() {
        $query = "UPDATE " . $this->table_name . " SET post_totalLikes = post_totalLikes+1 WHERE post_id = :post_id";
        // prepare the query
        $stmt = $this->conn->prepare($query);
    
        // unique ID of record to be edited
        $stmt->bindParam(':post_id', $this->post_id);
    
        // execute the query
        if($stmt->execute()){
            return true;
        }
    
        return false;

    }

    function deletePost() {
        $query = "DELETE FROM " . $this->table_name . " WHERE post_id = :post_id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':post_id', $this->post_id);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }


    function updatePost() {
        $query = "UPDATE " . $this->table_name . " SET post_content = :post_content WHERE post_id = :post_id";
        // prepare the query
        $stmt = $this->conn->prepare($query);
    
        // unique ID of record to be edited
        $stmt->bindParam(':post_content', $this->post_content);
        $stmt->bindParam(':post_id', $this->post_id);
    
        // execute the query
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }
    
}