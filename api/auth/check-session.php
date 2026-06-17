<?php
require_once '../../config/auth.php';
requestMethod('GET');
if (isLoggedIn()) {
    $user = getCurrentUser();
    unset($user['csrf_token']);
    jsonResponse(['loggedIn' => true, 'user' => $user, 'csrf_token' => $_SESSION['csrf_token'] ?? null]);
}
jsonResponse(['loggedIn' => false, 'csrf_token' => $_SESSION['csrf_token'] ?? null]);
