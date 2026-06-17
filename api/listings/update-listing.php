<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireLogin();
$data = getRequestData();
$listingId = (int)($data['listing_id'] ?? $data['id'] ?? 0);
if ($listingId <= 0) jsonError('listing_id is required.');
try {
    $db = getDB();
    $stmt = $db->prepare('SELECT * FROM listings WHERE id=?'); $stmt->execute([$listingId]); $old = $stmt->fetch();
    if (!$old) jsonError('Listing not found.', 404);
    if ((int)$old['user_id'] !== currentUserId() && !isAdminUser()) jsonError('Permission denied.', 403);
    $ptype = normalizePropertyType($data['property_type'] ?? $old['property_type']) ?: $old['property_type'];
    $stmt = $db->prepare('UPDATE listings SET title=?, district_id=?, area_id=?, university_id=?, rent_price=?, property_type=?, distance_value=?, distance_unit=?, available_from=?, description=?, phone_hidden=? WHERE id=?');
    $stmt->execute([
        trim($data['title'] ?? $old['title']), ($data['district_id'] ?? $old['district_id']) ?: null, ($data['area_id'] ?? $old['area_id']) ?: null, ($data['university_id'] ?? $old['university_id']) ?: null,
        (float)($data['rent_price'] ?? $old['rent_price']), $ptype, ($data['distance_value'] ?? $old['distance_value']) ?: null, ($data['distance_unit'] ?? $old['distance_unit']) ?: 'walking', ($data['available_from'] ?? $old['available_from']) ?: null, trim($data['description'] ?? $old['description']), parseBool($data['phone_hidden'] ?? $old['phone_hidden']), $listingId
    ]);
    if (array_key_exists('amenities', $data)) {
        $db->prepare('DELETE FROM listing_amenities WHERE listing_id=?')->execute([$listingId]);
        $stmtA = $db->prepare('INSERT INTO listing_amenities (listing_id, amenity_name) VALUES (?, ?)');
        foreach (normalizeArray($data['amenities']) as $a) $stmtA->execute([$listingId, trim($a)]);
    }
    logActivity($db, currentUserId(), 'update_listing', 'Updated listing #' . $listingId);
    jsonResponse(['success'=>true]);
} catch (Throwable $e) { jsonError('Could not update listing.', 500); }
