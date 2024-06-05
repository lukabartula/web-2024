<?php
       $env = getenv('DB_NAME');

       if ($env != null) {
           header("Location: /index.html");
       } else {
           header("Location: /web-2024/index.html");
       }

       die();
?>