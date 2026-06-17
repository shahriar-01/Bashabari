<?php
require_once '../../config/auth.php';
requestMethod('GET');
try{ $db=getDB(); $districts=$db->query('SELECT id,name FROM districts ORDER BY name ASC')->fetchAll(); jsonResponse(['success'=>true,'districts'=>$districts]); }catch(Throwable $e){ jsonError('Could not fetch districts.',500); }
