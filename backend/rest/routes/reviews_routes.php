<?php

require_once __DIR__ . "/../services/ReviewService.class.php";

Flight::set('reviews_service', new ReviewService());

Flight::group('/reviews', function(){
    
        /**
     * @OA\Get(
     *      path="/reviews",
     *      tags={"reviews"},
     *      summary="Get reviews",
     *      security={{"ApiKey": {}}},
     *      @OA\Response(
     *          response=200,
     *          description="Array of reviews in database",
     *      ),
     *     @OA\Response(
     *        response=401,
     *       description="Unauthorized",
     *   )
     * )
     */


    Flight::route('GET /', function() {


        //$reviews_service = new ReviewService();
        $data = Flight::get('reviews_service')-> get_reviews();
        //header("Content-Type: application/json");
        Flight::json($data);

    });

        /**
 * @OA\Post(
 *      path="/reviews/add",
 *      tags={"reviews"},
 *      summary="Add a new review",
 *      security={{"ApiKey": {}}},
 *      @OA\Response(
 *          response=200,
 *          description="Add a new review to the database",
 *      ),
 *     @OA\Response(
 *       response=401,
 *       description="Unauthorized",
 * ),
 *      @OA\RequestBody(
 *          description="User object that needs to be added to the database",
 *          @OA\JsonContent(
 *              @OA\Property(property="name", type="string", example="Air Max 90", description="Sneaker name"),
 *              @OA\Property(property="price", type="string", example="$200", description="Price of sneakers"),
 *              @OA\Property(property="image", type="string", example="faris@faris.ba", description="url of image")
 *        )
 *      )
 * )
 */


    Flight::route("POST /add", function() {

        $payload = Flight::request()->data->getData();

        Flight::get('reviews_service')->add_reviews($payload);

        Flight::json(["message" => "Review sent successfully" , "data" => $payload]); 

    });

});

  