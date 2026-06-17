<?php
require_once '../../config/auth.php';
requestMethod('GET');
$id = (int)($_GET['id'] ?? 0);
if ($id <= 0) jsonError('Listing id is required.');
try {
    $db = getDB();
    $stmt = $db->prepare("SELECT l.*, d.name AS district, a.name AS area, un.name AS university, un.short_name AS university_short,
                                 owner.full_name AS owner_name, owner.email AS owner_email, owner.phone AS owner_phone, owner.profile_picture AS owner_picture, owner.university_id AS owner_university_id
                          FROM listings l
                          LEFT JOIN districts d ON d.id=l.district_id
                          LEFT JOIN areas a ON a.id=l.area_id
                          LEFT JOIN universities un ON un.id=l.university_id
                          JOIN users owner ON owner.id=l.user_id
                          WHERE l.id = ? LIMIT 1");
    $stmt->execute([$id]);
    $l = $stmt->fetch();
    if (!$l) jsonError('Listing not found.', 404);
    if ($l['status'] !== 'published' && (!isLoggedIn() || ((int)$l['user_id'] !== currentUserId() && !isAdminUser()))) jsonError('Listing not available.', 403);
    $stmt = $db->prepare('SELECT image_path FROM listing_images WHERE listing_id=? ORDER BY sort_order ASC, id ASC');
    $stmt->execute([$id]); $images = array_column($stmt->fetchAll(), 'image_path');
    $stmt = $db->prepare('SELECT amenity_name FROM listing_amenities WHERE listing_id=? ORDER BY id ASC');
    $stmt->execute([$id]); $amenities = array_column($stmt->fetchAll(), 'amenity_name');
    $stmt = $db->prepare('SELECT c.*, u.full_name AS user_name, u.profile_picture FROM comments c JOIN users u ON u.id=c.user_id WHERE c.listing_id=? ORDER BY c.created_at ASC');
    $stmt->execute([$id]);
    $comments = array_map(fn($c)=>['id'=>(int)$c['id'], 'user_id'=>(int)$c['user_id'], 'user_name'=>$c['user_name'], 'profile_picture'=>$c['profile_picture'], 'comment_text'=>$c['comment_text'], 'text'=>$c['comment_text'], 'created_at'=>$c['created_at'], 'updated_at'=>$c['updated_at']], $stmt->fetchAll());
    $favorited = false;
    if (isLoggedIn()) {
        $stmt = $db->prepare('SELECT id FROM favorites WHERE user_id=? AND listing_id=?'); $stmt->execute([currentUserId(), $id]); $favorited = (bool)$stmt->fetch();
    }
    $phone = (isLoggedIn() && !(int)$l['phone_hidden']) ? $l['owner_phone'] : null;
    $listing = [
        'id'=>(int)$l['id'], 'user_id'=>(int)$l['user_id'], 'title'=>$l['title'], 'district_id'=>$l['district_id']?(int)$l['district_id']:null, 'district'=>$l['district'],
        'area_id'=>$l['area_id']?(int)$l['area_id']:null, 'area'=>$l['area'], 'university_id'=>$l['university_id']?(int)$l['university_id']:null, 'university'=>$l['university'], 'university_short'=>$l['university_short'],
        'rent_price'=>(float)$l['rent_price'], 'price'=>(float)$l['rent_price'], 'property_type'=>$l['property_type'], 'property_type_label'=>propertyTypeLabel($l['property_type']),
        'distance_value'=>$l['distance_value']!==null?(float)$l['distance_value']:null, 'distance_unit'=>$l['distance_unit'], 'available_from'=>$l['available_from'], 'description'=>$l['description'],
        'phone_hidden'=>(int)$l['phone_hidden'], 'status'=>$l['status'], 'is_verified'=>(int)$l['is_verified'], 'verified'=>(bool)$l['is_verified'], 'created_at'=>$l['created_at'],
        'images'=>$images ?: ['uploads/listings/placeholder.jpg'], 'amenities'=>$amenities, 'comments'=>$comments, 'is_favorited'=>$favorited,
        'poster'=>['id'=>(int)$l['user_id'], 'name'=>$l['owner_name'], 'email'=>$l['owner_email'], 'phone'=>$phone, 'profile_picture'=>$l['owner_picture']]
    ];
    jsonResponse(['success'=>true, 'listing'=>$listing]);
} catch (Throwable $e) { jsonError('Could not fetch listing detail.', 500); }
