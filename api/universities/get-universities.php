<?php
require_once '../../config/auth.php';
requestMethod('GET');
try{ $db=getDB(); $universities=$db->query('SELECT id,name,short_name,district,address FROM universities ORDER BY name ASC')->fetchAll(); jsonResponse(['success'=>true,'universities'=>$universities]); }catch(Throwable $e){ jsonError('Could not fetch universities.',500); }
