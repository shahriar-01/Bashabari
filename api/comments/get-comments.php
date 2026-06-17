<?php
require_once '../../config/auth.php';
requestMethod('GET');
$listingId=(int)($_GET['listing_id']??0); if($listingId<=0) jsonError('listing_id is required.');
try{ $db=getDB(); $stmt=$db->prepare('SELECT c.*, u.full_name AS user_name, u.profile_picture FROM comments c JOIN users u ON u.id=c.user_id WHERE c.listing_id=? ORDER BY c.created_at ASC'); $stmt->execute([$listingId]); $comments=array_map(fn($c)=>['id'=>(int)$c['id'],'listing_id'=>(int)$c['listing_id'],'user_id'=>(int)$c['user_id'],'user_name'=>$c['user_name'],'profile_picture'=>$c['profile_picture'],'comment_text'=>$c['comment_text'],'text'=>$c['comment_text'],'created_at'=>$c['created_at'],'updated_at'=>$c['updated_at']],$stmt->fetchAll()); jsonResponse(['success'=>true,'comments'=>$comments]); }catch(Throwable $e){ jsonError('Could not fetch comments.',500); }
