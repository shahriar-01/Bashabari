<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireLogin();
$data=getRequestData(); $id=(int)($data['review_id']??$data['id']??0); if($id<=0) jsonError('review_id is required.');
try{ $db=getDB(); $stmt=$db->prepare('SELECT user_id FROM landlord_reviews WHERE id=?'); $stmt->execute([$id]); $row=$stmt->fetch(); if(!$row) jsonError('Review not found.',404); if((int)$row['user_id']!==currentUserId()) jsonError('Permission denied.',403); $stars=(int)($data['star_rating']??0); if($stars<1||$stars>5) jsonError('Valid rating is required.'); $stmt=$db->prepare('UPDATE landlord_reviews SET landlord_name=?,property_address=?,district_id=?,star_rating=?,is_recommended=?,review_text=?,is_approved=0 WHERE id=?'); $stmt->execute([trim($data['landlord_name']??''),trim($data['property_address']??''),($data['district_id']??'')!==''?(int)$data['district_id']:null,$stars,parseBool($data['is_recommended']??0),trim($data['review_text']??''),$id]); logActivity($db,currentUserId(),'edit_review','Edited landlord review #'.$id); jsonResponse(['success'=>true]); }catch(Throwable $e){ jsonError('Could not edit review.',500); }
