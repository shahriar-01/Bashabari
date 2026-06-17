<?php
require_once '../../config/auth.php';
requestMethod('GET');
$featuredOnly=(($_GET['featured']??'')==='1'||($_GET['featured']??'')==='true');
if(!$featuredOnly) requireAdmin();
try{ $db=getDB(); $where=$featuredOnly?'WHERE fm.is_featured=1':''; $stmt=$db->query("SELECT fm.*, u.full_name AS user_name, u.email AS user_email FROM feedback_messages fm LEFT JOIN users u ON u.id=fm.user_id $where ORDER BY fm.created_at DESC"); $feedback=array_map(fn($r)=>['id'=>(int)$r['id'],'user_id'=>$r['user_id']?(int)$r['user_id']:null,'user_name'=>$r['user_name'],'user_email'=>$r['user_email'],'topic'=>$r['topic'],'star_rating'=>$r['star_rating']?(int)$r['star_rating']:null,'description'=>$r['description'],'is_featured'=>(int)$r['is_featured'],'created_at'=>$r['created_at']],$stmt->fetchAll()); jsonResponse(['success'=>true,'feedback'=>$feedback,'messages'=>$feedback]); }catch(Throwable $e){ jsonError('Could not fetch feedback.',500); }
