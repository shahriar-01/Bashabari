<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireAdmin();
$data=getRequestData(); $id=(int)($data['user_id']??$data['id']??0); if($id<=0) jsonError('user_id is required.');
try{ $db=getDB(); $stmt=$db->prepare('SELECT is_banned FROM users WHERE id=?'); $stmt->execute([$id]); $row=$stmt->fetch(); if(!$row) jsonError('User not found.',404); $new=array_key_exists('is_banned',$data)?parseBool($data['is_banned']):(int)!((int)$row['is_banned']); $db->prepare('UPDATE users SET is_banned=? WHERE id=?')->execute([$new,$id]); logActivity($db,currentUserId(),'ban_user',($new?'Banned':'Unbanned').' user #'.$id); jsonResponse(['success'=>true,'is_banned'=>$new]); }catch(Throwable $e){ jsonError('Could not update ban status.',500); }
