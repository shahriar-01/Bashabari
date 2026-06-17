<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireLogin();
try{ $path=safeUpload('avatar','uploads/avatars',['image/jpeg'=>'jpg','image/png'=>'png','image/webp'=>'webp'],2*1024*1024); if(!$path) jsonError('No avatar uploaded.'); $db=getDB(); $db->prepare('UPDATE users SET profile_picture=? WHERE id=?')->execute([$path,currentUserId()]); $_SESSION['profile_picture']=$path; jsonResponse(['success'=>true,'profile_picture'=>$path]); }catch(Throwable $e){ jsonError('Could not upload avatar.',500); }
