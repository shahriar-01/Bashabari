<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireAdmin();
$data=getRequestData(); $id=(int)($data['feedback_id']??$data['id']??0); if($id<=0) jsonError('feedback_id is required.');
try{ $db=getDB(); $db->prepare('DELETE FROM feedback_messages WHERE id=?')->execute([$id]); logActivity($db,currentUserId(),'delete_feedback','Deleted feedback #'.$id); jsonResponse(['success'=>true]); }catch(Throwable $e){ jsonError('Could not delete feedback.',500); }
