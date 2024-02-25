package com.students;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI studentDatabaseOpenAPI() {
        return new OpenAPI().info(new Info().title("Student REST API").description("Student information").version("1.0"));
    }
}
