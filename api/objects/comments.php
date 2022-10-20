<?php
// 'user' object
class Comments {
 
    // database connection and table name
    private $conn;
    private $table_name = "comments";
 
    // object properties
    public $comment_id;
    public $comment_postID;
    public $comment_userID;
    public $comment_userName;
    public $comment_content;
    public $comment_date;
    public $comment_totalLikes;
 
    // constructor
    public function __construct($db){
        $this->conn = $db;
    }

    // create new post
    function create(){
    
        // insert query
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    comment_postID = :postID,
                    comment_userID = :userID,
                    comment_userName = :userName,
                    comment_content = :content,
                    comment_totalLikes = 0";

        // prepare the query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->comment_postID     = htmlspecialchars(strip_tags($this->comment_postID));
        $this->comment_userID  = htmlspecialchars(strip_tags($this->comment_userID));
        $this->comment_userName  = htmlspecialchars(strip_tags($this->comment_userName));
        $this->comment_content  = htmlspecialchars(strip_tags($this->comment_content));
        
    
        // bind the values
        $stmt->bindParam(':postID', $this->comment_postID);
        $stmt->bindParam(':userID', $this->comment_userID);
        $stmt->bindParam(':userName', $this->comment_userName);
        $stmt->bindParam(':content', $this->comment_content);
        
        // execute the query, also check if query was successful
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    // read all posts
    function readAll() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE comment_postID = :postID ORDER BY comment_id DESC";
        // prepare the query
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':postID', $this->comment_postID);

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

    function likeComment() {
        $query = "UPDATE " . $this->table_name . " SET comment_totalLikes = comment_totalLikes+1 WHERE comment_id = :comment_id";
        // prepare the query
        $stmt = $this->conn->prepare($query);
    
        // unique ID of record to be edited
        $stmt->bindParam(':comment_id', $this->comment_id);
    
        // execute the query
        if($stmt->execute()){
            return true;
        }
    
        return false;

    }
    
}