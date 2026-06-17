<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireLogin();
$data = getRequestData();
$listingId = (int)($data['listing_id'] ?? 0);
if ($listingId <= 0) jsonError('listing_id is required.');
try {
    $db = getDB();
    $stmt = $db->prepare('SELECT user_id, phone_hidden FROM listings WHERE id=?'); $stmt->execute([$listingId]); $row = $stmt->fetch();
    if (!$row) jsonError('Listing not found.', 404);
    if ((int)$row['user_id'] !== currentUserId()) jsonError('Only the owner can toggle phone visibility.', 403);
    $new = (int)!((int)$row['phone_hidden']);
    $db->prepare('UPDATE listings SET phone_hidden=? WHERE id=?')->execute([$new, $listingId]);
    jsonResponse(['success'=>true, 'phone_hidden'=>$new]);
} catch (Throwable $e) { jsonError('Could not toggle phone.', 500); }
