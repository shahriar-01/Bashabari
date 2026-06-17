<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireLogin();
$data=getRequestData(); $cur=(string)($data['current_password']??''); $new=(string)($data['new_password']??''); $conf=(string)($data['confirm_new_password']??$data['confirm_password']??''); if($cur===''||$new===''||$conf==='') jsonError('All password fields are required.'); if($new!==$conf) jsonError('New passwords do not match.'); if(strlen($new)<6) jsonError('New password must be at least 6 characters.');
try{ $db=getDB(); $stmt=$db->prepare('SELECT password_hash FROM users WHERE id=?'); $stmt->execute([currentUserId()]); $row=$stmt->fetch(); if(!$row||!password_verify($cur,$row['password_hash'])) jsonError('Current password is incorrect.',400); $hash=password_hash($new,PASSWORD_BCRYPT); $db->prepare('UPDATE users SET password_hash=? WHERE id=?')->execute([$hash,currentUserId()]); logActivity($db,currentUserId(),'change_password','Changed own password'); jsonResponse(['success'=>true]); }catch(Throwable $e){ jsonError('Could not change password.',500); }
