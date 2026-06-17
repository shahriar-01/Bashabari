<?php
require_once '../../config/auth.php';
requestMethod('GET');
requireLogin();
try{
  $db=getDB(); $uid=currentUserId();
  $stmt=$db->prepare("SELECT cr.*, 
    otheru.id AS other_id, otheru.full_name AS other_name, otheru.email AS other_email, otheru.profile_picture, otheru.gender, un.name AS university,
    rp.budget_min, rp.budget_max, rp.move_in_month, rp.move_in_year, rp.description,
    d.name AS district,
    (SELECT GROUP_CONCAT(a.name ORDER BY a.name SEPARATOR ',') FROM roommate_preferred_areas rpa JOIN areas a ON a.id=rpa.area_id WHERE rpa.roommate_profile_id=rp.id) AS preferred_areas,
    (SELECT GROUP_CONCAT(rt.tag_name ORDER BY rt.id SEPARATOR ',') FROM roommate_tags rt WHERE rt.roommate_profile_id=rp.id) AS tags
    FROM connection_requests cr
    JOIN users otheru ON otheru.id = CASE WHEN cr.sender_id=? THEN cr.receiver_id ELSE cr.sender_id END
    LEFT JOIN universities un ON un.id=otheru.university_id
    LEFT JOIN roommate_profiles rp ON rp.user_id=otheru.id
    LEFT JOIN districts d ON d.id=rp.district_id
    WHERE (cr.receiver_id=? OR cr.sender_id=?) AND cr.status='pending'
    ORDER BY cr.created_at DESC");
  $stmt->execute([$uid,$uid,$uid]);
  $requests=[]; $incoming=[]; $outgoing=[];
  foreach($stmt->fetchAll() as $r){
    $direction=((int)$r['receiver_id']===$uid)?'incoming':'outgoing';
    $item=['request_id'=>(int)$r['id'],'id'=>(int)$r['id'],'sender_id'=>(int)$r['sender_id'],'receiver_id'=>(int)$r['receiver_id'],'direction'=>$direction,'source'=>$r['source'],'listing_id'=>$r['listing_id']?(int)$r['listing_id']:null,'created_at'=>$r['created_at'],'status'=>$r['status'],
      'other_user'=>['id'=>(int)$r['other_id'],'name'=>$r['other_name'],'email'=>$r['other_email'],'profile_picture'=>$r['profile_picture'],'gender'=>$r['gender'],'university'=>$r['university'],'district'=>$r['district'],'budget_min'=>$r['budget_min']?(int)$r['budget_min']:null,'budget_max'=>$r['budget_max']?(int)$r['budget_max']:null,'move_in_month'=>$r['move_in_month']?(int)$r['move_in_month']:null,'move_in_year'=>$r['move_in_year']?(int)$r['move_in_year']:null,'description'=>$r['description'],'preferred_areas'=>$r['preferred_areas']?explode(',',$r['preferred_areas']):[],'tags'=>$r['tags']?explode(',',$r['tags']):[]],
      'sender'=>null,'name'=>$r['other_name'],'university'=>$r['university'],'profile_picture'=>$r['profile_picture']];
    if($direction==='incoming') $item['sender']=$item['other_user'];
    $requests[]=$item; if($direction==='incoming') $incoming[]=$item; else $outgoing[]=$item;
  }
  jsonResponse(['success'=>true,'requests'=>$requests,'incoming'=>$incoming,'outgoing'=>$outgoing]);
}catch(Throwable $e){ jsonError('Could not fetch requests.',500); }
