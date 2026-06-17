<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireLogin();
$data=getRequestData(); $id=$data['notification_id']??''; try{ $db=getDB(); if($id==='all'){ $db->prepare('UPDATE notifications SET is_read=1 WHERE user_id=?')->execute([currentUserId()]); } else { $id=(int)$id; if($id<=0) jsonError('notification_id is required.'); $db->prepare('UPDATE notifications SET is_read=1 WHERE id=? AND user_id=?')->execute([$id,currentUserId()]); } jsonResponse(['success'=>true]); }catch(Throwable $e){ jsonError('Could not mark notification.',500); }
