<?php
require_once '../../config/auth.php';
requestMethod('POST');
$user = requireLogin();
$data = getRequestData();
$title = trim($data['title'] ?? '');
$rent = $data['rent_price'] ?? $data['price'] ?? '';
$ptype = normalizePropertyType($data['property_type'] ?? $data['type'] ?? '');
if ($title === '' || $rent === '' || !$ptype) jsonError('Title, rent price, and property type are required.');
try {
    $db = getDB();
    $districtRaw = $data['district_id'] ?? $data['district'] ?? null;
    $areaRaw = $data['area_id'] ?? $data['area'] ?? null;
    $universityRaw = $data['university_id'] ?? $data['university'] ?? null;
    $districtId = null; $areaId = null;
    if ($districtRaw !== null && $districtRaw !== '') {
        if (is_numeric($districtRaw)) $districtId = (int)$districtRaw;
        else { $ds=$db->prepare('SELECT id FROM districts WHERE name=? OR name=? LIMIT 1'); $ds->execute([$districtRaw, str_replace('Chattogram','Chittagong',$districtRaw)]); $dr=$ds->fetch(); $districtId=$dr?(int)$dr['id']:null; }
    }
    if ($areaRaw !== null && $areaRaw !== '') {
        if (is_numeric($areaRaw)) $areaId = (int)$areaRaw;
        else { $as=$db->prepare('SELECT id FROM areas WHERE name=? AND (? IS NULL OR district_id=?) LIMIT 1'); $as->execute([$areaRaw,$districtId,$districtId]); $ar=$as->fetch(); $areaId=$ar?(int)$ar['id']:null; }
    }
    $universityId = resolveUniversityId($db, $universityRaw);
    $stmt = $db->prepare("INSERT INTO listings (user_id, title, district_id, area_id, university_id, rent_price, property_type, distance_value, distance_unit, available_from, description, phone_hidden, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')");
    $stmt->execute([currentUserId(), $title, $districtId, $areaId, $universityId, (float)$rent, $ptype, ($data['distance_value'] ?? $data['distance'] ?? null) ?: null, strtolower(($data['distance_unit'] ?? $data['transit'] ?? 'walking') ?: 'walking'), ($data['available_from'] ?? null) ?: null, trim($data['description'] ?? ''), parseBool($data['phone_hidden'] ?? 0)]);
    $listingId = (int)$db->lastInsertId();
    $amenities = normalizeArray($data['amenities'] ?? []);
    $stmtA = $db->prepare('INSERT INTO listing_amenities (listing_id, amenity_name) VALUES (?, ?)');
    foreach ($amenities as $a) $stmtA->execute([$listingId, trim($a)]);
    $images = normalizeArray($data['image_paths'] ?? $data['images'] ?? []);
    $stmtI = $db->prepare('INSERT INTO listing_images (listing_id, image_path, sort_order) VALUES (?, ?, ?)');
    foreach ($images as $i=>$path) { if (is_string($path) && strpos($path, 'data:') !== 0) $stmtI->execute([$listingId, $path, $i]); }
    logActivity($db, currentUserId(), 'create_listing', 'Created listing: ' . $title);
    notifyAdmins($db, 'system', 'New listing submitted by ' . ($user['name'] ?? 'a student') . ', pending review.', $listingId);
    jsonResponse(['success'=>true, 'listing_id'=>$listingId]);
} catch (Throwable $e) { jsonError('Could not create listing.', 500); }
