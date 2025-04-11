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
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH")
            .allowedHeaders("*")
            .exposedHeaders("Access-Control-Allow-Origin", 
                "Access-Control-Allow-Methods", 
                "Access-Control-Allow-Headers", 
                "Access-Control-Max-Age", 
                "Access-Control-Request-Headers",
                "Access-Control-Request-Method")
            .allowCredentials(true)
            .maxAge(3600);
    }

}
