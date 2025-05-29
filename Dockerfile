FROM php:8.2-apache

RUN echo "file_uploads = On" >> /usr/local/etc/php/php.ini && \
    echo "upload_max_filesize = 500M" >> /usr/local/etc/php/php.ini && \
    echo "post_max_size = 500M" >> /usr/local/etc/php/php.ini

RUN mkdir -p /var/www/data

RUN chown -R www-data:www-data /var/www/data
RUN chmod -R 777 /var/www/data