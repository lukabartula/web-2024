
<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

Flight::route('/*', function(){
    if(
        strpos(Flight::request()->url, '/users/login') === 0 ||
        strpos(Flight::request()->url, '/users/register') === 0
    ) {        return TRUE;
    } else {
        try {
            $token = Flight::request()->getHeader('Authentication');
            if (!$token){
                Flight::halt(401, 'Token not provided');
            }
            $decoded_token = JWT::decode($token, new Key(JWT_SECRET, "HS256"));
    
            Flight::set('user', $decoded_token->user);
            Flight::set('jwt_token', $token);
            return TRUE;
    
        } catch (Exception $e) {
            Flight::halt(401, $e->getMessage());
        }
    }
});

Flight::map('error', function($e){
    Flight::halt($e->getCode(), $e->getMessage());
    Flight::stop($e->getCode());
});
