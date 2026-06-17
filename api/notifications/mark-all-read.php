<?php
require_once '../../config/auth.php';
requestMethod('POST');
requireLogin();
try{ $db=getDB(); $db->prepare('UPDATE notifications SET is_read=1 WHERE user_id=?')->execute([currentUserId()]); jsonResponse(['success'=>true]); }catch(Throwable $e){ jsonError('Could not mark notifications.',500); }
