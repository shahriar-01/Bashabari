<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireAdmin();
$data=getRequestData();
try{ $db=getDB(); $stmt=$db->prepare('UPDATE admin_settings SET site_name=?,tagline=?,support_email=?,social_facebook=?,social_instagram=?,social_twitter=?,maintenance_mode=? WHERE id=1'); $stmt->execute([trim($data['site_name']??'BashaBari'),trim($data['tagline']??''),trim($data['support_email']??''),trim($data['social_facebook']??''),trim($data['social_instagram']??''),trim($data['social_twitter']??''),parseBool($data['maintenance_mode']??0)]); logActivity($db,currentUserId(),'save_settings','Saved admin settings'); jsonResponse(['success'=>true]); }catch(Throwable $e){ jsonError('Could not save settings.',500); }
