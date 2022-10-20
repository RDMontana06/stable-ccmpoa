<?php
// 'user' object
class Admin{
 
    // database connection and table name
    private $conn;
    private $table_name = "announcement";
 
    // object properties
    public $ann_id;
    public $ann_name;
    public $ann_date;
    public $ann_time;
    public $ann_description;
    public $ann_address;

 
    // constructor
    public function __construct($db){
        $this->conn = $db;
    }

    public function addAnnouncement() {
        // insert query
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    ann_name = :ann_name,
                    ann_date = :ann_date,
                    ann_time = :ann_time,
                    ann_description = :ann_description,
                    ann_address = :ann_address";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->ann_name     = htmlspecialchars(strip_tags($this->ann_name));
        $this->ann_date  = htmlspecialchars(strip_tags($this->ann_date));
        $this->ann_time = htmlspecialchars(strip_tags($this->ann_time));
        $this->ann_description = htmlspecialchars(strip_tags($this->ann_description));
        $this->ann_address = htmlspecialchars(strip_tags($this->ann_address));
        
        // bind the values
        $stmt->bindParam(':ann_name', $this->ann_name);
        $stmt->bindParam(':ann_date', $this->ann_date);
        $stmt->bindParam(':ann_time', $this->ann_time);
        $stmt->bindParam(':ann_description', $this->ann_description);
        $stmt->bindParam(':ann_address', $this->ann_address);

        if($stmt->execute()){
            return true;
        }

        return false;
    }

    public function updateAnnouncement() {
        // insert query
        $query = "UPDATE " . $this->table_name . "
                SET
                    ann_name = :ann_name,
                    ann_date = :ann_date,
                    ann_time = :ann_time,
                    ann_description = :ann_description,
                    ann_address = :ann_address
                WHERE ann_id = :ann_id";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->ann_name     = htmlspecialchars(strip_tags($this->ann_name));
        $this->ann_date  = htmlspecialchars(strip_tags($this->ann_date));
        $this->ann_time = htmlspecialchars(strip_tags($this->ann_time));
        $this->ann_description = htmlspecialchars(strip_tags($this->ann_description));
        $this->ann_address = htmlspecialchars(strip_tags($this->ann_address));
        $this->ann_id = htmlspecialchars(strip_tags($this->ann_id));
        
        // bind the values
        $stmt->bindParam(':ann_name', $this->ann_name);
        $stmt->bindParam(':ann_date', $this->ann_date);
        $stmt->bindParam(':ann_time', $this->ann_time);
        $stmt->bindParam(':ann_description', $this->ann_description);
        $stmt->bindParam(':ann_address', $this->ann_address);
        $stmt->bindParam(':ann_id', $this->ann_id);

        if($stmt->execute()){
            return true;
        }

        return false;
    }

    public function readAllAnnouncement() {
        $query = "SELECT * FROM ". $this->table_name . " ORDER BY ann_date";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        if ($stmt->execute()) {
            return $stmt;
        }

        return false;
    }

    public function deleteEvent() {
        $query = "DELETE FROM ". $this->table_name ." WHERE ann_id = :ann_id";

        // prepare
        $stmt = $this->conn->prepare($query);

        $this->ann_id = htmlspecialchars(strip_tags($this->ann_id));
        
        // bind the values
        $stmt->bindParam(':ann_id', $this->ann_id);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}