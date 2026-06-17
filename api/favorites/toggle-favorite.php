<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireLogin();
$data=getRequestData(); $listingId=(int)($data['listing_id']??0); if($listingId<=0) jsonError('listing_id is required.');
try{ $db=getDB(); $stmt=$db->prepare('SELECT id FROM favorites WHERE user_id=? AND listing_id=?'); $stmt->execute([currentUserId(),$listingId]); $row=$stmt->fetch(); if($row){ $db->prepare('DELETE FROM favorites WHERE id=?')->execute([(int)$row['id']]); jsonResponse(['success'=>true,'favorited'=>false]); } else { $db->prepare('INSERT INTO favorites (user_id,listing_id) VALUES (?,?)')->execute([currentUserId(),$listingId]); jsonResponse(['success'=>true,'favorited'=>true]); } }catch(Throwable $e){ jsonError('Could not toggle favorite.',500); }
