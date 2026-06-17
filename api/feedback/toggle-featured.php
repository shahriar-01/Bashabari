<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireAdmin();
$data=getRequestData(); $id=(int)($data['feedback_id']??$data['id']??0); if($id<=0) jsonError('feedback_id is required.');
try{ $db=getDB(); $stmt=$db->prepare('SELECT is_featured FROM feedback_messages WHERE id=?'); $stmt->execute([$id]); $row=$stmt->fetch(); if(!$row) jsonError('Feedback not found.',404); $new=(int)!((int)$row['is_featured']); $db->prepare('UPDATE feedback_messages SET is_featured=? WHERE id=?')->execute([$new,$id]); logActivity($db,currentUserId(),'toggle_feedback_featured','Toggled feedback #'.$id); jsonResponse(['success'=>true,'is_featured'=>$new]); }catch(Throwable $e){ jsonError('Could not update feedback.',500); }
