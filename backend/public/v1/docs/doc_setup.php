<?php

/**
 * @OA\Info(
 *   title="SoleSecure API",
 *   description="APIs for the SoleSecure application",
 *   version="1.0",
 *   @OA\Contact(
 *     email="luka.bartula@stu.ibu.edu.ba",
 *     name="Luka Bartula"
 *   )
 * ),
 * @OA\OpenApi(
 *   @OA\Server(
 *       url=BASE_URL
 *   )
 * )
 * @OA\SecurityScheme(
 *     securityScheme="ApiKey",
 *     type="apiKey",
 *     in="header",
 *     name="Authentication"
 * )
 */
