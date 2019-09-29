package Application.Controllers;

import Application.Controllers.document.Users;
import Application.Controllers.repository.UsersRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("stratego")
public class Hello {
    private UsersRepository usersRepository;

    public Hello(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @CrossOrigin
    @RequestMapping(value = "login", method = RequestMethod.GET)
    public ResponseEntity<String> loginAttempt(@RequestParam(name = "email") String email, @RequestParam(name = "password") String password) {
        System.out.println(email);
        System.out.println(password);
        List<Users> all_users = usersRepository.findAll();
        String hi = "";
        for (Users user:all_users) {
            if(user.getEmail().equals(email)) {
                hi = "true";
            }
            else {
                hi = "false";
            }
        }
        return new ResponseEntity<String>(hi, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "array", method = RequestMethod.POST)
    public ResponseEntity<String> arrayManipulation(@RequestBody String obj) {

        System.out.println(obj);
        String hi = "hello";
        return new ResponseEntity<String>(hi, HttpStatus.OK);
    }
}
