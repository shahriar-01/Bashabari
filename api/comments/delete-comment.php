<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireLogin();
$data=getRequestData(); $id=(int)($data['comment_id']??0); if($id<=0) jsonError('comment_id is required.');
try{ $db=getDB(); $stmt=$db->prepare('SELECT user_id FROM comments WHERE id=?'); $stmt->execute([$id]); $row=$stmt->fetch(); if(!$row) jsonError('Comment not found.',404); if((int)$row['user_id']!==currentUserId()&&!isAdminUser()) jsonError('Permission denied.',403); $db->prepare('DELETE FROM comments WHERE id=?')->execute([$id]); logActivity($db,currentUserId(),'delete_comment','Deleted comment #'.$id); jsonResponse(['success'=>true]); }catch(Throwable $e){ jsonError('Could not delete comment.',500); }
