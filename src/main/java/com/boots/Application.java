package com.boots;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableScheduling;
//HAPPY NEW YEAR
//Happy new me(ntal issues)
// Хочу поздравить всех кому приходят уведомления на почту о моих коммитах и пожелать им в следующем году больше терпения,
// что бы все их желания и потребности сбывались, чтобы инпуты красиились, докеры собирались, ngnix направлял
// шифры шифровались. Всех благ вам!


@EnableCaching
@EnableScheduling
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
