<?php
require_once '../../config/auth.php';
requestMethod('GET');
try{
$db=getDB(); $where=['rp.is_published=1','rp.profile_visible=1','u.is_banned=0']; $params=[];
if(!empty($_GET['university_id'])){ $where[]='u.university_id=?'; $params[]=(int)$_GET['university_id']; }
if(!empty($_GET['gender'])){ $g=strtolower($_GET['gender']); if(in_array($g,['male','female','other'],true)){ $where[]='u.gender=?'; $params[]=$g; } }
if(!empty($_GET['district_id'])){ $where[]='rp.district_id=?'; $params[]=(int)$_GET['district_id']; }
if(!empty($_GET['area_id'])){ $where[]='EXISTS (SELECT 1 FROM roommate_preferred_areas rpa WHERE rpa.roommate_profile_id=rp.id AND rpa.area_id=?)'; $params[]=(int)$_GET['area_id']; }
if(!empty($_GET['budget_range'])){ [$min,$max]=array_pad(explode('-',$_GET['budget_range']),2,null); if(is_numeric($min)){$where[]='rp.budget_max>=?';$params[]=(int)$min;} if(is_numeric($max)){$where[]='rp.budget_min<=?';$params[]=(int)$max;} }
foreach(normalizeArray($_GET['lifestyle_tags']??'') as $tag){ $where[]='EXISTS (SELECT 1 FROM roommate_tags rt2 WHERE rt2.roommate_profile_id=rp.id AND rt2.tag_name=?)'; $params[]=$tag; }
if(!empty($_GET['search'])){ $q='%'.trim($_GET['search']).'%'; $where[]='(u.full_name LIKE ? OR un.name LIKE ? OR rp.description LIKE ? OR EXISTS (SELECT 1 FROM roommate_tags rt3 WHERE rt3.roommate_profile_id=rp.id AND rt3.tag_name LIKE ?))'; array_push($params,$q,$q,$q,$q); }
$whereSql='WHERE '.implode(' AND ',$where); $countSql="SELECT COUNT(*) AS total FROM roommate_profiles rp JOIN users u ON u.id=rp.user_id LEFT JOIN universities un ON un.id=u.university_id $whereSql"; $stmt=$db->prepare($countSql); $stmt->execute($params); $total=(int)$stmt->fetch()['total'];
$page=max(1,(int)($_GET['page']??1)); $limit=min(50,max(1,(int)($_GET['limit']??12))); $offset=($page-1)*$limit;
$sql="SELECT rp.*, u.full_name,u.gender,u.email,u.profile_picture,u.university_id, un.name AS university, un.short_name, d.name AS district,
(SELECT GROUP_CONCAT(a.name ORDER BY a.name SEPARATOR ',') FROM roommate_preferred_areas rpa JOIN areas a ON a.id=rpa.area_id WHERE rpa.roommate_profile_id=rp.id) AS areas,
(SELECT GROUP_CONCAT(a.id ORDER BY a.name SEPARATOR ',') FROM roommate_preferred_areas rpa JOIN areas a ON a.id=rpa.area_id WHERE rpa.roommate_profile_id=rp.id) AS area_ids,
(SELECT GROUP_CONCAT(rt.tag_name ORDER BY rt.id SEPARATOR ',') FROM roommate_tags rt WHERE rt.roommate_profile_id=rp.id) AS tags
FROM roommate_profiles rp JOIN users u ON u.id=rp.user_id LEFT JOIN universities un ON un.id=u.university_id LEFT JOIN districts d ON d.id=rp.district_id $whereSql ORDER BY rp.updated_at DESC LIMIT :limit OFFSET :offset";
$stmt=$db->prepare($sql); foreach($params as $i=>$v)$stmt->bindValue($i+1,$v); $stmt->bindValue(':limit',$limit,PDO::PARAM_INT); $stmt->bindValue(':offset',$offset,PDO::PARAM_INT); $stmt->execute();
$profiles=[]; foreach($stmt->fetchAll() as $r){ $profiles[]=['id'=>(int)$r['id'],'user_id'=>(int)$r['user_id'],'name'=>$r['full_name'],'full_name'=>$r['full_name'],'gender'=>$r['gender'],'university_id'=>$r['university_id']?(int)$r['university_id']:null,'university'=>$r['university'],'university_short'=>$r['short_name'],'profile_picture'=>$r['profile_picture'],'budget_min'=>$r['budget_min']?(int)$r['budget_min']:null,'budget_max'=>$r['budget_max']?(int)$r['budget_max']:null,'district_id'=>$r['district_id']?(int)$r['district_id']:null,'district'=>$r['district'],'preferred_areas'=>$r['areas']?explode(',',$r['areas']):[],'area_ids'=>$r['area_ids']?array_map('intval',explode(',',$r['area_ids'])):[],'move_in_month'=>$r['move_in_month']?(int)$r['move_in_month']:null,'move_in_year'=>$r['move_in_year']?(int)$r['move_in_year']:null,'description'=>$r['description'],'tags'=>$r['tags']?explode(',',$r['tags']):[],'is_published'=>(int)$r['is_published'],'profile_visible'=>(int)$r['profile_visible'],'created_at'=>$r['created_at'],'updated_at'=>$r['updated_at']]; }
jsonResponse(['success'=>true,'profiles'=>$profiles,'total'=>$total,'page'=>$page,'limit'=>$limit]);
}catch(Throwable $e){ jsonError('Could not fetch roommate profiles.',500); }
