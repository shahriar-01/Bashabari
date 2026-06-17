<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireAdmin();
$data=getRequestData(); $id=(int)($data['user_id']??$data['id']??0); if($id<=0) jsonError('user_id is required.');
try{ $db=getDB(); $stmt=$db->prepare('UPDATE users SET full_name=?, phone=?, gender=?, university_id=?, student_id=?, is_verified=?, is_banned=?, role=? WHERE id=?'); $stmt->execute([trim($data['full_name']??$data['name']??''),trim($data['phone']??''),strtolower($data['gender']??'other')?:null,($data['university_id']??'')!==''?(int)$data['university_id']:null,trim($data['student_id']??''),parseBool($data['is_verified']??0),parseBool($data['is_banned']??0),($data['role']??'student')==='admin'?'admin':'student',$id]); logActivity($db,currentUserId(),'update_user','Updated user #'.$id); jsonResponse(['success'=>true]); }catch(Throwable $e){ jsonError('Could not update user.',500); }
