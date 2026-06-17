<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireAdmin();
$data = getRequestData();
$id = (int)($data['review_id'] ?? $data['id'] ?? 0);
if ($id <= 0) jsonError('review_id is required.');

try {
    $db = getDB();
    $stmt = $db->prepare('SELECT * FROM landlord_reviews WHERE id = ?');
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    if (!$row) jsonError('Review not found.', 404);

    $landlordName = trim($data['landlord_name'] ?? '');
    $propertyAddress = trim($data['property_address'] ?? '');
    $districtId = array_key_exists('district_id', $data) && $data['district_id'] !== '' ? (int)$data['district_id'] : null;

    if ($landlordName !== '' || $propertyAddress !== '' || $districtId !== null) {
        if ($landlordName === '') $landlordName = $row['landlord_name'];
        if ($propertyAddress === '') $propertyAddress = $row['property_address'];
        if ($districtId === null) $districtId = $row['district_id'] ? (int)$row['district_id'] : null;

        $stmt = $db->prepare('UPDATE landlord_reviews SET landlord_name = ?, property_address = ?, district_id = ?, is_approved = 1 WHERE id = ?');
        $stmt->execute([$landlordName, $propertyAddress, $districtId, $id]);
    } else {
        $landlordName = $row['landlord_name'];
        $propertyAddress = $row['property_address'];
        $districtId = $row['district_id'] ? (int)$row['district_id'] : null;
        $db->prepare('UPDATE landlord_reviews SET is_approved = 1 WHERE id = ?')->execute([$id]);
    }

    $stmt = $db->prepare('INSERT INTO landlord_profiles (landlord_name, district_id, overall_rating)
                          VALUES (?, ?, 0.00)
                          ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP');
    $stmt->execute([$landlordName, $districtId]);

    $stmt = $db->prepare('UPDATE landlord_profiles lp
                          SET overall_rating = (
                            SELECT COALESCE(AVG(star_rating), 0)
                            FROM landlord_reviews lr
                            WHERE lr.landlord_name = lp.landlord_name
                              AND (lr.district_id <=> lp.district_id)
                              AND lr.is_approved = 1
                          )
                          WHERE lp.landlord_name = ? AND (lp.district_id <=> ?)');
    $stmt->execute([$landlordName, $districtId]);

    sendNotification($db, (int)$row['user_id'], 'admin', 'Your landlord review has been approved.', $id);
    logActivity($db, currentUserId(), 'approve_review', 'Approved review #' . $id . ' for ' . $landlordName);

    $stmt = $db->prepare('SELECT lr.*, d.name AS district, u.full_name AS reviewer_name
                          FROM landlord_reviews lr
                          LEFT JOIN districts d ON d.id = lr.district_id
                          JOIN users u ON u.id = lr.user_id
                          WHERE lr.id = ?');
    $stmt->execute([$id]);
    $updated = $stmt->fetch();

    jsonResponse(['success' => true, 'review' => $updated]);
} catch (Throwable $e) {
    jsonError('Could not approve review.', 500);
}
