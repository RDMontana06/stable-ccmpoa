<?php

    if ( 0 < $_FILES['sample_image']['error'] ) {
        echo 'Error: ' . $_FILES['sample_image']['error'] . '<br>';
    }
    else {
        move_uploaded_file($_FILES['sample_image']['tmp_name'], '../../assets/img/marketplace_images/' . $_FILES['sample_image']['name']);
    }

?>