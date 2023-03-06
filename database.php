<?php

$connection = mysqli_connect(
  'localhost', 'root', '','osmos'
);

// for testing connection
#if($connection) {
#  echo 'database is connected';
#}

?>
