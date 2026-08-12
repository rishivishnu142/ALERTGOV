package com.alert.incident.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableJpaRepositories(basePackages = "com.alert.incident.repository.jpa")
@EnableMongoRepositories(basePackages = "com.alert.incident.repository.mongo")
public class DatabaseConfig {
}
