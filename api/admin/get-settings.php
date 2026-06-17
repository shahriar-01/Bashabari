<?php
require_once '../../config/auth.php';
requestMethod('GET');
requireAdmin();
try{ $db=getDB(); $row=$db->query('SELECT * FROM admin_settings WHERE id=1')->fetch(); jsonResponse(['success'=>true,'settings'=>$row]); }catch(Throwable $e){ jsonError('Could not fetch settings.',500); }
