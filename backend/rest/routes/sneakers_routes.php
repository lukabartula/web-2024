<?php

require_once __DIR__ . "/../services/SneakerService.class.php";

Flight::set('sneakers_service', new SneakerService());  // This is the same as the line in reviews_routes.php

    /**
     * @OA\Get(
     *      path="/sneakers",
     *      tags={"sneakers"},
     *      summary="Get all sneakers",
     *      security={{"ApiKey": {}}},
     *      @OA\Response(
     *          response=200,
     *          description="Array of sneakers in database",
     *      ),
     *     @OA\Response(
     *        response=401,
     *       description="Unauthorized",
     *   )
     * )
     */


Flight::route('GET /sneakers', function() {

    $data = Flight::get('sneakers_service') -> get_sneakers();

    Flight::json($data);
});