<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireAdmin();
$data=getRequestData(); $cur=(string)($data['current_password']??''); $new=(string)($data['new_password']??''); $conf=(string)($data['confirm_new_password']??$data['confirm_password']??''); if($cur===''||$new===''||$conf==='') jsonError('All password fields are required.'); if($new!==$conf) jsonError('Passwords do not match.');
try{ $db=getDB(); $stmt=$db->prepare('SELECT password_hash FROM users WHERE id=?'); $stmt->execute([currentUserId()]); $row=$stmt->fetch(); if(!$row||!password_verify($cur,$row['password_hash'])) jsonError('Current password is incorrect.'); $db->prepare('UPDATE users SET password_hash=? WHERE id=?')->execute([password_hash($new,PASSWORD_BCRYPT),currentUserId()]); logActivity($db,currentUserId(),'change_admin_password','Admin changed password'); jsonResponse(['success'=>true]); }catch(Throwable $e){ jsonError('Could not change password.',500); }
