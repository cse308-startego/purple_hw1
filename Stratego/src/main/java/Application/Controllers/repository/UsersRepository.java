package Application.Controllers.repository;

import Application.Controllers.document.Users;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UsersRepository extends MongoRepository<Users, Integer> {
}
