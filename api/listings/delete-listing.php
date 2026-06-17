<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireLogin();
$data = getRequestData();
$listingId = (int)($data['listing_id'] ?? $data['id'] ?? 0);
if ($listingId <= 0) jsonError('listing_id is required.');
try {
    $db = getDB();
    $stmt = $db->prepare('SELECT user_id FROM listings WHERE id=?'); $stmt->execute([$listingId]); $row = $stmt->fetch();
    if (!$row) jsonError('Listing not found.', 404);
    if ((int)$row['user_id'] !== currentUserId() && !isAdminUser()) jsonError('Permission denied.', 403);
    $db->prepare("UPDATE listings SET status='deleted' WHERE id=?")->execute([$listingId]);
    logActivity($db, currentUserId(), 'delete_listing', 'Soft-deleted listing #' . $listingId);
    jsonResponse(['success'=>true]);
} catch (Throwable $e) { jsonError('Could not delete listing.', 500); }
