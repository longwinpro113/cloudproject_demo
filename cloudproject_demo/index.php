<?php
header('Location: html/login.html'); 
$db = getDB(); 

if($db) {
    $query = "SELECT * FROM product"; 
    $result = pq_query($query); 

    if($result) {
        $arr = pg_fetch_all($result); 
        echo json_encode($arr);
    }
}
?>