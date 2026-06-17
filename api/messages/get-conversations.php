<?php
require_once '../../config/auth.php';
requestMethod('GET');
requireLogin();
try{ $db=getDB(); $uid=currentUserId(); $type=$_GET['type']??'all'; $where="cr.status='accepted' AND (cr.sender_id=? OR cr.receiver_id=?)"; $params=[$uid,$uid]; if($type==='listing'||$type==='listings'){ $where.=" AND cr.source='listing'"; } elseif($type==='connection'||$type==='connections'||$type==='roommate'){ $where.=" AND cr.source='roommate'"; }
$sql="SELECT cr.*, u.id AS other_id, u.full_name AS other_name, u.email AS other_email, u.profile_picture, un.name AS university,
(SELECT m.id FROM messages m WHERE m.connection_id=cr.id ORDER BY m.id DESC LIMIT 1) AS last_id,
(SELECT m.sender_id FROM messages m WHERE m.connection_id=cr.id ORDER BY m.id DESC LIMIT 1) AS last_sender_id,
(SELECT m.message_text FROM messages m WHERE m.connection_id=cr.id ORDER BY m.id DESC LIMIT 1) AS last_text,
(SELECT m.image_path FROM messages m WHERE m.connection_id=cr.id ORDER BY m.id DESC LIMIT 1) AS last_image,
(SELECT m.created_at FROM messages m WHERE m.connection_id=cr.id ORDER BY m.id DESC LIMIT 1) AS last_created_at,
(SELECT COUNT(*) FROM messages m WHERE m.connection_id=cr.id AND m.sender_id<>? AND m.is_seen=0) AS unread_count
FROM connection_requests cr JOIN users u ON u.id=CASE WHEN cr.sender_id=? THEN cr.receiver_id ELSE cr.sender_id END LEFT JOIN universities un ON un.id=u.university_id WHERE $where";
$params2=array_merge([$uid,$uid],$params); $stmt=$db->prepare($sql); $stmt->execute($params2); $rows=$stmt->fetchAll();
$convs=[]; foreach($rows as $r){ $last=null; if($r['last_id']) $last=['id'=>(int)$r['last_id'],'sender_id'=>(int)$r['last_sender_id'],'message_text'=>$r['last_text'],'image_path'=>$r['last_image'],'created_at'=>$r['last_created_at']]; $convs[]=['connection_id'=>(int)$r['id'],'source'=>$r['source'],'listing_id'=>$r['listing_id']?(int)$r['listing_id']:null,'other_user'=>['id'=>(int)$r['other_id'],'name'=>$r['other_name'],'email'=>$r['other_email'],'profile_picture'=>$r['profile_picture'],'university'=>$r['university']],'last_message'=>$last,'unread_count'=>(int)$r['unread_count'],'created_at'=>$r['created_at'],'sort_time'=>$r['last_created_at'] ?: $r['created_at']]; }
usort($convs,fn($a,$b)=>strcmp($b['sort_time'],$a['sort_time'])); foreach($convs as &$c) unset($c['sort_time']); jsonResponse(['success'=>true,'conversations'=>$convs]); }catch(Throwable $e){ jsonError('Could not fetch conversations.',500); }
