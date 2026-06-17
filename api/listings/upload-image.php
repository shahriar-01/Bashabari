<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireLogin();
$listingId = (int)($_POST['listing_id'] ?? 0);
if ($listingId <= 0) jsonError('listing_id is required.');
try {
    $db = getDB();
    $stmt = $db->prepare('SELECT user_id FROM listings WHERE id=?'); $stmt->execute([$listingId]); $row = $stmt->fetch();
    if (!$row) jsonError('Listing not found.', 404);
    if ((int)$row['user_id'] !== currentUserId() && !isAdminUser()) jsonError('Permission denied.', 403);
    $path = safeUpload('image', 'uploads/listings', ['image/jpeg'=>'jpg','image/png'=>'png','image/webp'=>'webp','image/gif'=>'gif'], 5*1024*1024);
    if (!$path) jsonError('No image uploaded.');
    $sort = (int)$db->query('SELECT COALESCE(MAX(sort_order)+1,0) AS n FROM listing_images WHERE listing_id='.(int)$listingId)->fetch()['n'];
    $stmt = $db->prepare('INSERT INTO listing_images (listing_id, image_path, sort_order) VALUES (?, ?, ?)'); $stmt->execute([$listingId, $path, $sort]);
    jsonResponse(['success'=>true, 'image_path'=>$path]);
} catch (Throwable $e) { jsonError('Could not upload image.', 500); }
