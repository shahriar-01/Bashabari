<?php
require_once '../../config/auth.php';
requestMethod('POST');
$data = getRequestData();
$fullName = trim($data['full_name'] ?? $data['name'] ?? '');
$phone = trim($data['phone'] ?? '');
$gender = strtolower(trim($data['gender'] ?? ''));
$email = trim($data['email'] ?? '');
$studentId = trim($data['student_id'] ?? $data['studentId'] ?? '');
$password = (string)($data['password'] ?? '');
$confirm = (string)($data['confirm_password'] ?? $data['confirmPassword'] ?? '');
if ($fullName === '' || $phone === '' || $gender === '' || $email === '' || $studentId === '' || $password === '' || $confirm === '') jsonError('All fields are required.');
if (!in_array($gender, ['male','female','other'], true)) jsonError('Invalid gender.');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) jsonError('Invalid email address.');
if ($password !== $confirm) jsonError('Passwords do not match.');
if (strlen($password) < 6) jsonError('Password must be at least 6 characters.');
try {
    $db = getDB();
    $universityId = resolveUniversityId($db, $data['university_id'] ?? $data['university'] ?? null);
    if (!$universityId) jsonError('Please select a valid university.');
    $stmt = $db->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    if ($stmt->fetch()) jsonError('This email is already registered.');
    $hash = password_hash($password, PASSWORD_BCRYPT);
    $stmt = $db->prepare("INSERT INTO users (full_name, phone, gender, email, university_id, student_id, password_hash, role) VALUES (?, ?, ?, ?, ?, ?, ?, 'student')");
    $stmt->execute([$fullName, $phone, $gender, $email, $universityId, $studentId, $hash]);
    $userId = (int)$db->lastInsertId();
    $user = userRowWithUniversity($db, $userId);
    setSession($user);
    logActivity($db, $userId, 'register', 'New student registered');
    jsonResponse(['success' => true, 'role' => 'student', 'name' => $fullName, 'email' => $email, 'id' => $userId, 'user' => publicUserPayload($user)]);
} catch (Throwable $e) { jsonError('Registration failed.', 500); }
