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
        List<Users> all_users = usersRepository.findAll();
        String hi = "";
        for (Users user:all_users) {
            if(user.getPassword().equals(password) && user.getEmail().equals(email)) {
                hi = "true";
                return new ResponseEntity<String>(hi, HttpStatus.OK);
            }
            else {
                hi = "false";
            }
        }
        return new ResponseEntity<String>(hi, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "signUp", method = RequestMethod.POST)
    public ResponseEntity<String> signUpAttempt(@RequestParam(name = "fullname") String fullname, @RequestParam(name = "email") String email, @RequestParam(name = "password") String password) {
        System.out.println(fullname);
        System.out.println(email);
        System.out.println(password);
        System.out.println("SUCCESS");
        usersRepository.save(new Users(email, fullname, password));
//        List<Users> all_users = usersRepository.findAll();
        String hi = "true";
//        for (Users user:all_users) {
//            if(user.getPassword().equals(password) && user.getEmail().equals(email)) {
//                hi = "true";
//            }
//            else {
//                hi = "false";
//            }
//        }
        return new ResponseEntity<String>(hi, HttpStatus.OK);
    }
//
//    @CrossOrigin
//    @RequestMapping(value = "array", method = RequestMethod.POST)
//    public ResponseEntity<String> arrayManipulation(@RequestBody String obj) {
//
//        System.out.println(obj);
//        String hi = "hello";
//        return new ResponseEntity<String>(hi, HttpStatus.OK);
//    }
}
