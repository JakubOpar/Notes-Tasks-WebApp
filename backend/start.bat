php -r "copy('.env.example', '.env');"

call composer install

@REM call composer update

call php artisan key:generate

call composer require laravel/sanctum

call php artisan storage:link

@REM call php artisan migrate

@REM call php artisan db:seed

call php artisan migrate:fresh --seed

call php artisan serve

code .