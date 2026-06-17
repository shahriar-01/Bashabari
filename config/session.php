<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

function isLoggedIn() {
    return isset($_SESSION['user_id']) && (int)$_SESSION['user_id'] > 0;
}

function getCurrentUser() {
    if (!isLoggedIn()) {
        return null;
    }
    return [
        'id' => (int)($_SESSION['user_id'] ?? 0),
        'name' => $_SESSION['full_name'] ?? '',
        'full_name' => $_SESSION['full_name'] ?? '',
        'email' => $_SESSION['email'] ?? '',
        'role' => $_SESSION['role'] ?? 'student',
        'profile_picture' => $_SESSION['profile_picture'] ?? null,
        'university_id' => isset($_SESSION['university_id']) ? (int)$_SESSION['university_id'] : null,
        'university' => $_SESSION['university'] ?? '',
        'phone' => $_SESSION['phone'] ?? '',
        'gender' => $_SESSION['gender'] ?? '',
        'student_id' => $_SESSION['student_id'] ?? '',
        'csrf_token' => $_SESSION['csrf_token'] ?? null,
    ];
}

function sessionJsonExit($payload, $status = 200) {
    if (!headers_sent()) {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
    }
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function requireLogin() {
    if (!isLoggedIn()) {
        sessionJsonExit(['success' => false, 'error' => 'Authentication required.'], 401);
    }
    return getCurrentUser();
}

function requireAdmin() {
    if (!isLoggedIn() || ($_SESSION['role'] ?? '') !== 'admin') {
        sessionJsonExit(['success' => false, 'error' => 'Admin access required.'], 403);
    }
    return getCurrentUser();
}

function setSession($user) {
    $_SESSION['user_id'] = (int)$user['id'];
    $_SESSION['full_name'] = $user['full_name'] ?? ($user['name'] ?? '');
    $_SESSION['email'] = $user['email'] ?? '';
    $_SESSION['role'] = $user['role'] ?? 'student';
    $_SESSION['profile_picture'] = $user['profile_picture'] ?? null;
    $_SESSION['university_id'] = isset($user['university_id']) ? (int)$user['university_id'] : null;
    $_SESSION['university'] = $user['university'] ?? ($user['university_name'] ?? '');
    $_SESSION['phone'] = $user['phone'] ?? '';
    $_SESSION['gender'] = $user['gender'] ?? '';
    $_SESSION['student_id'] = $user['student_id'] ?? '';
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
}

function clearSession() {
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'], $params['secure'], $params['httponly']);
    }
    if (session_status() === PHP_SESSION_ACTIVE) {
        session_destroy();
    }
}
