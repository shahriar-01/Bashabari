<?php
require_once '../../config/auth.php';
requestMethod('POST');
$data = getRequestData();
$email = trim($data['email'] ?? '');
$password = (string)($data['password'] ?? '');
if ($email === '' || $password === '') jsonError('Email and password are required.');
try {
    $db = getDB();
    $stmt = $db->prepare('SELECT u.*, un.name AS university FROM users u LEFT JOIN universities un ON un.id = u.university_id WHERE u.email = ? AND u.is_banned = 0 LIMIT 1');
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    if (!$user || !password_verify($password, $user['password_hash'])) {
        jsonError('Invalid credentials.', 401);
    }
    setSession($user);
    logActivity($db, (int)$user['id'], 'login', 'User logged in');
    jsonResponse(['success' => true, 'role' => $user['role'], 'name' => $user['full_name'], 'email' => $user['email'], 'profile_picture' => $user['profile_picture'], 'id' => (int)$user['id'], 'user' => publicUserPayload($user)]);
} catch (Throwable $e) { jsonError('Login failed.', 500); }
