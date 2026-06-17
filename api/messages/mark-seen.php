<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireLogin();
$data=getRequestData(); $connectionId=(int)($data['connection_id']??0); if($connectionId<=0) jsonError('connection_id is required.');
try{ $db=getDB(); $stmt=$db->prepare('SELECT * FROM connection_requests WHERE id=?'); $stmt->execute([$connectionId]); $conn=$stmt->fetch(); if(!$conn) jsonError('Conversation not found.',404); if((int)$conn['sender_id']!==currentUserId()&&(int)$conn['receiver_id']!==currentUserId()) jsonError('Permission denied.',403); $db->prepare('UPDATE messages SET is_seen=1 WHERE connection_id=? AND sender_id<>? AND is_seen=0')->execute([$connectionId,currentUserId()]); jsonResponse(['success'=>true]); }catch(Throwable $e){ jsonError('Could not mark messages as seen.',500); }
