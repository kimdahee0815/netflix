package com.mysite.netflixProject;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins(
                "https://net-flix-clone-dahee-kim.netlify.app",
                "http://localhost:3000"
            )
            .allowedMethods("*")
            .allowedHeaders("*")
            .exposedHeaders(
                "Access-Control-Allow-Origin",
                "Access-Control-Allow-Credentials",
                "Access-Control-Allow-Methods",
                "Access-Control-Allow-Headers",
                "Authorization"
            )
            .allowCredentials(true)
            .maxAge(3600);
    }

}
