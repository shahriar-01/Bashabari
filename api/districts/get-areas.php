<?php
require_once '../../config/auth.php';
requestMethod('GET');
$districtId=(int)($_GET['district_id']??0); if($districtId<=0) jsonResponse(['success'=>true,'areas'=>[]]);
try{ $db=getDB(); $stmt=$db->prepare('SELECT id,name,district_id FROM areas WHERE district_id=? ORDER BY name ASC'); $stmt->execute([$districtId]); jsonResponse(['success'=>true,'areas'=>$stmt->fetchAll()]); }catch(Throwable $e){ jsonError('Could not fetch areas.',500); }
