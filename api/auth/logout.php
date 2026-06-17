<?php
require_once '../../config/auth.php';
requestMethod('POST');
clearSession();
jsonResponse(['success' => true]);
