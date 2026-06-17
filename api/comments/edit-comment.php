<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireLogin();
$data=getRequestData(); $id=(int)($data['comment_id']??0); $text=trim($data['comment_text']??$data['text']??''); if($id<=0||$text==='') jsonError('Comment and text are required.');
try{ $db=getDB(); $stmt=$db->prepare('SELECT user_id FROM comments WHERE id=?'); $stmt->execute([$id]); $row=$stmt->fetch(); if(!$row) jsonError('Comment not found.',404); if((int)$row['user_id']!==currentUserId()) jsonError('Permission denied.',403); $db->prepare('UPDATE comments SET comment_text=? WHERE id=?')->execute([$text,$id]); jsonResponse(['success'=>true]); }catch(Throwable $e){ jsonError('Could not edit comment.',500); }
