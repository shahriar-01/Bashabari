<?php
require_once '../../config/auth.php';
requestMethod('GET');
requireLogin();
try{
    $db=getDB(); $uid=currentUserId();
    $one=function($sql)use($db,$uid){$s=$db->prepare($sql);$s->execute([$uid]);return (int)$s->fetch()['c'];};
    $s=$db->prepare("SELECT COUNT(*) c FROM connection_requests WHERE status='accepted' AND (sender_id=? OR receiver_id=?)"); $s->execute([$uid,$uid]); $connections=(int)$s->fetch()['c'];
    jsonResponse(['success'=>true,'stats'=>[
        'listings'=>$one("SELECT COUNT(*) c FROM listings WHERE user_id=? AND status<>'deleted'"),
        'favorites'=>$one('SELECT COUNT(*) c FROM favorites WHERE user_id=?'),
        'connections'=>$connections,
        'reviews'=>$one('SELECT COUNT(*) c FROM landlord_reviews WHERE user_id=?')
    ]]);
}catch(Throwable $e){ jsonError('Could not fetch stats.',500); }
