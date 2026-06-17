<?php
require_once '../../config/auth.php';
requestMethod('POST');
$user=requireLogin();
$data=getRequestData(); $listingId=(int)($data['listing_id']??0); $text=trim($data['comment_text']??$data['text']??''); if($listingId<=0||$text==='') jsonError('Listing and comment text are required.');
try{ $db=getDB(); $stmt=$db->prepare('INSERT INTO comments (user_id,listing_id,comment_text) VALUES (?,?,?)'); $stmt->execute([currentUserId(),$listingId,$text]); $id=(int)$db->lastInsertId(); $stmt=$db->prepare('SELECT user_id,title FROM listings WHERE id=?'); $stmt->execute([$listingId]); $listing=$stmt->fetch(); if($listing && (int)$listing['user_id']!==currentUserId()) sendNotification($db,(int)$listing['user_id'],'comment',($user['name']??'Someone').' commented on your listing.',$listingId); logActivity($db,currentUserId(),'add_comment','Added comment on listing #'.$listingId); jsonResponse(['success'=>true,'comment'=>['id'=>$id,'listing_id'=>$listingId,'user_id'=>currentUserId(),'user_name'=>$user['name']??'','comment_text'=>$text,'text'=>$text,'created_at'=>date('Y-m-d H:i:s')]]); }catch(Throwable $e){ jsonError('Could not add comment.',500); }
