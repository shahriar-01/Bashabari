<?php
require_once '../../config/auth.php';
requestMethod('GET');
requireLogin();
try {
    $db = getDB();
    $stmt = $db->prepare("SELECT l.*, d.name AS district, a.name AS area, un.name AS university,
      (SELECT image_path FROM listing_images li WHERE li.listing_id=l.id ORDER BY sort_order,id LIMIT 1) AS image_path,
      (SELECT GROUP_CONCAT(amenity_name ORDER BY id SEPARATOR ',') FROM listing_amenities la WHERE la.listing_id=l.id) AS amenities
      FROM listings l LEFT JOIN districts d ON d.id=l.district_id LEFT JOIN areas a ON a.id=l.area_id LEFT JOIN universities un ON un.id=l.university_id
      WHERE l.user_id=? AND l.status <> 'deleted' ORDER BY l.created_at DESC");
    $stmt->execute([currentUserId()]);
    $rows = $stmt->fetchAll();
    $listings = array_map(fn($r)=>[
        'id'=>(int)$r['id'], 'title'=>$r['title'], 'district'=>$r['district'], 'area'=>$r['area'], 'university'=>$r['university'], 'district_id'=>$r['district_id']?(int)$r['district_id']:null, 'area_id'=>$r['area_id']?(int)$r['area_id']:null, 'university_id'=>$r['university_id']?(int)$r['university_id']:null,
        'rent_price'=>(float)$r['rent_price'], 'price'=>(float)$r['rent_price'], 'property_type'=>$r['property_type'], 'property_type_label'=>propertyTypeLabel($r['property_type']), 'distance_value'=>$r['distance_value']?(float)$r['distance_value']:null, 'distance_unit'=>$r['distance_unit'], 'available_from'=>$r['available_from'], 'description'=>$r['description'], 'phone_hidden'=>(int)$r['phone_hidden'], 'status'=>$r['status'], 'is_verified'=>(int)$r['is_verified'], 'image_path'=>$r['image_path'] ?: 'uploads/listings/placeholder.jpg', 'images'=>[$r['image_path'] ?: 'uploads/listings/placeholder.jpg'], 'amenities'=>$r['amenities']?explode(',',$r['amenities']):[], 'created_at'=>$r['created_at']
    ], $rows);
    jsonResponse(['success'=>true, 'listings'=>$listings]);
} catch (Throwable $e) { jsonError('Could not fetch your listings.', 500); }
