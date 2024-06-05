<?php

require_once __DIR__ . "/../services/UserService.class.php";  // This is the same as the line in sneakers_routes.php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


Flight::set('users_service', new UserService());


FLight::group('/users', function(){
    
    /**
     * @OA\Get(
     *      path="/users",
     *      tags={"users"},
     *      summary="Get all users",
     *      security={{"ApiKey": {}}},
     *      @OA\Response(
     *          response=200,
     *          description="Array of users in database",
     *      ),
     *     @OA\Response(
     *        response=401,
     *       description="Unauthorized",
     *   )
     * )
     */


    Flight::route("GET /", function() {

        $data = Flight::get('users_service') ->get_users();
    
        Flight::json($data);
    });
    

    /**
 * @OA\Post(
 *      path="/users/add",
 *      tags={"users"},
 *      summary="Add a new user",
 *      security={{"ApiKey": {}}},
 *      @OA\Response(
 *          response=200,
 *          description="Add a new user to the database",
 *      ),
 *     @OA\Response(
 *       response=401,
 *       description="Unauthorized",
 * ),
 *      @OA\RequestBody(
 *          description="User object that needs to be added to the database",
 *          @OA\JsonContent(
 *              @OA\Property(property="name", type="string", example="Faris Selimović", description="User name"),
 *              @OA\Property(property="username", type="string", example="faris.selimovic", description="Users username"),
 *              @OA\Property(property="email", type="email", example="faris@faris.ba", description="Users email"),
 *             @OA\Property(property="password", type="string", example="password", description="Users password"),
 *        )
 *      )
 * )
 */


    Flight::route("POST /add", function() {
    
        $payload = Flight::request()->data->getData();
    
        Flight::get('users_service')->add_users($payload);
    
        Flight::json(["message" => "User added successfully" , "data" => $payload]); 
    
    });

        /**
 * @OA\Post(
 *      path="/users/login",
 *      tags={"users"},
 *      summary="Login user",
 *      security={{"ApiKey": {}}},
 *      @OA\Response(
 *          response=200,
 *          description="Login user",
 *      ),
 *     @OA\Response(
 *       response=401,
 *       description="Unauthorized",
 * ),
 *      @OA\RequestBody(
 *          description="User object that needs to be logged in to the database",
 *          @OA\JsonContent(
 *              @OA\Property(property="username", type="string", example="avdoooo", description="Users username"),
 *             @OA\Property(property="password", type="string", example="jasammaliavdo", description="Users password"),
 *        )
 *      )
 * )
 */


    Flight::route('POST /login', function(){
        $data = Flight::request()->data->getData();
        $user = Flight::get('users_service')->get_user_by_username($data['username']);
        if(!$user || !password_verify($data['password'], $user['password'])){
            Flight::halt(401, 'Invalid username or password');
        }
        unset($user['password']);
        
        $jwt_payload = [
            'user' => $user,
            'iat' => time(),
            'exp' => time() + (60*60*24),


        ];

        $token = JWT::encode($jwt_payload, Config::JWT_SECRET(), "HS256");

        Flight::json(
            array_merge($user, ['token' => $token])
        );
    });

});