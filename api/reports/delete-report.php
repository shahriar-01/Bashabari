<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireAdmin();
$data=getRequestData(); $id=(int)($data['report_id']??$data['id']??0); if($id<=0) jsonError('report_id is required.');
try{ $db=getDB(); $db->prepare('DELETE FROM reports WHERE id=?')->execute([$id]); logActivity($db,currentUserId(),'delete_report','Deleted report #'.$id); jsonResponse(['success'=>true]); }catch(Throwable $e){ jsonError('Could not delete report.',500); }
