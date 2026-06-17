<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireLogin();
$data=getRequestData(); $id=(int)($data['connection_id']??0); if($id<=0) jsonError('connection_id is required.');
try{ $db=getDB(); $stmt=$db->prepare('SELECT * FROM connection_requests WHERE id=?'); $stmt->execute([$id]); $row=$stmt->fetch(); if(!$row) jsonError('Connection not found.',404); if((int)$row['sender_id']!==currentUserId()&&(int)$row['receiver_id']!==currentUserId()) jsonError('Permission denied.',403); $db->prepare('DELETE FROM connection_requests WHERE id=?')->execute([$id]); logActivity($db,currentUserId(),'disconnect','Disconnected connection #'.$id); jsonResponse(['success'=>true]); }catch(Throwable $e){ jsonError('Could not disconnect.',500); }
