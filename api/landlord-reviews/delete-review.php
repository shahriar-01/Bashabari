<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireLogin();
$data=getRequestData(); $id=(int)($data['review_id']??$data['id']??0); if($id<=0) jsonError('review_id is required.');
try{ $db=getDB(); $stmt=$db->prepare('SELECT user_id FROM landlord_reviews WHERE id=?'); $stmt->execute([$id]); $row=$stmt->fetch(); if(!$row) jsonError('Review not found.',404); if((int)$row['user_id']!==currentUserId()&&!isAdminUser()) jsonError('Permission denied.',403); $db->prepare('DELETE FROM landlord_reviews WHERE id=?')->execute([$id]); logActivity($db,currentUserId(),'delete_review','Deleted landlord review #'.$id); jsonResponse(['success'=>true]); }catch(Throwable $e){ jsonError('Could not delete review.',500); }
