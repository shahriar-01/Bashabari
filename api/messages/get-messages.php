<?php
require_once '../../config/auth.php';
requestMethod('GET');
requireLogin();
$connectionId=(int)($_GET['connection_id']??0); $afterId=(int)($_GET['after_id']??0); if($connectionId<=0) jsonError('connection_id is required.');
try{ $db=getDB(); $stmt=$db->prepare("SELECT * FROM connection_requests WHERE id=? AND status='accepted'"); $stmt->execute([$connectionId]); $conn=$stmt->fetch(); if(!$conn) jsonError('Conversation not found.',404); if((int)$conn['sender_id']!==currentUserId()&&(int)$conn['receiver_id']!==currentUserId()) jsonError('Permission denied.',403);
if($afterId>0){ $stmt=$db->prepare('SELECT * FROM messages WHERE connection_id=? AND id>? ORDER BY id ASC'); $stmt->execute([$connectionId,$afterId]); } else { $stmt=$db->prepare('SELECT * FROM messages WHERE connection_id=? ORDER BY id ASC'); $stmt->execute([$connectionId]); }
$messages=array_map(fn($m)=>['id'=>(int)$m['id'],'connection_id'=>(int)$m['connection_id'],'sender_id'=>(int)$m['sender_id'],'message_text'=>$m['message_text'],'image_path'=>$m['image_path'],'is_seen'=>(int)$m['is_seen'],'created_at'=>$m['created_at']],$stmt->fetchAll());
$db->prepare('UPDATE messages SET is_seen=1 WHERE connection_id=? AND sender_id<>? AND is_seen=0')->execute([$connectionId,currentUserId()]);
jsonResponse(['success'=>true,'messages'=>$messages]); }catch(Throwable $e){ jsonError('Could not fetch messages.',500); }
