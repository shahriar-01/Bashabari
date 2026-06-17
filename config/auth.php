<?php
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/session.php';

header('Content-Type: application/json; charset=utf-8');

function jsonResponse($data, $status = 200) {
    if (!headers_sent()) {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
    }
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function jsonError($message, $status = 400, $extra = []) {
    jsonResponse(array_merge(['success' => false, 'error' => $message], $extra), $status);
}

function getRequestData() {
    $data = $_POST;
    $raw = file_get_contents('php://input');
    if ($raw) {
        $json = json_decode($raw, true);
        if (is_array($json)) {
            $data = array_merge($data, $json);
        }
    }
    return $data;
}

function requestMethod($method) {
    if (strtoupper($_SERVER['REQUEST_METHOD'] ?? '') !== strtoupper($method)) {
        jsonError('Method not allowed.', 405);
    }
}

function getCsrfHeader() {
    $headers = function_exists('getallheaders') ? getallheaders() : [];
    foreach ($headers as $k => $v) {
        if (strtolower($k) === 'x-csrf-token') return $v;
    }
    return $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
}

function verifyCsrf() {
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
        return;
    }
    $token = getCsrfHeader();
    if (empty($_SESSION['csrf_token']) || empty($token) || !hash_equals($_SESSION['csrf_token'], $token)) {
        jsonError('Invalid CSRF token.', 403);
    }
}

function currentUserId() {
    return (int)($_SESSION['user_id'] ?? 0);
}

function currentUserRole() {
    return $_SESSION['role'] ?? null;
}

function isAdminUser() {
    return isLoggedIn() && (($_SESSION['role'] ?? '') === 'admin');
}

function logActivity($db, $user_id, $action_type, $description) {
    try {
        $stmt = $db->prepare('INSERT INTO activity_log (user_id, action_type, description) VALUES (?, ?, ?)');
        $stmt->execute([$user_id ?: null, $action_type, $description]);
    } catch (Throwable $e) {
        // Logging must never break core user action.
    }
}

function sendNotification($db, $user_id, $type, $message, $reference_id = null) {
    if (!$user_id) return;
    try {
        $stmt = $db->prepare('INSERT INTO notifications (user_id, type, message, reference_id) VALUES (?, ?, ?, ?)');
        $stmt->execute([(int)$user_id, $type, $message, $reference_id]);
    } catch (Throwable $e) {}
}

function notifyAdmins($db, $type, $message, $reference_id = null) {
    $admins = $db->query("SELECT id FROM users WHERE role = 'admin' AND is_banned = 0")->fetchAll();
    foreach ($admins as $admin) {
        sendNotification($db, (int)$admin['id'], $type, $message, $reference_id);
    }
}

function normalizeArray($value) {
    if (is_array($value)) return array_values(array_filter($value, fn($v) => $v !== '' && $v !== null));
    if ($value === null || $value === '') return [];
    if (is_string($value)) {
        $decoded = json_decode($value, true);
        if (is_array($decoded)) return array_values(array_filter($decoded, fn($v) => $v !== '' && $v !== null));
        return array_values(array_filter(array_map('trim', explode(',', $value)), fn($v) => $v !== ''));
    }
    return [];
}

function normalizePropertyType($type) {
    $map = [
        'flat' => 'flat', 'sublet' => 'sublet', 'single_room' => 'single_room', 'single room' => 'single_room',
        'shared_flat' => 'shared_flat', 'shared flat' => 'shared_flat', 'mess' => 'mess',
        'bachelor_flat' => 'bachelor_flat', 'bachelor flat' => 'bachelor_flat'
    ];
    $key = strtolower(str_replace('-', ' ', trim((string)$type)));
    return $map[$key] ?? (in_array($type, $map, true) ? $type : null);
}

function propertyTypeLabel($type) {
    $labels = [
        'flat' => 'Flat', 'sublet' => 'Sublet', 'single_room' => 'Single Room',
        'shared_flat' => 'Shared Flat', 'mess' => 'Mess', 'bachelor_flat' => 'Bachelor Flat'
    ];
    return $labels[$type] ?? $type;
}

function parseBool($v) {
    return in_array($v, [1, '1', true, 'true', 'yes', 'on'], true) ? 1 : 0;
}

function resolveUniversityId($db, $value) {
    if ($value === null || $value === '') return null;
    if (is_numeric($value)) return (int)$value;
    $txt = trim($value);
    $short = $txt;
    if (preg_match('/\(([^)]+)\)/', $txt, $m)) {
        $short = trim($m[1]);
    }
    $plain = trim(preg_replace('/\s*\([^)]+\)\s*/', '', $txt));
    $alt = str_replace('&', 'and', $plain);
    $stmt = $db->prepare('SELECT id FROM universities WHERE name = ? OR short_name = ? OR name = ? OR name LIKE ? OR short_name LIKE ? LIMIT 1');
    $stmt->execute([$plain, $short, $alt, '%' . $plain . '%', '%' . $short . '%']);
    $row = $stmt->fetch();
    return $row ? (int)$row['id'] : null;
}

function safeUpload($field, $folder, $allowedMimes, $maxBytes) {
    if (empty($_FILES[$field]) || ($_FILES[$field]['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
        return null;
    }
    $file = $_FILES[$field];
    if (($file['error'] ?? UPLOAD_ERR_OK) !== UPLOAD_ERR_OK) {
        jsonError('Upload failed.', 400);
    }
    if (($file['size'] ?? 0) > $maxBytes) {
        jsonError('File is too large.', 400);
    }
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = $finfo->file($file['tmp_name']);
    if (!isset($allowedMimes[$mime])) {
        jsonError('Invalid file type.', 400);
    }
    $baseDir = dirname(__DIR__) . '/' . trim($folder, '/');
    if (!is_dir($baseDir)) {
        mkdir($baseDir, 0775, true);
    }
    $filename = bin2hex(random_bytes(12)) . '.' . $allowedMimes[$mime];
    $target = $baseDir . '/' . $filename;
    if (!move_uploaded_file($file['tmp_name'], $target)) {
        jsonError('Could not save uploaded file.', 500);
    }
    return trim($folder, '/') . '/' . $filename;
}

function userRowWithUniversity($db, $userId) {
    $stmt = $db->prepare('SELECT u.*, un.name AS university FROM users u LEFT JOIN universities un ON un.id = u.university_id WHERE u.id = ?');
    $stmt->execute([(int)$userId]);
    return $stmt->fetch();
}

function publicUserPayload($user) {
    return [
        'id' => (int)$user['id'],
        'name' => $user['full_name'] ?? ($user['name'] ?? ''),
        'full_name' => $user['full_name'] ?? ($user['name'] ?? ''),
        'email' => $user['email'] ?? '',
        'role' => $user['role'] ?? 'student',
        'profile_picture' => $user['profile_picture'] ?? null,
        'university_id' => isset($user['university_id']) ? (int)$user['university_id'] : null,
        'university' => $user['university'] ?? '',
        'phone' => $user['phone'] ?? '',
        'gender' => $user['gender'] ?? '',
        'student_id' => $user['student_id'] ?? '',
    ];
}

verifyCsrf();
