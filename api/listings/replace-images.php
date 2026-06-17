<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireLogin();
$listingId=(int)($_POST['listing_id']??0); if($listingId<=0) jsonError('listing_id is required.');
try{
  $db=getDB(); $stmt=$db->prepare('SELECT user_id FROM listings WHERE id=?'); $stmt->execute([$listingId]); $row=$stmt->fetch();
  if(!$row) jsonError('Listing not found.',404); if((int)$row['user_id']!==currentUserId()&&!isAdminUser()) jsonError('Permission denied.',403);
  if(parseBool($_POST['remove_existing']??0) || !empty($_FILES['image'])) $db->prepare('DELETE FROM listing_images WHERE listing_id=?')->execute([$listingId]);
  $path=null;
  if(!empty($_FILES['image']) && ($_FILES['image']['error']??UPLOAD_ERR_NO_FILE)!==UPLOAD_ERR_NO_FILE){
    $path=safeUpload('image','uploads/listings',['image/jpeg'=>'jpg','image/png'=>'png','image/webp'=>'webp','image/gif'=>'gif'],5*1024*1024);
    $db->prepare('INSERT INTO listing_images (listing_id,image_path,sort_order) VALUES (?,?,0)')->execute([$listingId,$path]);
  }
  logActivity($db,currentUserId(),'update_listing_images','Updated images for listing #'.$listingId);
  jsonResponse(['success'=>true,'image_path'=>$path]);
}catch(Throwable $e){ jsonError('Could not update listing image.',500); }
