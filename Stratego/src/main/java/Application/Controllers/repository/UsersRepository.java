package Application.Controllers.repository;

import Application.Controllers.document.Users;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UsersRepository extends MongoRepository<Users, Integer> {

}
