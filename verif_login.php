<?php
session_start();
if (isset($_SESSION['email'])){
    if ($_SESSION['est_admin'] == 1){
        echo "admin";
    }
    else{
        echo "true";
    }
    
}
else{
    echo "false";
    
}
?>