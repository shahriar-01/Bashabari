<?php
require_once '../../config/auth.php';
requestMethod('GET');
requireLogin();
try{ $db=getDB(); $stmt=$db->prepare("SELECT cr.*, u.id AS other_id, u.full_name AS other_name, u.email AS other_email, u.profile_picture, un.name AS university
FROM connection_requests cr
JOIN users u ON u.id = CASE WHEN cr.sender_id=? THEN cr.receiver_id ELSE cr.sender_id END
LEFT JOIN universities un ON un.id=u.university_id
WHERE cr.status='accepted' AND (cr.sender_id=? OR cr.receiver_id=?) ORDER BY cr.created_at DESC"); $uid=currentUserId(); $stmt->execute([$uid,$uid,$uid]); $connections=[]; foreach($stmt->fetchAll() as $r){ $connections[]=['connection_id'=>(int)$r['id'],'id'=>(int)$r['id'],'source'=>$r['source'],'listing_id'=>$r['listing_id']?(int)$r['listing_id']:null,'created_at'=>$r['created_at'],'other_user'=>['id'=>(int)$r['other_id'],'name'=>$r['other_name'],'email'=>$r['other_email'],'profile_picture'=>$r['profile_picture'],'university'=>$r['university']],'name'=>$r['other_name'],'university'=>$r['university'],'profile_picture'=>$r['profile_picture']]; } jsonResponse(['success'=>true,'connections'=>$connections]); }catch(Throwable $e){ jsonError('Could not fetch connections.',500); }
