<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireAdmin();
$data=getRequestData(); $listingId=(int)($data['listing_id']??0); if($listingId<=0) jsonError('listing_id is required.');
try{ $db=getDB(); $stmt=$db->prepare('SELECT user_id,is_verified FROM listings WHERE id=?'); $stmt->execute([$listingId]); $row=$stmt->fetch(); if(!$row) jsonError('Listing not found.',404); $new=(int)!((int)$row['is_verified']); $db->prepare('UPDATE listings SET is_verified=? WHERE id=?')->execute([$new,$listingId]); sendNotification($db,(int)$row['user_id'],'admin',$new?'Your listing received a verified badge.':'Verified badge was removed from your listing.',$listingId); logActivity($db,currentUserId(),'verify_listing','Toggled verified badge for listing #'.$listingId); jsonResponse(['success'=>true,'is_verified'=>$new]); }catch(Throwable $e){ jsonError('Could not update badge.',500); }
