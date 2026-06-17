<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireAdmin();
$data=getRequestData(); $id=(int)($data['user_id']??$data['id']??0); if($id<=0) jsonError('user_id is required.');
try{ $db=getDB(); $stmt=$db->prepare('SELECT is_verified FROM users WHERE id=?'); $stmt->execute([$id]); $row=$stmt->fetch(); if(!$row) jsonError('User not found.',404); $new=(int)!((int)$row['is_verified']); $db->prepare('UPDATE users SET is_verified=? WHERE id=?')->execute([$new,$id]); sendNotification($db,$id,'admin',$new?'You received a verified badge.':'Your verified badge was removed.',null); logActivity($db,currentUserId(),'give_badge','Toggled user badge #'.$id); jsonResponse(['success'=>true,'is_verified'=>$new]); }catch(Throwable $e){ jsonError('Could not update badge.',500); }
