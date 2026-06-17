<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireLogin();
try{ $db=getDB(); $stmt=$db->prepare('SELECT id,is_published FROM roommate_profiles WHERE user_id=?'); $stmt->execute([currentUserId()]); $row=$stmt->fetch(); if(!$row) jsonError('Create your roommate profile first.',404); $new=(int)!((int)$row['is_published']); $db->prepare('UPDATE roommate_profiles SET is_published=?, profile_visible=1 WHERE id=?')->execute([$new,(int)$row['id']]); logActivity($db,currentUserId(),'toggle_roommate_profile','Toggled roommate profile visibility'); jsonResponse(['success'=>true,'is_published'=>$new]); }catch(Throwable $e){ jsonError('Could not toggle profile.',500); }
