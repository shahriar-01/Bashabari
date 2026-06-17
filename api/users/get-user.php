<?php
require_once '../../config/auth.php';
requestMethod('GET');
requireAdmin();
$id=(int)($_GET['id']??$_GET['user_id']??0); if($id<=0) jsonError('user id is required.');
try{ $db=getDB(); $user=userRowWithUniversity($db,$id); if(!$user) jsonError('User not found.',404); $payload=publicUserPayload($user)+['is_verified'=>(int)$user['is_verified'],'is_banned'=>(int)$user['is_banned'],'created_at'=>$user['created_at'],'updated_at'=>$user['updated_at']]; jsonResponse(['success'=>true,'user'=>$payload]); }catch(Throwable $e){ jsonError('Could not fetch user.',500); }
