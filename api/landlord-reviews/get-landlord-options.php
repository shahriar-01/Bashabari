<?php
require_once '../../config/auth.php';
requestMethod('GET');
requireAdmin();
try {
    $db = getDB();
    // Return every distinct landlord/address already stored in the DB. A landlord may have
    // multiple reviewed properties, and the address dropdown depends on this list.
    $sql = "SELECT DISTINCT lr.landlord_name, lr.district_id, d.name AS district, lr.property_address
            FROM landlord_reviews lr
            LEFT JOIN districts d ON d.id = lr.district_id
            WHERE lr.landlord_name <> '' AND lr.property_address <> ''
            ORDER BY lr.landlord_name ASC, lr.property_address ASC";
    $rows = $db->query($sql)->fetchAll();
    $map = [];
    foreach ($rows as $r) {
        $key = strtolower(trim($r['landlord_name']));
        if (!isset($map[$key])) {
            $map[$key] = [
                'landlord_name' => $r['landlord_name'],
                'addresses' => [],
            ];
        }
        $address = [
            'property_address' => $r['property_address'],
            'district_id' => $r['district_id'] ? (int)$r['district_id'] : null,
            'district' => $r['district'] ?? '',
        ];
        $exists = false;
        foreach ($map[$key]['addresses'] as $existing) {
            if ($existing['property_address'] === $address['property_address']) { $exists = true; break; }
        }
        if (!$exists) $map[$key]['addresses'][] = $address;
    }
    jsonResponse(['success' => true, 'landlords' => array_values($map)]);
} catch (Throwable $e) {
    jsonError('Could not fetch landlord options.', 500);
}
