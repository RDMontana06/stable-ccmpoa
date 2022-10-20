<?php
// 'user' object
class Posts {
 
    // database connection and table name
    private $conn;
    private $table_name = "posts";
 
    // object properties
    public $post_id;
    public $post_userID;
    public $post_userName;
    public $post_date;
    public $post_content;
    public $post_totalLikes;
    public $post_totalComments;

    public $post_imageName;
 
    // constructor
    public function __construct($db){
        $this->conn = $db;
    }

    // create new post
    function create(){
    
        // insert query
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    post_userID = :userID,
                    post_userName = :userName,
                    post_content = :content,
                    post_totalLikes = 0";

        // prepare the query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->post_userID     = htmlspecialchars(strip_tags($this->post_userID));
        $this->post_userName  = htmlspecialchars(strip_tags($this->post_userName));
        $this->post_content  = htmlspecialchars(strip_tags($this->post_content));
    
        // bind the values
        $stmt->bindParam(':userID', $this->post_userID);
        $stmt->bindParam(':userName', $this->post_userName);
        $stmt->bindParam(':content', $this->post_content);
    
        // execute the query, also check if query was successful
        if($stmt->execute()){
            $this->post_id = $this->conn->lastInsertId();

            $query = "INSERT INTO post_images SET post_id = :post_id, post_imageName = :post_imageName";
            
            // prepare the query
            $stmt = $this->conn->prepare($query);

            // sanitize
            $this->post_id     = htmlspecialchars(strip_tags($this->post_id));
            $this->post_imageName  = htmlspecialchars(strip_tags($this->post_imageName));
            
            // bind the values
            $stmt->bindParam(':post_id', $this->post_id);
            $stmt->bindParam(':post_imageName', $this->post_imageName);

            if ($stmt->execute()) {
                return true;
            }

        }
    
        return false;
    }

    // read all posts
    function readAll() {
        $query = "SELECT posts.post_id, posts.post_userID, posts.post_userName, posts.post_date, posts.post_content, posts.post_totalLikes, post_images.post_imageName FROM posts LEFT JOIN post_images ON posts.post_id = post_images.post_id ORDER BY post_id DESC";
        // prepare the query
        $stmt = $this->conn->prepare($query);

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