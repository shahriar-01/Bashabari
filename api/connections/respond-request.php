<?php
require_once '../../config/auth.php';
requestMethod('POST');
$user=requireLogin();
$data=getRequestData(); $id=(int)($data['request_id']??0); $action=$data['action']??''; if($id<=0||!in_array($action,['accept','decline'],true)) jsonError('request_id and valid action are required.'); $status=$action==='accept'?'accepted':'declined';
try{ $db=getDB(); $stmt=$db->prepare('SELECT * FROM connection_requests WHERE id=?'); $stmt->execute([$id]); $req=$stmt->fetch(); if(!$req) jsonError('Request not found.',404); if((int)$req['receiver_id']!==currentUserId()) jsonError('Permission denied.',403); $db->prepare('UPDATE connection_requests SET status=? WHERE id=?')->execute([$status,$id]); if($status==='accepted') sendNotification($db,(int)$req['sender_id'],'connection',($user['name']??'Someone').' accepted your request.',$id); logActivity($db,currentUserId(),'respond_connection','Connection request #'.$id.' '.$status); jsonResponse(['success'=>true,'status'=>$status,'connection_id'=>$id]); }catch(Throwable $e){ jsonError('Could not respond to request.',500); }
