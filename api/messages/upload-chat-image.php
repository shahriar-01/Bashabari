<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireLogin();
try{ $path=safeUpload('image','uploads/chat',['image/jpeg'=>'jpg','image/png'=>'png','image/webp'=>'webp','image/gif'=>'gif'],5*1024*1024); if(!$path) jsonError('No image uploaded.'); jsonResponse(['success'=>true,'image_path'=>$path]); }catch(Throwable $e){ jsonError('Could not upload chat image.',500); }
