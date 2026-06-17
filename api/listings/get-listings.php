<?php
require_once '../../config/auth.php';
requestMethod('GET');
try {
    $db = getDB();
    $adminView = (($_GET['admin'] ?? '') === 'true' || ($_GET['admin'] ?? '') === '1') && isAdminUser();
    $where = [];
    $params = [];
    if (!$adminView) {
        $where[] = "l.status = 'published'";
    } elseif (!empty($_GET['status'])) {
        $where[] = 'l.status = ?'; $params[] = $_GET['status'];
    }
    foreach (['district_id'=>'l.district_id', 'area_id'=>'l.area_id', 'university_id'=>'l.university_id'] as $key=>$col) {
        if (isset($_GET[$key]) && $_GET[$key] !== '') { $where[] = "$col = ?"; $params[] = (int)$_GET[$key]; }
    }
    $ptype = normalizePropertyType($_GET['property_type'] ?? '');
    if ($ptype) { $where[] = 'l.property_type = ?'; $params[] = $ptype; }
    if (isset($_GET['min_price']) && $_GET['min_price'] !== '') { $where[] = 'l.rent_price >= ?'; $params[] = (float)$_GET['min_price']; }
    if (isset($_GET['max_price']) && $_GET['max_price'] !== '') { $where[] = 'l.rent_price <= ?'; $params[] = (float)$_GET['max_price']; }
    if (isset($_GET['distance']) && $_GET['distance'] !== '') { $where[] = 'l.distance_value <= ?'; $params[] = (float)$_GET['distance']; }
    if (!empty($_GET['search'])) {
        $q = '%' . trim($_GET['search']) . '%';
        $where[] = '(l.title LIKE ? OR l.description LIKE ? OR d.name LIKE ? OR a.name LIKE ? OR un.name LIKE ? OR un.short_name LIKE ?)';
        array_push($params, $q, $q, $q, $q, $q, $q);
    }
    foreach (normalizeArray($_GET['amenities'] ?? '') as $amenity) {
        $where[] = 'EXISTS (SELECT 1 FROM listing_amenities la2 WHERE la2.listing_id = l.id AND la2.amenity_name = ?)';
        $params[] = $amenity;
    }
    $whereSql = $where ? ('WHERE ' . implode(' AND ', $where)) : '';
    $countSql = "SELECT COUNT(*) AS total FROM listings l LEFT JOIN districts d ON d.id=l.district_id LEFT JOIN areas a ON a.id=l.area_id LEFT JOIN universities un ON un.id=l.university_id $whereSql";
    $stmt = $db->prepare($countSql);
    $stmt->execute($params);
    $total = (int)$stmt->fetch()['total'];
    $page = max(1, (int)($_GET['page'] ?? 1));
    $limit = min(50, max(1, (int)($_GET['limit'] ?? 12)));
    $offset = ($page - 1) * $limit;
    $sql = "SELECT l.*, d.name AS district, a.name AS area, un.name AS university, un.short_name AS university_short,
                   owner.full_name AS owner_name, owner.profile_picture AS owner_picture,
                   (SELECT li.image_path FROM listing_images li WHERE li.listing_id=l.id ORDER BY li.sort_order ASC, li.id ASC LIMIT 1) AS image_path,
                   (SELECT GROUP_CONCAT(la.amenity_name ORDER BY la.id SEPARATOR ',') FROM listing_amenities la WHERE la.listing_id=l.id) AS amenities
            FROM listings l
            LEFT JOIN districts d ON d.id=l.district_id
            LEFT JOIN areas a ON a.id=l.area_id
            LEFT JOIN universities un ON un.id=l.university_id
            JOIN users owner ON owner.id=l.user_id
            $whereSql
            ORDER BY l.updated_at DESC, l.created_at DESC, l.id DESC
            LIMIT :limit OFFSET :offset";
    $stmt = $db->prepare($sql);
    foreach ($params as $i=>$v) $stmt->bindValue($i+1, $v);
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();
    $rows = $stmt->fetchAll();
    $listings = array_map(function($r){
        return [
            'id'=>(int)$r['id'], 'user_id'=>(int)$r['user_id'], 'title'=>$r['title'],
            'district_id'=>$r['district_id'] ? (int)$r['district_id'] : null, 'district'=>$r['district'],
            'area_id'=>$r['area_id'] ? (int)$r['area_id'] : null, 'area'=>$r['area'],
            'university_id'=>$r['university_id'] ? (int)$r['university_id'] : null, 'university'=>$r['university'], 'university_short'=>$r['university_short'],
            'rent_price'=>(float)$r['rent_price'], 'price'=>(float)$r['rent_price'], 'property_type'=>$r['property_type'], 'property_type_label'=>propertyTypeLabel($r['property_type']),
            'distance_value'=>$r['distance_value'] !== null ? (float)$r['distance_value'] : null, 'distance_unit'=>$r['distance_unit'],
            'available_from'=>$r['available_from'], 'description'=>$r['description'], 'phone_hidden'=>(int)$r['phone_hidden'],
            'status'=>$r['status'], 'is_verified'=>(int)$r['is_verified'], 'verified'=>(bool)$r['is_verified'], 'created_at'=>$r['created_at'], 'updated_at'=>$r['updated_at'],
            'image_path'=>$r['image_path'] ?: 'uploads/listings/placeholder.jpg', 'images'=>[$r['image_path'] ?: 'uploads/listings/placeholder.jpg'],
            'amenities'=>$r['amenities'] ? explode(',', $r['amenities']) : [], 'owner_name'=>$r['owner_name'], 'owner_picture'=>$r['owner_picture']
        ];
    }, $rows);
    jsonResponse(['success'=>true, 'listings'=>$listings, 'total'=>$total, 'page'=>$page, 'limit'=>$limit]);
} catch (Throwable $e) { jsonError('Could not fetch listings.', 500); }
