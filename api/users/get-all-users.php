<?php
require_once '../../config/auth.php';
requestMethod('GET');
requireAdmin();
try{
  $db=getDB(); $where=["u.role='student'"]; $params=[];
  if(!empty($_GET['search'])){$q='%'.trim($_GET['search']).'%';$where[]='(u.full_name LIKE ? OR u.email LIKE ? OR u.student_id LIKE ?)';array_push($params,$q,$q,$q);} 
  if(!empty($_GET['university_id'])){$where[]='u.university_id=?';$params[]=(int)$_GET['university_id'];}
  if(!empty($_GET['gender'])){$where[]='u.gender=?';$params[]=strtolower($_GET['gender']);}
  if(($_GET['status']??'')==='banned'){$where[]='u.is_banned=1';} elseif(($_GET['status']??'')==='active'){$where[]='u.is_banned=0';} elseif(($_GET['status']??'')==='verified'){$where[]='u.is_verified=1';}
  $whereSql='WHERE '.implode(' AND ',$where);
  $stmt=$db->prepare("SELECT u.id,u.full_name,u.phone,u.gender,u.email,u.university_id,u.student_id,u.profile_picture,u.is_verified,u.is_banned,u.role,u.created_at,u.updated_at,un.name AS university,
    (SELECT COUNT(*) FROM listings l WHERE l.user_id=u.id AND l.status<>'deleted') AS listing_count,
    (SELECT COUNT(*) FROM comments c WHERE c.user_id=u.id) AS comment_count,
    (SELECT COUNT(*) FROM landlord_reviews lr WHERE lr.user_id=u.id) AS review_count,
    (SELECT COUNT(*) FROM favorites f WHERE f.user_id=u.id) AS favorite_count,
    (SELECT COUNT(*) FROM connection_requests cr WHERE cr.status='accepted' AND (cr.sender_id=u.id OR cr.receiver_id=u.id)) AS connection_count
    FROM users u LEFT JOIN universities un ON un.id=u.university_id $whereSql ORDER BY u.created_at DESC");
  $stmt->execute($params);
  $users=array_map(function($u){ return publicUserPayload($u)+['phone'=>$u['phone'],'student_id'=>$u['student_id'],'is_verified'=>(int)$u['is_verified'],'is_banned'=>(int)$u['is_banned'],'created_at'=>$u['created_at'],'updated_at'=>$u['updated_at'],'listing_count'=>(int)$u['listing_count'],'comment_count'=>(int)$u['comment_count'],'review_count'=>(int)$u['review_count'],'favorite_count'=>(int)$u['favorite_count'],'connection_count'=>(int)$u['connection_count']]; },$stmt->fetchAll());
  jsonResponse(['success'=>true,'users'=>$users]);
}catch(Throwable $e){ jsonError('Could not fetch users.',500); }
