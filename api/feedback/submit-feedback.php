<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireLogin();
$data=getRequestData(); $topic=trim($data['topic']??''); if($topic==='') jsonError('Topic is required.');
try{ $db=getDB(); $stmt=$db->prepare('INSERT INTO feedback_messages (user_id,topic,star_rating,description) VALUES (?,?,?,?)'); $stmt->execute([currentUserId(),$topic,($data['star_rating']??'')!==''?(int)$data['star_rating']:null,trim($data['description']??'')]); logActivity($db,currentUserId(),'submit_feedback','Submitted feedback'); jsonResponse(['success'=>true]); }catch(Throwable $e){ jsonError('Could not submit feedback.',500); }
