<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireAdmin();
$data=getRequestData(); $id=(int)($data['report_id']??$data['id']??0); $reply=trim($data['reply']??$data['message']??''); if($id<=0||$reply==='') jsonError('report_id and reply are required.');
try{ $db=getDB(); $stmt=$db->prepare('SELECT reported_by_user_id FROM reports WHERE id=?'); $stmt->execute([$id]); $row=$stmt->fetch(); if(!$row) jsonError('Report not found.',404); $db->prepare("UPDATE reports SET admin_reply=?, replied_at=NOW(), status='resolved' WHERE id=?")->execute([$reply,$id]); if($row['reported_by_user_id']) sendNotification($db,(int)$row['reported_by_user_id'],'report_reply','Admin replied to your report: '.$reply,$id); logActivity($db,currentUserId(),'reply_report','Replied to report #'.$id); jsonResponse(['success'=>true]); }catch(Throwable $e){ jsonError('Could not reply to report.',500); }
