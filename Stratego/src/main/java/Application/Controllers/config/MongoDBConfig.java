package Application.Controllers.config;

import Application.Controllers.document.Users;
import Application.Controllers.repository.UsersRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackageClasses = UsersRepository.class)
public class MongoDBConfig {

    @Bean
    CommandLineRunner commandLineRunner(UsersRepository usersRepository) {
        return strings -> {
            usersRepository.save(new Users(101, "aham-brahmasmi"));
            usersRepository.save(new Users(201, "apun-bhagwan"));
        };
    }
}
