<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireAdmin();
$data=getRequestData(); $id=(int)($data['report_id']??$data['id']??0); $status=$data['status']??''; if($id<=0||!in_array($status,['new','in_review','resolved'],true)) jsonError('report_id and valid status are required.');
try{ $db=getDB(); $db->prepare('UPDATE reports SET status=? WHERE id=?')->execute([$status,$id]); logActivity($db,currentUserId(),'update_report_status','Updated report #'.$id.' to '.$status); jsonResponse(['success'=>true]); }catch(Throwable $e){ jsonError('Could not update report.',500); }
