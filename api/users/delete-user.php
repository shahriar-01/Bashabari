<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireAdmin();
$data=getRequestData(); $id=(int)($data['user_id']??$data['id']??0); if($id<=0) jsonError('user_id is required.'); if($id===currentUserId()) jsonError('You cannot delete yourself.');
try{ $db=getDB(); $db->prepare('DELETE FROM users WHERE id=?')->execute([$id]); logActivity($db,currentUserId(),'delete_user','Deleted user #'.$id); jsonResponse(['success'=>true]); }catch(Throwable $e){ jsonError('Could not delete user.',500); }
