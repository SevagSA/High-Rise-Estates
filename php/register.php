<?php
echo "Here is the information you sent for registration:<br/><br/>";

foreach ($_REQUEST as $key => $value)
    echo $key . ": " . $value . "<br>";
