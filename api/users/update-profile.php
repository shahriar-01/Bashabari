<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireLogin();
$data=getRequestData(); $name=trim($data['full_name']??$data['name']??''); $email=trim($data['email']??''); if($name==='') jsonError('Full name is required.'); if($email!=='' && !filter_var($email,FILTER_VALIDATE_EMAIL)) jsonError('Invalid email address.');
try{ $db=getDB(); $universityId=resolveUniversityId($db, $data['university_id'] ?? $data['university'] ?? null); if($email!==''){ $chk=$db->prepare('SELECT id FROM users WHERE email=? AND id<>? LIMIT 1'); $chk->execute([$email,currentUserId()]); if($chk->fetch()) jsonError('Email is already used by another account.'); } else { $email=$_SESSION['email']??''; } $db->prepare('UPDATE users SET full_name=?, email=?, phone=?, university_id=? WHERE id=?')->execute([$name,$email,trim($data['phone']??''),$universityId,currentUserId()]); $user=userRowWithUniversity($db,currentUserId()); setSession($user); logActivity($db,currentUserId(),'update_profile','Updated own profile'); jsonResponse(['success'=>true,'user'=>publicUserPayload($user)]); }catch(Throwable $e){ jsonError('Could not update profile.',500); }
