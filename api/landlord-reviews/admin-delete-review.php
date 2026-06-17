<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireAdmin();
$data=getRequestData(); $id=(int)($data['review_id']??$data['id']??0); if($id<=0) jsonError('review_id is required.');
try{ $db=getDB(); $db->prepare('DELETE FROM landlord_reviews WHERE id=?')->execute([$id]); logActivity($db,currentUserId(),'admin_delete_review','Admin deleted review #'.$id); jsonResponse(['success'=>true]); }catch(Throwable $e){ jsonError('Could not delete review.',500); }
