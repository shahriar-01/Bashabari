<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireAdmin();
$data = getRequestData(); $listingId=(int)($data['listing_id']??0); if($listingId<=0) jsonError('listing_id is required.');
try { $db=getDB(); $stmt=$db->prepare('SELECT user_id FROM listings WHERE id=?'); $stmt->execute([$listingId]); $row=$stmt->fetch(); if(!$row) jsonError('Listing not found.',404); $db->prepare("UPDATE listings SET status='published', created_at=NOW(), updated_at=NOW() WHERE id=?")->execute([$listingId]); sendNotification($db,(int)$row['user_id'],'admin','Your listing has been approved.',$listingId); logActivity($db,currentUserId(),'approve_listing','Approved listing #'.$listingId); jsonResponse(['success'=>true]); } catch(Throwable $e){ jsonError('Could not approve listing.',500); }
